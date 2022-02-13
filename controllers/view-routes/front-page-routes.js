const router = require("express").Router();
const sequelize = require("../../config/connection");
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
          attributes: ["username", "id"],
        },
      ],
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('front-page', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
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
                    attributes: ['id','comment_body', 'created_at'],
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
                {
                    model: User,
                    attributes: ["username", "identicon"]
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login-page');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;
