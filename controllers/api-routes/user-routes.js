const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(userData);
        return userData;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;