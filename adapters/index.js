const mongoose = require("mongoose");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const app = initializeApp({
  credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  storageBucket: process.env.STORAGE_BUCKET,
});

const Storage = getStorage(app).bucket();

module.exports = {
  Storage,
  setup,
};

async function setup() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const connection = mongoose.connection;

    connection.once("open", function () {
      console.log("MongoDB database connection established successfully");
      resolve();
    });
  });
}
