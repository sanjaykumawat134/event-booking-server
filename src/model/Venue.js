const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    venueId: mongoose.Types.ObjectId,
    vanue_name: {
      type: String,
      trim: true,
    },

    event_time: {
      type: Date,
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

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
