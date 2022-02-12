const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_url", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.render('front-page', [...postData.get({ plain: true })]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/id:', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
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
                        attributes: ["username"]
                    }
                },
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'Sorry no post found with that id' });
            return;
        }

        const post = postData.get({plain: true})
        res.render('selected-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login-page');
});

module.exports = router;
