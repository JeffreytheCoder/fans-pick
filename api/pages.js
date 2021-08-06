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
      const { name, bio, avatar, links, categories, fansName, sections } =
        req.body;

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
        fansName,
        sections,
        user: req.user.id,
      });
      await page.save();

      // add page to user's pages
      const user = await User.findById(req.user.id);
      user.pages.unshift(page);
      await user.save();

      res.json({ page });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/pages/:page_id
// @desc     current user edits a page
// @access   Private
router.put(
  '/:page_id',
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
      // Check if the page exists
      let page = await Page.findById(req.params.page_id);

      if (!page) {
        return res.status(400).json({ msg: 'Page does not exist' });
      }

      // Check if user is the page owner
      if (page.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the page owner, not authorized' });
      }

      // normalize social fields to ensure valid url
      const { name, bio, avatar, links, categories, fansName } = req.body;
      for (const [key, value] of Object.entries(links)) {
        if (value && value.length > 0) {
          links[key] = normalize(value, { forceHttps: true });
        }
      }

      const pageFields = {
        name,
        bio,
        avatar,
        links,
        categories,
        fansName,
      };

      // update page
      const updatedPage = await Page.findOneAndUpdate(
        { _id: req.params.page_id },
        { $set: pageFields },
        { new: true }
      );

      res.json({ updatedPage });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/pages/:page_id
// @desc     delete a page
// @access   Private
router.delete('/:page_id', auth, async (req, res) => {
  try {
    // Check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ msg: 'Page does not exist' });
    }

    // Check if user is the page owner
    if (page.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the page owner, not authorized' });
    }

    // remove page from user's pages
    const user = await User.findById(req.user.id);
    user.pages = user.pages.filter(
      (page) => page._id.toString() !== req.params.page_id.toString()
    );
    await user.save();

    // remove posts in every section
    await Promise.all(
      page.sections.map(async (sec) => {
        sec.posts.forEach(async (secPost) => {
          const post = await Post.findById(secPost._id.toString());
          await post.remove();
        });
      })
    );

    // TODO: remove every subposts recursively

    await page.remove();
    res.json({ msg: 'Page removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/pages/:page_id
// @desc     delete a section
// @access   Private
// TODO

// @route    GET api/pages/:page_id
// @desc     get a page
// @access   Public
router.get('/:page_id', async (req, res) => {
  try {
    // check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ msg: 'Page does not exist' });
    }

    res.json({ page });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/pages/:page_id/posts
// @desc     get posts of a page
// @access   Public
router.get('/:page_id/posts', async (req, res) => {
  try {
    const { section, sorting, order } = req.query;

    // check if page exists
    const page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ msg: 'Page does not exist' });
    }

    // check if section exists
    if (section) {
      let sectionFound = false;
      page.sections.forEach((sec) => {
        if (sec.name == section) {
          sectionFound = true;
        }
      });
      if (!sectionFound) {
        return res.status(400).json({ msg: 'Section does not exist' });
      }
    }

    // check if sorting and order are allowed
    if (sorting && order) {
      if (sorting !== 'date' && sorting !== 'likes' && sorting !== 'adopted') {
        return res.status(400).json({
          msg: 'Sorting method is not allowed. Allowed methods: date, likes, adopted',
        });
      }

      if (
        order !== 'asc' &&
        order !== 'desc' &&
        order !== 'true' &&
        order !== 'false'
      ) {
        return res.status(400).json({
          msg: 'Order method is not allowed. Allowed methods: asc, desc, true, false',
        });
      }
    }

    let posts = null;
    // return sorted posts in a section
    if (section && sorting && order) {
      if (sorting === 'date') {
        posts = await Post.find({
          page: req.params.page_id,
          section,
        }).sort({ date: order });
      } else if (sorting === 'likes') {
        posts = await Post.find({
          page: req.params.page_id,
          section,
        }).sort({ likes: order });
      } else if (sorting === 'adopted') {
        if (order == 'true') {
          posts = await Post.find({
            page: req.params.page_id,
            section,
            adopted: true,
          }).sort({ date: 'desc' });
        } else {
          posts = await Post.find({
            page: req.params.page_id,
            section,
            adopted: false,
          }).sort({ date: 'desc' });
        }
      }
    } else if (sorting && order) {
      if (sorting === 'date') {
        posts = await Post.find({
          page: req.params.page_id,
          section: { $ne: 'subposts' },
        }).sort({ date: order });
      } else if (sorting === 'likes') {
        posts = await Post.find({
          page: req.params.page_id,
          section: { $ne: 'subposts' },
        }).sort({ likes: order });
      } else if (sorting === 'adopted') {
        if (order == 'true') {
          posts = await Post.find({
            page: req.params.page_id,
            section: { $ne: 'subposts' },
            adopted: true,
          }).sort({ date: 'desc' });
        } else {
          posts = await Post.find({
            page: req.params.page_id,
            section: { $ne: 'subposts' },
            adopted: false,
          }).sort({ date: 'desc' });
        }
      }
    } else if (section) {
      posts = await Post.find({ page: req.params.page_id, section });
    } else {
      posts = await Post.find({
        page: req.params.page_id,
        section: { $ne: 'subposts' },
      });
    }

    res.json({ posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/pages/:page_id/follow
// @desc     current user follows a page
// @access   Private
router.put('/:page_id/follow', auth, async (req, res) => {
  try {
    // check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ msg: 'Page does not exist' });
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

// TODO: unfollow page

// @route    PUT api/pages/:page_id/sections/add
// @desc     add section to a page
// @access   Private
router.put('/:page_id/sections/add', auth, async (req, res) => {
  try {
    // check if the page exists
    let page = await Page.findById(req.params.page_id);
    if (!page) {
      return res.status(400).json({ msg: 'Page does not exist' });
    }

    // check if user is the page owner
    if (page.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the page owner, not authorized' });
    }

    const { section } = req.body;

    // check if section already exists
    let isSectionExists = false;
    page.sections.forEach((sec) => {
      if (sec.name === section.name) {
        isSectionExists = true;
      }
    });

    if (isSectionExists) {
      return res.status(400).json({ msg: 'Section already exists' });
    }

    // add section to current sections
    page.sections.unshift(section);
    page.save();

    res.json({ page });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/pages/:page_id/sections/delete/:section_id
// @desc     delete section from a page
// @access   Private
router.delete(
  '/:page_id/sections/delete/:section_id',
  auth,
  async (req, res) => {
    try {
      // check if the page exists
      let page = await Page.findById(req.params.page_id);
      if (!page) {
        return res.status(400).json({ msg: 'Page does not exist' });
      }

      // check if user is the page owner
      if (page.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the page owner, not authorized' });
      }

      // check if section doesn't exists
      let isSectionExists = false;
      page.sections.forEach((sec) => {
        if (sec._id.toString() === req.params.section_id.toString()) {
          isSectionExists = true;
        }
      });

      if (!isSectionExists) {
        return res.status(400).json({ msg: 'Section does not exists' });
      }

      // delete all posts in the section
      await Promise.all(
        page.sections.map(async (sec) => {
          if (sec._id.toString() === req.params.section_id.toString()) {
            await Promise.all(
              sec.posts.map(async (secPost) => {
                const post = await Post.findById(secPost._id.toString());
                await post.remove();
              })
            );
          }
        })
      );

      // remove section from sections
      page.sections = page.sections.filter((sec) => {
        return sec._id.toString() !== req.params.section_id.toString();
      });
      page.save();

      res.json({ page });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
