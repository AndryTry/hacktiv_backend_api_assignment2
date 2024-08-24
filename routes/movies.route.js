const { show, index } = require("../controllers/movies.controller");
const router = require("express").Router();
  
router.get("/",index);
router.get("/:id", show);
  
module.exports = router;