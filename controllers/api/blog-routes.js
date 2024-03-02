const router = require('express').Router();
const { Blog } = require('../../models');

// Global endpoint URIs
const endpointUrls = {
  create: '/',
  update: '/:id',
  delete: '/:id'
};

// Global funny messages
const GlobalMessages = {
  createSuccess: 'Congratulations! You created a new blog. Now let the world know!',
  createFail: 'Oops! Something went wrong while trying to create a new blog. Maybe the internet trolls got to it?',
  updateSuccess: 'Success! Your blog has been updated. Keep those creative juices flowing!',
  updateFail: 'Uh oh! We couldn\'t update your blog. Maybe it\'s off on an adventure?',
  deleteSuccess: 'Farewell, blog! Your blog has been deleted. Time to write a new chapter!',
  deleteFail: 'Failed to delete the blog. Maybe it\'s indestructible?',
  notFound: 'Blog not found.'
};

// Create a new blog
router.post(endpointUrls.create, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.session.currentUser.userId,
    });
    res.status(200).json({ message: GlobalMessages.createSuccess, blog });
  } catch (err) {
    res.status(400).json({ message: GlobalMessages.createFail, error: err.message });
  }
});

// Update a blog by its `id` value
router.put(endpointUrls.update, async (req, res) => {
  try {
    const [updatedRows] = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: GlobalMessages.notFound });
    }
    res.status(200).json({ message: GlobalMessages.updateSuccess });
  } catch (err) {
    res.status(400).json({ message: GlobalMessages.updateFail, error: err.message });
  }
});

// Delete a blog by its `id` value
router.delete(endpointUrls.delete, async (req, res) => {
  try {
    const deletedRows = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: GlobalMessages.notFound });
    }
    res.status(200).json({ message: GlobalMessages.deleteSuccess });
  } catch (err) {
    res.status(400).json({ message: GlobalMessages.deleteFail, error: err.message });
  }
});

module.exports = router;
