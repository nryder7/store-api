const { query } = require("express");
const Product = require("../models/product");
const { customError } = require("../utils/error-handler");

const getAllProducts = async (req, res) => {
  let sortResults = false;
  const {
    name,
    price,
    featured,
    rating,
    created,
    company,
    sort,
    fields,
    limit,
    numericFilter,
  } = req.query;

  const search = {
    name,
    price,
    featured,
    rating,
    created,
    company,
    sort,
  };
  const queryObject = {};
  for (const key in search) {
    if (search[key]) {
      //   console.log(key);
      if (key === "name") {
        queryObject[key] = { $regex: search[key], $options: "i" };
      } else if (key === "sort") {
        sortResults = true;
      } else {
        queryObject[key] = search[key];
      }
    }
  }
  const sortParam = sortResults ? search.sort.replace(/,/g, " ") : "-created";
  let fieldSearch = {};
  if (!fields) {
    fieldSearch = {
      name: 1,
      price: 1,
      featured: 1,
      rating: 1,
      created: 1,
      company: 1,
    };
  } else {
    fields.split(",").forEach((item) => (fieldSearch[item] = 1));
  }
  console.log(fieldSearch);
  const products = await Product.find(queryObject, fieldSearch).sort(sortParam);
  // .limit(2)
  // .skip(1);

  if (!products) {
    const newError = customError(`not found`, 404);
    throw newError;
  }
  res.status(200).json({ products });
};

const addProduct = async (req, res) => {
  await Product.create(req.body);
  res.status(201).json(req.body);
};

const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.find({ _id: id });

  if (!product) {
    //   if (product.length === 0) {
    const newError = customError(`not found`, 404);
    throw newError;
    // return;
  }
  res.status(200).json({ product });
};
const updateSingleProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );
  res.status(200).json({ product });
};
const deleteSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });
  res.status(200).json({ product });
};

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
