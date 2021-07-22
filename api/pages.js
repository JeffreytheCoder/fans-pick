const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Page = require('../models/Page');

// @route    POST api/pages/create
// @desc     create a page
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
    const { name, bio, avatar, links } = req.body;
    console.log(links);

    try {    
      // save page
      const page = new Page({
        name,
        bio,
        avatar,
        links,
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
    let page = await Page.findById(req.params.page_id).select('-password');
    if (!page) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Page does not exist' }] });
    }
    res.json({ page });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;