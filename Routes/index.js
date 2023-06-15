const router = require("express").Router();
const thoughtRoutes = require("./api/thoughts");
const userRoutes = require("./api/users");

router.use("/api/thought", thoughtRoutes);
router.use("/api/user", userRoutes);
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
