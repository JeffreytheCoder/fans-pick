const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const Page = require('../models/Page');
const User = require('../models/User');

// @route    POST api/post/create
// @desc     create a post
// @access   Private
router.post(
  '/create',
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('page_id', 'Profile id is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, page_id, superpost_id } = req.body;
    const user = await User.findById(req.user.id).select('-password');

    try {
      let newPost = new Post({
        user: req.user.id,
        page: page_id,
        superPost: superpost_id,
        title: title,
        description: description,
        username: user.name,
        avatar: user.avatar,
      });
      const post = await newPost.save();

      // add post to profile
      const page = await Page.findById(page_id);
      page.posts.unshift(post);
      await page.save();

      // add post to subposts of the superpost
      if (superpost_id) {
        const superPost = await Post.findById(superpost_id);
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

// @route    GET api/posts/:post_id
// @desc     get a post
// @access   Public
router.get('/:post_id', auth, async (req, res) => {
  try {
    // check if the post exists
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Post does not exist' }] });
    }
    res.json({ post });
  } catch {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route    PUT api/posts/like/:post_id
// @desc     like a post
// @access   Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if already liked
    if (post.likes.some(like => like.user.toString() === req.user.id)) {
      res.status(400).json({ msg: 'Post already liked'});
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route    PUT api/posts/unlike/:post_id
// @desc     unlike a post
// @access   Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if not liked
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {
      res.status(400).json({ msg: 'Post has not been liked yet'});
    }

    // remove like by the user
    post.likes = post.likes.filter(like => {
      like.user.toString() !== req.user.id
    });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route    POST api/posts/comment
// @desc     comment to a post
// @access   Private
router.post('')

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
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
      return res.status(401).json({ msg: 'User is not the page owner, not authorized' });
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
})

module.exports = router;