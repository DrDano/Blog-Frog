const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

router.get('/', async function (req, res) {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
              },
              attributes: [
                'id',
                'post_url',
                'title',
                'created_at'
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username']
                  }
                },
                {
                  model: User,
                  attributes: ['username']
                }
              ]
            });
        console.log(req.session)
        const posts = postData.map(post => {
            post.get({ plain: true });
        })

        res.render('dashboard', { posts, loggedIn: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;