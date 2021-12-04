const express = require("express");

const cors = require("cors");
const authRouters = require("./routers/authrouters");
const vanueroutes = require("./routers/venue");
const eventRoutes = require("./routers/event");
require("./db/mongoose");
const app = express();
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(express.json());

app.use(
  "/",
  new express.Router().get("/", (req, res) => {
    res.send("Hello world ...!");
  })
);

app.use("/users", authRouters);
app.use("/vanue", vanueroutes);
app.use("/event", eventRoutes);
module.exports = app;
