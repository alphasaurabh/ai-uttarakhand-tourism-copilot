const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const prisma = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");
const router = express.Router();

// Register
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("captchaToken")
            .notEmpty()
            .withMessage("CAPTCHA verification is required"),
    ],
    async (req, res) => {
        const { name, email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        try {
            if (!process.env.RECAPTCHA_SECRET_KEY) {
                return res.status(500).json({
                    message: "CAPTCHA is not configured on the server",
                });
            }

            const captchaResponse = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        secret: process.env.RECAPTCHA_SECRET_KEY,
                        response: req.body.captchaToken,
                    }),
                }
            );
            const captchaResult = await captchaResponse.json();

            if (!captchaResult.success) {
                return res.status(400).json({
                    message: "CAPTCHA verification failed. Please try again.",
                });
            }

            // Check if email already exists
            const existingUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already registered",
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to database
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    });

// Login
router.post("/login", authLimiter, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// Protected Profile Route
router.get("/profile", verifyToken, (req, res) => {
    return res.status(200).json({
        message: "Protected route accessed successfully",
        user: req.user,
    });
});

module.exports = router;
