const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://akashchemj:acj123@cluster0.rpgctdk.mongodb.net/?retryWrites=true&w=majority')

let Schema = mongoose.Schema;

//Schema Creation of User Details
const userSchema = new Schema({
  Name: String,
  place: String,
  age: Number,
  email:  
  {
    type: String,
    unique:true,
    required:true
  },
  education: String,
  phone: Number,
  password: {
    type:String,
    required:true
  },
  access:{
    type:Boolean,
    default:true
  },
  likedBooks:[String]
});

const userModel = mongoose.model("user", userSchema);

module.exports =userModel;
  
