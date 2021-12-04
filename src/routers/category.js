const express = require("express");
const categoryRoutes = new express.Router();
const Category = require("../model/EventCategories");

categoryRoutes.post("/add", async (req, res) => {
  try {
    const existingCateogry = await Category.findOne({
      title,
    });
    if (existingCateogry) {
      return res.status(400).send({ error: "category already exist ...!" });
    }
    const category = await new Category({ ...req.body }).save();
    res.status(201).send(category);
  } catch (error) {}
});

module.exports = categoryRoutes;
