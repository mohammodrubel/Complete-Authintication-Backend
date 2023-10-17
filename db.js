const mongoose = require("mongoose");

const mongooseConnection = (information) => {
  // Connection
  return mongoose
    .connect(information, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection successful");
    })
    .catch((error) => {
      console.error("Connection error:", error);
    });
};

module.exports = mongooseConnection;
