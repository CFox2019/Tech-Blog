const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { BlogParams, CommentParams } = require('../../models/request_params');
const { BlogSerializer, CommentSerializer } = require('../../models/serializers');

router.post('/', withAuth, async (req, res) => {
  try {
    const blogParams = new BlogParams(req.body);
    if (!blogParams.title || !blogParams.content) {
      res
        .status(400)
        .json({ message: 'Missing title or content, please try again' });
        return;
    }

    const newBlog = await Blog.create({
      title: blogParams.title,
      content: blogParams.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(new BlogSerializer(newBlog));
  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogParams = new BlogParams(req.body);
    if (!blogParams.title || !blogParams.content) {
      res
        .status(400)
        .json({ message: 'Missing title or content, please try again' });
        return;
    }

    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      res
        .status(404)
        .json({ message: 'No blog found for given id' });
        return;
    }

    blog.update({
      title: blogParams.title,
      content: blogParams.content
    });

    res.status(200).json(new BlogSerializer(blog));
  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

// post to /api/blogs/123/comments
router.post('/:id/comments', withAuth, async (req, res) => {
  try {
    const commentParams = new CommentParams(req.body);
    console.log('commentParams', commentParams);
    if (!commentParams.message) {
      res
        .status(400)
        .json({ message: 'Missing message, please try again' });
        return;
    }

    const newComment = await Comment.create({
      message: commentParams.message,
      blog_id: req.params.id,
      user_id: req.session.user_id
    });
    console.log('newComment', newComment);

    res.status(200).json(new CommentSerializer(newComment));
  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.log('err', err);
    res.status(500).json(err);
  }
});

module.exports = router;