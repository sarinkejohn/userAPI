const {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    login
} = require('./user.cotroller');
const router = require("express").Router();
const {checkToken} = require("../../Auth/token_validation");

router.post("/", checkToken,createUser);
router.get("/",checkToken,getAllUsers);
router.get("/:uid",checkToken,getSingleUser);
router.put("/:uid",checkToken,updateUser);
router.delete("/:uid",checkToken,deleteUser);
router.post("/login",login);


module.exports = router;