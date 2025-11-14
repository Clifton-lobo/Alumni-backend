const { handleImageUploadUtil } = require("../../helpers/Cloudinary");
const Event = require("../../models/Event.model");

// Upload image to Cloudinary
exports.handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const result = await handleImageUploadUtil(
      req.file.buffer,
      req.file.mimetype
    );

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during upload",
      error: error.message,
    });
  }
};

// Add a new event
exports.addEvent = async (req, res) => {
  try {
    const { image, title, date, time, category, status, description } =
      req.body;

    const newEvent = new Event({
      image,
      title,
      date,
      time,
      category,
      status,
      description,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      data: newEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred while adding event",
      success: false,
    });
  }
};

// Fetch all events
exports.fetchEvent = async (req, res) => {
  try {
    const listOfEvents = await Event.find({});
    res.status(200).json({
      success: true,
      data: listOfEvents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred while fetching events",
      success: false,
      error: error.message,
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, date, time, category, status, description } =
      req.body;

    const findEvent = await Event.findById(id);
    if (!findEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    findEvent.image = image || findEvent.image;
    findEvent.title = title || findEvent.title;
    findEvent.date = date || findEvent.date;
    findEvent.time = time || findEvent.time;
    findEvent.category = category || findEvent.category;
    findEvent.status = status || findEvent.status;
    findEvent.description = description || findEvent.description;

    await findEvent.save();

    res.status(200).json({
      success: true,
      data: findEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred while updating event",
      success: false,
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred while deleting event",
      success: false,
    });
  }
};
