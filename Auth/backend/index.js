require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db");
const AuthRoutes = require("./routes/Auth.routes");


const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173" // or 3000
}));

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});