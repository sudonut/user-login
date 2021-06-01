let express = require("express");
let app = express();
let port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let mongoName = "",
  mongoPass = "";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://${mongoName}:${mongoPass}@auth-db.utpv2.mongodb.net/user-storage?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("error", (error) => {
  console.log(error);
});
mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB Database successfully!");
});

const dataSchema = {
  username: String,
  password: String,
  email: String,
};

const User = mongoose.model("User", dataSchema);

app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/index.html"));
});

app.post("/", (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email },
    { username: req.body.username }]})
    .then((user) => {
    if (user) {
      console.log(user);
      let errors = {};
      if (user.username === req.body.username) {
        errors.username = "Username already exists";
      } else {
        errors.email = "Email already exists";
      }
      return console.log((errors));
    } else {
      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
      newUser.save();
      res.redirect("/");
      console.log(req.body);
    }
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
