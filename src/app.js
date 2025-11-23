const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cdac2025")
  .then(() => console.log("Connected!"));

const Schema = mongoose.Schema;
const BlogPost = new Schema({
  name: String,
  email: String,
  password: Number,
});
const MyModel = mongoose.model("Users", BlogPost);

const express = require("express");
const app = express();

app.use(express.urlencoded()); //for capturing data from html forms

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/users", async (req, res) => {
  try {
    const result = await MyModel.find();
    res.render("users.ejs", {
      data: result,
    });
  } catch (error) {
    res.send("Error" + err);
  }
  //res.render("users.ejs");
});

app.post("/registerAction", async (req, res) => {
  try {
    let record = new MyModel(req.body);
    await record.save();
    res.redirect("/users");
  } catch (error) {
    res.send("Error" + error);
  }
});
app.listen(3000);
