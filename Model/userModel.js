const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props) => `Invalid Email ${props.value}`,
    },
  },
  password: {
    type: String,
    minlength: [6, "minimum length 6 characters"],
    required: true,
  },
  roles: {
    type: Array,
    default: "USERS",
    required: true,
  },
  accountsStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECT"],
    default: "PENDING",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
