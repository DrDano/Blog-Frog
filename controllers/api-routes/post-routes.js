const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    console.log("==============================");
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

    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
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

    if (!postData) {
      res.status(404).json({ message: "Sorry no post found with that id" });
      return;
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id,
    });

    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        post_url: req.body.post_url,
      },
      {
        where: {
          id: req.body.post_id,
        }
      }
    );

    if (!postData) {
      res.status(404).json({ message: "Sorry no post found with that id" });
      return;
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.body.post_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "Post with that id not found" });
      return;
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
