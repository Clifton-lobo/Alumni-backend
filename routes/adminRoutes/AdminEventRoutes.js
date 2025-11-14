  const express = require("express");
  const multer = require("multer");
  const {
    handleImageUpload,
    addEvent,
    fetchEvent,
    updateEvent,
    deleteEvent,
  } = require("../../controllers/admin/AdminEventController");

  const router = express.Router();
  const upload = multer();

  router.post("/upload-image", upload.single("my_file"), handleImageUpload);
  router.post("/add", addEvent);
  router.get("/get", fetchEvent);
  router.put("/update/:id", updateEvent);
  router.delete("/delete/:id", deleteEvent);

  module.exports = router;
