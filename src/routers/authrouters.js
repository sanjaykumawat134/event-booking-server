const express = require("express");
const authroutes = new express.Router();
const User = require("../model/User");
const Admin = require("../model/Admin");

const Organizer = require("../model/Organiser");

authroutes.post("/admin_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findUserByCredientials(email, password);
    const token = await user.generateToken();

    res.status(200).send({ user, token });
  } catch (error) {
    console.log("error", error);
    res.status(404).send({ error });
  }
});
authroutes.post("/register", async (req, res) => {
  try {
    const role = req.header("Role");
    console.log("role ...", role);

    let user, existingUser;
    if (role === "ADMIN") {
      existingUser = await Admin.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ error: "Email already in use !" });
      }
      user = await new User(req.body).save();
    }
    if (role === "ORGANIZER") {
      user = await Organizer.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ error: "Email already in use !" });
      }
      user = await new Organizer(req.body).save();
    }
    if (role === "USER") {
      user = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ error: "Email already in use !" });
      }
      user = await new User(req.body).save();
    }

    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send(error);
  }
});
// authroutes.post("/admin_register", async (req, res) => {
//   try {
//     const existingUser = await Admin.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ error: "Email already in use !" });
//     }
//     const user = await new Admin(req.body).save();
//     const token = await user.generateToken();
//     res.status(201).send({ user, token });
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).send(error);
//   }
// });

authroutes.post("/login", async (req, res) => {
  try {
    const role = req.header("Role");
    const { email, password } = req.body;
    let user;
    if (role === "ADMIN") {
      user = await User.findUserByCredientials(email, password);
    }
    if (role === "Organizer") {
      user = await Organizer.findUserByCredientials(email, password);
    }
    if (role === "USER") {
      user = await Admin.findUserByCredientials(email, password);
    }
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "something happened wrong...!" });
  }
});

module.exports = authroutes;
