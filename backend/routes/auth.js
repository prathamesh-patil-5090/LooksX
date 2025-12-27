const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    // Basic input validation to avoid cryptic errors from bcrypt when password is missing
    const { username, email, password, role } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "username, email and password are required",
      });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        error: "Invalid password",
        message: "Password must be at least 6 characters long",
      });
    }

    // Check for existing users
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        error: "Email already in use",
        message: "An account with this email already exists",
      });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        error: "Username already in use",
        message: "Please choose a different username",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user without requiring shopName initially
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    const user = await newUser.save();
    const { password: pwd, ...others } = user._doc;

    if (!process.env.JWT_SECRET) {
      console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
      return res.status(500).json({
        error: "Server configuration error",
        message: "JWT secret is not configured",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      ...others,
      token,
      message:
        role === "barber"
          ? "Barber registered successfully. Please register your shop next."
          : "User registered successfully",
    });
  } catch (err) {
    console.error("REGISTRATION ROUTE ERROR:", err); // Enhanced server-side logging
    res.status(500).json({
      error: err.message,
      message: "Registration failed",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "No account with this email could be found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Wrong email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
      return res.status(500).json({
        error: "Server configuration error",
        message: "JWT secret is not configured",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pwd, ...others } = user._doc;

    // These headers should be handled by the global CORS middleware
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).json({ ...others, token });
  } catch (err) {
    console.error("LOGIN ROUTE ERROR:", err);
    res.status(500).json({
      error: err.message,
      message: "Login failed",
    });
  }
});

module.exports = router;
