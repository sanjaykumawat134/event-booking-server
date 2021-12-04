const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    booking_id: mongoose.Types.ObjectId,
    user_ref: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    event_id: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
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

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
