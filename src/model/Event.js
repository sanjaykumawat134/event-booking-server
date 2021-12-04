const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: mongoose.Types.ObjectId,
    event_name: {
      type: String,
      trim: true,
    },
    event_mode: {
      type: String,
      default: "FREE",
    },
    event_date: {
      minDate: {
        type: Date,
      },
      maxDate: {
        type: Date,
      },
    },
    event_time: {
      minTime: {
        type: Date,
      },
      maxTime: {
        type: Date,
      },
    },
    price: {
      type: Number,
    },
    venue_ref: {
      type: mongoose.Types.ObjectId,
      ref: "Venue ",
    },
    limit: {
      type: Number,
    },
    organizer_ref: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
