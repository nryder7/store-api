require("dotenv").config();
const url = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const express = require("express");
require("express-async-errors");
const app = express();
const productRouter = require("./routes/products");
const connectDB = require("./db/connect");

const errorHandler = require("./middleware/error-handler");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Store API");
});

app.use("/api/v1/products", productRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`listening port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
