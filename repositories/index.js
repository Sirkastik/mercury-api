const mongoose = require("mongoose");

module.exports = {
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
