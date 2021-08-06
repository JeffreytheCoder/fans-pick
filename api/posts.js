const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const Page = require('../models/Page');
const User = require('../models/User');

// @route    POST api/posts/create
// @desc     create a post
// @access   Private
router.post(
  '/create',
  auth,
  check('description', 'Description is required').not().isEmpty(),
  check('page_id', 'Page id is required').not().isEmpty(),
  check('section', 'Section is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, page_id, superpost_id, section } = req.body;
    const user = await User.findById(req.user.id).select('-password');

    try {
      // check if page exists
      const page = await Page.findById(page_id);
      if (!page) {
        return res.status(400).json({ msg: 'Page does not exist' });
      }

      // check if section exists
      let sectionFound = false;
      page.sections.forEach((sec) => {
        if (sec.name == section) {
          sectionFound = true;
        }
      });
      if (!sectionFound) {
        return res.status(400).json({ msg: 'Section does not exist' });
      }

      let newPost = new Post({
        user: req.user.id,
        page: page_id,
        superPost: superpost_id,
        title,
        section: section,
        description: description,
        username: user.name,
        avatar: user.avatar,
      });
      const post = await newPost.save();

      // add post to page section
      page.sections.forEach((sec) => {
        if (sec.name == section) {
          sec.posts.unshift(post);
        }
      });
      await page.save();

      // add post to subposts of the superpost
      if (superpost_id) {
        const superPost = await Post.findById(superpost_id);
        console.log(superPost);
        superPost.subPosts.unshift(post);
        await superPost.save();
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/posts/:post_id
// @desc     update a post
// @access   Private
router.put(
  '/:post_id',
  auth,
  check('description', 'Description is required').not().isEmpty(),
  check('section', 'Section is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, section } = req.body;

      // check if the post exists
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      // Check if user is the one who posts
      if (post.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the post owner, not authorized' });
      }

      // update page
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        { title, description, section },
        { new: true }
      );

      res.json({ updatedPost });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/posts/:post_id
// @desc     delete a post
// @access   Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if the post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user is the one who posts
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the post owner, not authorized' });
    }

    // remove post from page section
    const page = await Page.findById(post.page);
    page.sections.forEach((sec) => {
      if (sec.name === post.section) {
        sec.posts = sec.posts.filter(
          (secPost) => secPost._id.toString() !== post._id.toString()
        );
      }
      page.save();
    });

    // remove post from superpost's subposts
    if (post.superPost) {
      const superPost = await Post.findById(post.superPost.id);
      superPost.subPosts = superPost.subPosts.filter(
        (subPost) => subPost._id.toString() !== req.params.post_id.toString()
      );
      superPost.save();
    }

    // TODO: delete all subposts and all their subposts

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:post_id
// @desc     get a post
// @access   Public
router.get('/:post_id', async (req, res) => {
  try {
    // check if the post exists
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: 'Post does not exist' });
    }
    res.json({ post });
  } catch {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/posts/like/:post_id
// @desc     like a post
// @access   Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if already liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/posts/unlike/:post_id
// @desc     unlike a post
// @access   Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if not liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not been liked yet' });
    }

    // remove like by the user
    post.likes = post.likes.filter((like) => {
      like.user.toString() !== req.user.id;
    });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/posts/adopt/:post_id
// @desc     adopt a post
// @access   Private
router.put('/adopt/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if the post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user is the page owner
    const page = await Page.findOne({ _id: post.page });
    if (page.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the page owner, not authorized' });
    }

    // Check if the post has been adopted already
    if (post.adopted) {
      return res.status(400).json({ msg: 'Post has already been adopted' });
    }

    post.adopted = true;
    await post.save();

    res.json({ post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
