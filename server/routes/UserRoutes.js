const { register, Login,setAvatar,allUsers } = require("../controllers/UsersController");

const router=require("express").Router();
router.post("/register",register);
router.post("/Login",Login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",allUsers);

module.exports=router;