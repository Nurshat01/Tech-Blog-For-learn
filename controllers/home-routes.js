const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');

// Global error messages
const errorMessage = {
  blogNotFound: 'Oops! The blog you are looking for seems to be hiding. Maybe it went on a vacation?',
  serverError: 'Uh oh! The server seems to be taking a break. Please try again later.',
};

// Global endpoints
const endpoints = {
  home: '/',
  blogInfoDetails: '/blogs/:id',
  dashboard: '/dashboard',
  createBlog: '/dashboard/create',
  updateBlog: '/dashboard/update/:id',
  login: '/login',
};

// Function to handle rendering with error handling
const renderWithCatch = async (res, view, data) => {
  try {
    res.render(view, data);
  } catch (error) {
    res.status(500).json({ message: errorMessage.serverError });
  }
};

// Render the homepage with all blogs
router.get(endpoints.home, async (req, res) => {
  const blogsData = await Blog.findAll({
    include: [{ model: User }],
  });
  const blogs = blogsData.map((blog) => blog.get({ plain: true })).reverse();

  renderWithCatch(res, 'homepage', {
    loggedIn: req.session.currentUser?.loggedIn,
    blogs,
  });
});

// Render a specific blog's details page
router.get(endpoints.blogInfoDetails, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      { model: User },
      { model: Comment, include: [{ model: User }] },
    ],
  });

  if (!blogData) {
    res.status(404).json({ message: errorMessage.blogNotFound });
    return;
  }

  const blog = blogData.get({ plain: true });

  renderWithCatch(res, 'blogInfoDetails', {
    loggedIn: req.session.currentUser?.loggedIn,
    ...blog,
  });
});

// Render the user's dashboard with their blogs
router.get(endpoints.dashboard, withAuth, async (req, res) => {
  const blogsData = await Blog.findAll({
    where: { userId: req.session.currentUser.userId },
    include: [{ model: User }],
  });
  const blogs = blogsData.map((blog) => blog.get({ plain: true })).reverse();

  renderWithCatch(res, 'dashboard', {
    loggedIn: req.session.currentUser?.loggedIn,
    blogs,
    idDashboard: true,
  });
});

// Render the blog creation page
router.get(endpoints.createBlog, withAuth, (req, res) => {
  renderWithCatch(res, 'blogForm', {
    loggedIn: req.session.currentUser?.loggedIn,
    isCreate: true,
    idDashboard: true,
  });
});

// Render the blog update page
router.get(endpoints.updateBlog, withAuth, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id);

  if (!blogData) {
    res.status(404).json({ message: errorMessage.blogNotFound });
    return;
  }

  const blog = blogData.get({ plain: true });

  renderWithCatch(res, 'blogForm', {
    loggedIn: req.session.currentUser?.loggedIn,
    idDashboard: true,
    ...blog,
  });
});

// Render the login page
router.get(endpoints.login, (req, res) => {
  if (req.session.currentUser?.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
