const express = require("express");
const router = express.Router();
const { getFilteredEvents, getEventDetails, registerForEvent } = require("../../controllers/user/UserEventController");


router.get("/filter", getFilteredEvents);
router.get("/get/:id", getEventDetails);
router.post("/:eventId/register", registerForEvent);


module.exports = router;
