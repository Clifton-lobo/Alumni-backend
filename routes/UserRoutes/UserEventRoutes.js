const express = require("express");
const router = express.Router();
const { getFilteredEvents, getEventDetails } = require("../../controllers/user/UserEventController");

router.get("/filter", getFilteredEvents);
router.get("/get/:id", getEventDetails);

module.exports = router;
