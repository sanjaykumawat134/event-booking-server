const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    booking_id: mongoose.Types.ObjectId,
    event_date: Date,
    user_ref: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    event_id: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("User", bookingSchema);

module.exports = Booking;
