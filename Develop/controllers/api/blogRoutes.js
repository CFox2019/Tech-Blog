const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');
const { BlogParams } = require('../../models/request_params');
const { BlogSerializer } = require('../../models/serializers');

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

    res.status(200).json(new BlogSerializer(blogData));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;