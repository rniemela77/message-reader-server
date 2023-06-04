const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000; // Use the dynamic port or fallback to a default (e.g., 3000)
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "node_modules" directory
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

let appText = "";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { appText: appText });
});

app.post("/save", (req, res) => {
  appText = req.body.appText;
  res.redirect("/");
});

app.get("/api/hello", (req, res) => {
  res.json({ appText: appText });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
