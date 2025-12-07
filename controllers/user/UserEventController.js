const Event = require("../../models/Event.model.js");

const getFilteredEvents = async (req, res) => {
  try {
    console.log("📥 Filter request received:", req.query);

    const { filter, startDate, endDate, search } = req.query;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 👉 Default: return all events
    let query = {};

    if (search && search.trim() !== "") {
      query.title = { $regex: search, $options: "i" };
    }

    if (filter === "next7") {
      const next7 = new Date(today);
      next7.setDate(today.getDate() + 7);
      query.date = { $gte: today, $lte: next7 };
    }

    if (filter === "next30") {
      const next30 = new Date(today);
      next30.setDate(today.getDate() + 30);
      query.date = { $gte: today, $lte: next30 };
    }

    if (filter === "next60") {
      const next60 = new Date(today);
      next60.setDate(today.getDate() + 60);
      query.date = { $gte: today, $lte: next60 };
    }

    if (filter === "custom" && startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // 📌 Important: Make sure "all" doesn't override the main query variable
    query = {}; // keep everything
    console.log("Query sending =>", query);

    const events = await Event.find(query).sort({ date: 1 });

    console.log("Found events:", events.length);

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    console.log("❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getEventDetails, getFilteredEvents };
