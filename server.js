const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Set up the server to listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "node_modules" directory
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

let message = "";

app.set("view engine", "ejs");

// Route for the root URL ("/")
app.get("/", (req, res) => {
  res.render("index", { message: message });
});

// Route for saving the text
app.post("/save", (req, res) => {
  message = req.body.message;
  res.redirect("/");
});

// API endpoint for retrieving the message
app.get("/api/hello", (req, res) => {
  res.json({ message: message });
});
