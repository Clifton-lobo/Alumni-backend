const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    // ✅ NEW: virtual or physical event
    isVirtual: {
      type: Boolean,
      default: false,
    },

    // ✅ NEW: address (required only if NOT virtual)
    address: {
      type: String,
      trim: true,
      required: function () {
        return !this.isVirtual;
      },
    },

    registrationsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
