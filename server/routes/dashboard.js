const express = require("express"); // Import the Express module
const router = express.Router(); // Create a new router object
const { isLoggedIn }  = require("../middleware/checkAuth");
const dashboardcontroller = require("../controller/dashboardcontroller"); // Import the dashboard controller

router.get("/dashboard",isLoggedIn , dashboardcontroller.dashboard);



module.exports = router;