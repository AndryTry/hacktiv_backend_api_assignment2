const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.use(require("./auth.route"));

router.use(auth);
router.use("/movies", require("./movies.route"));
router.use("/users", require("./users.route"));


module.exports = router;