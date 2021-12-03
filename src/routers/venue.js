const express = require("express");
const vanueroutes = new express.Router();
const User = require("../model/User");
const Admin = require("../model/Admin");

const Organizer = require("../model/Organiser");
const Venue = require("../model/Venue");

authroutes.post("/vanue", async (req, res) => {
  try {
    const org_id = req.params.org_id;

    const vanue = await new Venue({ ...req.body, organizer_ref: org_id });
  } catch (error) {
    res.status(404).send({ error });
  }
});
