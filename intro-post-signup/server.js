const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});
let User = new mongoose.model("user", userSchema);

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
    });
    await User.insertMany([newUser]);
    res.json({ status: "success", msg: "User created successfully." });
  } catch (err) {
    res.json({ status: "Failure", msg: "User unable to create." });
  }
});
app.listen(4567, () => {
  console.log("Listening to port 4567");
});
let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sumanthdps:sumanth@mern2406.9fvsa.mongodb.net/Players?retryWrites=true&w=majority&appName=Mern2406"
    );
    console.log("Successfully to connected MDB");
  } catch (err) {
    console.log("Unable to connect MDB");
  }
};
connectToMDB();
