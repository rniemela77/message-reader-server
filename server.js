const express = require("express"); // Import Express.js module
const app = express(); // Create an instance of Express
app.use(express.json()); // Use the built-in JSON middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Use the built-in middleware to parse URL-encoded requests

let appText = ""; // Variable to hold the text

app.set("view engine", "ejs"); // Set EJS as the view engine for Express

// Define a route for the root URL ("/") and render the index page with the current text
app.get("/", (req, res) => {
  res.render("index", { appText: appText });
});

// Define a route for saving the text
app.post("/save", (req, res) => {
  appText = req.body.appText; // Update the text from the request body
  res.redirect("/"); // Redirect back to the index page
});

// Define a route for the API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ appText: appText }); // Return the current text as a JSON object
});

// Start the server on port 3000
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
