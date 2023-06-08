//import
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./userModel");
const bookModel = require("./BookModel");
const AdminModel = require("./AdminModel");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// App Initialization
const JWT_SECRET = "Akash";
const port = 9453;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/uploads")));

//MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://akashchemj:acj123@cluster0.rpgctdk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.use(express.static(path.join(__dirname, "/Public/user")));
app.use(express.static(path.join(__dirname, "/Public/admin")));

const ad = require("./admin");
const us = require("./user")


// user registration
app.post("/register", async (req, res) => {
  const { name, place, age, email, education, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.send({ status: "User Exists" });
    }

    const us = await userModel.create({
      Name: name,
      place,
      age,
      email,
      education,
      phone,
      password: hashedPassword,
    });
    await us.save();

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//user view
app.get("/viewuser", async (req, res) => {
  try {
    const data = await userModel.find();
    if (data) return res.send(data);
    return res.status(404);
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//user view
app.get("/blockUser/:id", async (req, res) => {
  try {
    const data = await userModel.find();
    if (data) return res.send(data);
    return res.status(404);
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//view single user
app.get("/singleuser/:id", async (req, res) => {
  try {
    //const user=userModel.findById(req.body.id)
    //if (!user.access) return res.status(403).send("Access Denied")
    const { id } = jwt.verify(req.params.id, JWT_SECRET);
    //const { id } = req.params;
    const data = await userModel.findById(id);
    if (data) return res.send(data);
    return res.status(404);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

///////////

// user login
app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    console.log(user);
    if (!user.access)
      return res
        .status(403)
        .json({ status: "Error", error: "access", data: undefined });
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1w",
      });

      return res.status(201).json({ status: "ok", data: token });
    }

    return res
      .status(401)
      .json({ status: "Error", error: "Invalid Password", data: undefined });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", data: undefined });
  }
});

//admin login
app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check the email and password against the admin credentials in the database
    const admin = await AdminModel.findOne({ email });
    console.log(admin);

    if (admin && admin.password === password) {
      // Authentication successful
      // Generate a token for the admin
      const token = jwt.sign({ admin }, JWT_SECRET);
      console.log("admin exists");

      // Return the token in the response
      res.status(200).json({ token, admin });
    } else {
      // Authentication failed
      console.log("admin does not exist");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error authenticating admin:", error);
    res.sendStatus(500);
  }
});

//routing
/*app.post("/homepage",async(req,res)=>{
  const{token}=req.body
  try{
    const user=jwt.verify(token,JWT_SECRET,(err,res)=>{
      console.log(res,"result");
    })
    const Username=user.username
    userModel.findOne({username:Username})
    .then((data)=>{
      res.send({status:"ok",data:data})
    })
    .catch((error)=>{
      res.send({status:"error",data:error})
    })
  }catch(error){
  }
})
*/

//book details fetch
app.get("/singlebook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await bookModel.findById(id);
    if (data) return res.send(data);
    return res.status(404);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

//book details post
app.post("/createbook", upload.single("photo"), async (req, res) => {
  try {
    console.log(req.body)
    const { isbn, bookname, genre, author, publicationYear, description } =
      req.body;
    const newBook = new bookModel({
      isbn,
      bookname,
      genre,
      author,
      publicationYear,
      description,
      pic: req.file ? req.file.buffer.toString("base64") : null,
    });
    console.log("set")
    await newBook.save();
    res.send("Data Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

// Handle the POST request to add a book
app.post("/add-book", upload.single("photo"), async (req, res) => {
  console.log(req.body);
  try {
    // Create a new book object with the received data
    const newBook = new bookModel({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      photo: req.file.filename,
    });

    // Save the book to the database
    await newBook.save();
    console.log("Book added to database");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding book:", error);
    res.sendStatus(500);
  }
});

//delete book

app.delete("/delete/:id", async (req, res) => {
  var id = req.params.id;
  await bookModel.findByIdAndDelete(id);
  res.send("Deleted");
});
//book details post
app.get("/books", async (req, res) => {
  try {
    const result = await bookModel.find();
    //await result.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

//admin add
app.post("/createadmin", async (req, res) => {
  try {
    console.log(req.body);
    const result = new AdminModel(req.body);
    await result.save();
    res.send("Data Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

//delete book

app.delete("/delete/:id", async (req, res) => {
  var id = req.params.id;
  await bookModel.findByIdAndDelete(id);
  res.send("Deleted");
});

//delete user

app.delete("/userdelete/:id", async (req, res) => {
  var id = req.params.id;
  console.log(id);
  await userModel.findByIdAndDelete(id);
  res.send("Deleted");
});

//update book
app.put("/update/:id", async (req, res) => {
  let id = req.params.id;
  await bookModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

//update user
app.put("/user/userupdate/:id", async (req, res) => {
  let id = req.params.id;
  await userModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

//block user
app.put("/user/access/b/:id", async (req, res) => {
  let id = req.params.id;
  var user = await userModel.findById(id);
  user.access = false;
  await user.save();
  res.send("Updated");
});

//unblock user
app.put("/user/access/u/:id", async (req, res) => {
  let id = req.params.id;
  var user = await userModel.findById(id);
  user.access = true;
  await user.save();
  res.send("Updated");
});

// Port Checking
app.listen(port, () => {
  console.log("App listening on port 9453");
});
