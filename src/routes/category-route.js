const express = require("express");
const router = express.Router();
const { Category } = require("../models");

const fetchCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};
router.get("/", fetchCategory);
module.exports = router;
