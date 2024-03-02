const express = require('express');
const router = express.Router();
const { Blog, Comment, User } = require('../../models');

const ROUTES = {
  COMMENTS: '/',
};

const ERROR_MESSAGES = {
  FAILED_COMMENT: 'Failed to comment.',
  FILL_FORM: 'Fill out the form.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error.',
};


router.get(ROUTES.COMMENTS, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User }, { model: Blog }],
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});


router.post(ROUTES.COMMENTS, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      userId: req.session.currentUser.userId,
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: ERROR_MESSAGES.FAILED_COMMENT });
  }
});

module.exports = router;
