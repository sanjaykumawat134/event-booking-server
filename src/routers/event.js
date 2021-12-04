const express = require("express");
const eventRoutes = new express.Router();
const User = require("../model/User");
const Admin = require("../model/Admin");
const Organizer = require("../model/Organiser");
const Venue = require("../model/Venue");
const Event = require("../model/Event");
eventRoutes.post("/add", async (req, res) => {
  try {
    const org_id = req.query.org;

    const event = await new Event({
      ...req.body,
      organizer_ref: org_id,
    }).save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
    console.log("errror", error);
  }
});

module.exports = eventRoutes;
