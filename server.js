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

let appData = {
  message: "Hello!",
  color: "#ffffff",
};

app.set("view engine", "ejs");

// Root URL ("/") route handler
app.get("/", (req, res) => {
  // Render the "index" template and pass the helloMessage and clickMessage variables
  res.render("index", {
    message: appData["message"],
    color: appData["color"],
  });
});

// Route for saving the text for "/api/hello" or "/api"
app.post("/save", (req, res) => {
  // Update the helloMessage variable with the new value from the request body
  appData.message = req.body.message;
  appData.color = req.body.color;
  res.redirect("/");
});

// API endpoint for retrieving the message for "/api/hello"
app.get("/api/hello", (req, res) => {
  // Return the helloMessage as JSON
  res.json({ appData });
});

// API endpoint for retrieving the message for "/api/click"
app.get("/api/click", (req, res) => {
  // Return the clickMessage as JSON
  res.json({ message: clickMessage });
});
