require("firebase/storage"); // must be required for this to work
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug
const firebase = require("firebase");
const mongoose = require("mongoose");
const _ = require("lodash");

const firebaseConfig = _.mapKeys(
  _.pick(process.env, [
    "API_KEY",
    "AUTH_DOMAIN",
    "PROJECT_ID",
    "STORAGE_BUCKET",
    "MESSAGING_SENDER_ID",
    "APP_ID",
  ]),
  (_value, key) => _.camelCase(key)
);

const firebaseApp = firebase.initializeApp(firebaseConfig);

const Storage = firebaseApp.storage().ref();

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
