const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll()
        res.json(commentData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.json(commentData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/id:', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {id: req.params.id}
        });
        
        if (!commentData) {
            res.status(404).json({ message: 'Comment with that id not found' });
            return;
        }
        res.json(commentData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;