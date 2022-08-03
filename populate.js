// require("dotenv").config();
// const url = process.env.ATLAS_URI;
// const connectDB = require("./db/connect");
// const productsJSON = require("./products.json");
// const Product = require("./models/product");

// const start = async () => {
//   try {
//     await connectDB(url);
//     await Product.deleteMany();
//     await Product.create(productsJSON);
//     console.log(`success`);
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// start();

// name
// price
// featured
// rating
// created:
// company: {
//     values: ["ikea", "liddy", "caressa", "marcos"]
//   }
