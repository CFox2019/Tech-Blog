const router = require('express').Router();
const { User } = require('../../models');
const { UserParams } = require('../../models/request_params');
const { UserSerializer } = require('../../models/serializers');

router.post('/', async (req, res) => {
  try {
    const userParams = new UserParams(req.body)
    if (!userParams.username || !userParams.password) {
      res
        .status(400)
        .json({ message: 'Missing username or password, please try again' });
      return;
    }

    const userData = await User.create({
      username: userParams.username,
      password: userParams.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(new UserSerializer(userData));
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userParams = new UserParams(req.body)
    if (!userParams.username || !userParams.password) {
      res
        .status(400)
        .json({ message: 'Missing username or password, please try again' });
      return;
    }

    const userData = await User.findOne({ where: { username: userParams.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(userParams.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: new UserSerializer(userData),
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userParams = new UserParams(req.body)
    if (!userParams.username || !userParams.password) {
      res
        .status(400)
        .json({ message: 'Missing username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: new UserSerializer(userData),
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
