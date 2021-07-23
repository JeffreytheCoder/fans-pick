const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const normalize = require('normalize-url');

const Page = require('../models/Page');

// @route    POST api/pages/create
// @desc     current user create a page
// @access   Private
router.post(
  '/create',
  auth,
  check('name', 'Page name is required').not().isEmpty(),
  check('bio', 'Page bio is required').not().isEmpty(),
  check('avatar', 'Page avatar is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {    
      const { name, bio, avatar, links, categories } = req.body;

      // normalize social fields to ensure valid url
      for (const [key, value] of Object.entries(links)) {
        if (value && value.length > 0) {
          links[key] = normalize(value, { forceHttps: true });
        }
      }

      // save page
      const page = new Page({
        name,
        bio,
        avatar,
        links,
        categories,
        user: req.user.id,
      });

      await page.save();
      res.json({ page });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/pages/:page_id
// @desc     get a page
// @access   Public
router.get('/:page_id', async (req, res) => {
  try {
    // check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ errors: [{ msg: 'Page does not exist' }] });
    }

    res.json({ page });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route    DELETE api/pages/:page_id
// @desc     delete a page
// @access   Private
router.delete('/:page_id', auth, async (req, res) => {
  try {
    // Check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ errors: [{ msg: 'Page does not exist' }] });
    }

    // Check if user is the page owner
    if (page.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not the page owner, not authorized' });
    }

    await page.remove();
    res.json({ msg: 'Page removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route    PUT api/pages/follow/:page_id
// @desc     current user follows a page
// @access   Private
router.put('/follow/:page_id', auth, async (req, res) => {
  try {
    // check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ errors: [{ msg: 'Page does not exist' }] });
    }

    const user = await User.findById(req.user.id);

    // add follower to the page
    page.followers.unshift(user);
    await page.save();

    // add following to the user
    user.follows.unshift(page);
    await user.save();

    res.json({ user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;