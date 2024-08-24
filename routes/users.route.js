const { index } = require("../controllers/users.controller");
const router = require("express").Router();
  
router.get("/",index);
  
module.exports = router;