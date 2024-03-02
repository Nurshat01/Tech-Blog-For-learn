const router = require('express').Router();
const { User } = require('../../models');


const endpointUrls = {
  createUser: '/',
  login: '/login',
  logout: '/logout'
};

const funnyMessages = {
  createUserSuccess: 'Congratulations! You\'ve successfully created a new user!',
  createUserFail: 'Oops! Something went wrong while creating a new user. Maybe try again later?',
  loginSuccess: 'Welcome back! You are now logged in.',
  loginFail: 'Uh oh! Incorrect username or password. Please try again!',
  logoutSuccess: 'You\'ve successfully logged out. Goodbye!',
  logoutFail: 'Hmm, something went wrong while logging out. Please try again.',
};

// CREATE new user
router.post(endpointUrls.createUser, async (req, res) => {
  try {
    const { username, password } = req.body;
    const dbUserData = await User.create({ username, password });

    req.session.save(() => {
      req.session.currentUser = { loggedIn: true, userId: dbUserData.id };
      res.status(200).json({ message: funnyMessages.createUserSuccess, user: dbUserData });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: funnyMessages.createUserFail, error: err.message });
  }
});

// Login
router.post(endpointUrls.login, async (req, res) => {
  try {
    const { username, password } = req.body;
    const dbUserData = await User.findOne({ where: { username } });

    if (!dbUserData || !(await dbUserData.checkPassword(password))) {
      res.status(400).json({ message: funnyMessages.loginFail });
      return;
    }

    req.session.save(() => {
      req.session.currentUser = { loggedIn: true, userId: dbUserData.id };
      res.status(200).json({ message: funnyMessages.loginSuccess, user: dbUserData });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: funnyMessages.loginFail, error: err.message });
  }
});

// Logout
router.post(endpointUrls.logout, (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: funnyMessages.logoutSuccess });
  });
});

module.exports = router;
