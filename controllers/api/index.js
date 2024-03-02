const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

// Global error messages
const errorMessages = {
  notFound: 'Route not found',
  internalServerError: 'Internal server error'
};

// Routes
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

// Error handling for 404
router.use((req, res, next) => {
  res.status(404).json({ message: errorMessages.notFound });
});

// Error handling for 500
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: errorMessages.internalServerError });
});

module.exports = router;
