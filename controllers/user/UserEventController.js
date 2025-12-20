const Event = require("../../models/Event.model.js");


const getFilteredEvents = async (req, res) => {
  try {
    console.log("📥 Filter request received:", req.query);

    const { filter, startDate, endDate, search } = req.query;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 15;
    let skip = (page-1) * limit;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = {};

    // 🔍 Search by title (case-insensitive)
    if (search && search.trim() !== "") {
      query.title = { $regex: search, $options: "i" };
    }

    // 📅 Apply date filters ONLY when required
    const dateQuery = {};

    if (filter === "next7") {
      const next7 = new Date(today);
      next7.setDate(today.getDate() + 7);
      dateQuery.$gte = today;
      dateQuery.$lte = next7;
    }

    if (filter === "next30") {
      const next30 = new Date(today);
      next30.setDate(today.getDate() + 30);
      dateQuery.$gte = today;
      dateQuery.$lte = next30;
    }

    if (filter === "next60") {
      const next60 = new Date(today);
      next60.setDate(today.getDate() + 60);
      dateQuery.$gte = today;
      dateQuery.$lte = next60;
    }

    if (filter === "custom" && startDate && endDate) {
      dateQuery.$gte = new Date(startDate);
      dateQuery.$lte = new Date(endDate);
    }

    // ➕ If date filter exists, merge into main query
    if (Object.keys(dateQuery).length > 0) {
      query.date = dateQuery;
    }

    const totalEvents = await Event.countDocuments(query);

    console.log("🔍 Final Query =>", query);

    const events = await Event.find(query)
    .sort({ date: 1 })
    .skip(skip)
    .limit(limit);

    console.log("Found events:", events.length);

    return res.status(200).json({
      success: true,
      events,
      currentPage : page,
      totalPages : Math.ceil(totalEvents/limit),
      totalEvents,
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
