const router = require("express").Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  nukeUser,
  addFriend,
  nukeFriend
} = require("../../controllers/userController");

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:userId")
  .get(getOneUser)
  .put(updateUser)
  .delete(nukeUser)
  .post(addFriend);

router.route("/:userId/friends").delete(nukeFriend);
// NEW ROUTE FOR FRIENDS
module.exports = router;
