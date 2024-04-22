const dotenv = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

// Configure dotenv
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());

// Using Routes
app.use("/api", require("./Routes/api"));

// Define the port for the server
const PORT = process.env.PORT || 6000;

// Start the server
// Connecting to the database
mongoose
  .connect(process.env.MONGOSE_URI)
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting", err));
