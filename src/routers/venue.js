const express = require("express");
const vanueroutes = new express.Router();
const User = require("../model/User");
const Admin = require("../model/Admin");

const Organizer = require("../model/Organiser");
const Venue = require("../model/Venue");

vanueroutes.post("/add", async (req, res) => {
  try {
    const org_id = req.query.org;

    const vanue = await new Venue({
      ...req.body,
      organizer_ref: org_id,
    }).save();
    res.status(201).send(vanue);
  } catch (error) {
    console.log("error", error);
    res.status(404).send({ error });
  }
});

module.exports = vanueroutes;
