const express = require("express");
const bookingRoutes = new express.Router();
const User = require("../model/User");
const Admin = require("../model/Admin");
const Organizer = require("../model/Organiser");
const Venue = require("../model/Venue");
const Event = require("../model/Event");

bookingRoutes.post("/add", async (req, res) => {
    try {
          const booking =        
    } catch (error) {
        
   }
});

module.exports = bookingRoutes;
