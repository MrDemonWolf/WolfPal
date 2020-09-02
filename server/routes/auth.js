const express = require('express');
const passport = require('passport');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');

const router = express.Router();

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Session = require('../models/Session');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/isSessionValid');
const isRefreshValid = require('../middleware/isRefreshTokenValid');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * Load input validators.
 */
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

/**
 * @route /auth/register
 * @method POST
 * @description Allows a user to register for a account.
 */
router.post('/register', async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, errors });
    }
    const { username, email, password } = req.body;

    /**
     * Check if there is already account using the same email or username
     */
    const alreadyAccount = await User.findOne({
      $or: [{ email }, { newEmail: email }, { username }]
    });

    if (alreadyAccount) {
      return res.status(409).json({
        code: 409,
        error: 'The email you are attempting to sign up with is already in use.'
      });
    }

    /**
     * Create the user with the data provided
     * Send them a email with the email verification token.
     */
    const newUser = new User({
      username,
      email,
      password
    });
    const emailVerificationToken = customAlphabet(urlFriendyAlphabet, 32);

    newUser.emailVerificationToken = emailVerificationToken();
    newUser.emailVerificationTokenExpire = moment().add('3', 'h');

    /**
     * TODO send email verification token to the email.
     */

    await newUser.save();

    res.json({
      code: 200,
      message: 'Please confirm your email address to complete the registration.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/login
 * @method POST
 * @description Allows a user to login with their account.
 */
router.post('/login', async (req, res) => {
  try {
    /**
     * Validdate the user important for email,password.
     */
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, errors });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 400,
        error: 'Wrong email or password.'
      });
    }

    const vailidPassword = await user.verifyPassword(password);

    if (!vailidPassword) {
      return res.status(400).json({
        code: 400,
        error: 'Wrong email or password.'
      });
    }

    /**
     * Create the JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const accessTokenHash = sha512(accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

    /**
     * Create the session in the database
     */
    const session = new Session({
      accessTokenHash,
      refreshTokenHash,
      user: user.id,
      expireAt: moment().add('24', 'h')
    });
    await session.save();
    res.json({
      code: 200,
      access_token: accessToken,
      refresh_token: refreshToken,
      twoFactor: false
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/refresh
 * @method POST
 * @description Allows a user to refresh their login token with a new one
 */
// router.post('/refresh', requireAuth, isRefreshValid, async (req, res) => {
router.post('/refresh', isRefreshValid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    /**
     * Create new JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const accessTokenHash = sha512(accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

    /**
     * Create the new session in the database
     */
    const session = new Session({
      accessTokenHash,
      refreshTokenHash,
      user: user.id,
      expireAt: moment().add('24', 'h')
    });
    await session.save();
    res.json({
      code: 200,
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/logout
 * @method POST
 * @description Allows a user logout of their account
 */
router.post('/logout', isSessionValid, async (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();
    const accessTokenHash = sha512(token);

    /**
     * Finds and removes the session from the database by marking it as revoked
     */
    await Session.findOneAndUpdate(
      { accessTokenHash },
      {
        isRevoked: true
      },
      { $safe: true }
    );
    res.json({
      code: 200,
      message: 'You are now logged out.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;