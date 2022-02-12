const router = require("express").Router();

const apiRoutes = require("./api-routes");
const viewRoutes = require("./view-routes");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
