const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akashchemj:acj123@cluster0.rpgctdk.mongodb.net/?retryWrites=true&w=majority"
);

let Schema = mongoose.Schema;

//Schema Creation of User Details
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel;
