const mongoose = require("mongoose");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const Storage = getStorage(app).bucket();

module.exports = {
  Storage,
  setup,
};

function setup() {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}
