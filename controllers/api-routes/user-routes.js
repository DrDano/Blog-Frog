const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password', 'identicon'] }
        });

        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/id:', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password', 'identicon'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_url', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user matches this id'});
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'Username not found, redirecting you to user sign up form!'})
            res.redirect('..')
            return;
        }

        const isValidPassword = userData.passwordVerify(req.body.password);

        if (!isValidPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again.' })
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.user_id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: `Welcome back ${req.session.username}!`})
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
        else {
            res.status(404).end();
        }
    }
    catch (err) {
        console.log(err);
        res.json(500).json(err);
    }
});

router.put('/id:', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'Cannot find that user' })
            return;
        }

        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/id:', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
    
        if (!userData) {
            res.status(404).json({ message: 'Cannot find a user that matches the criteria'});
            return;
        }
        res.json(userData);
        res.redirect('../../')
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;