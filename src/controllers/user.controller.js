import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

export const signupUser = async (req, res) => {

    const requiredBody = z.object({
        email: z.string()
            .min(3, "Email too short")
            .max(40, "Email too long")
            .email("Invalid email"),
        password: z.string()
            .min(6, "Password must be at least 6 characters")
            .max(25, "Password too long")
            .refine(val =>
                /[a-z]/.test(val) &&     // must have lowercase
                /[A-Z]/.test(val) &&     // must have uppercase
                /\d/.test(val),          // must have number
                { message: "Password must include uppercase, lowercase, and a number" }
            ),
        firstName: z.string()
            .min(2, "Name too short")
            .max(50, "Name too long")
            .refine(val => /^[a-zA-Z\s]+$/.test(val), {
                message: "Name must only contain letters and spaces"
            }),
        lastName: z.string()
            .min(2, "Name too short")
            .max(50, "Name too long")
            .refine(val => /^[a-zA-Z\s]+$/.test(val), {
                message: "Name must only contain letters and spaces"
            })
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData) {
        return res.json({
            msg: "Incorrect format",
            error: parsedDataWithSuccess.error
        });
    };

    const { email, password, firstName, lastName } = parsedData.data;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "All fields are required" });
    };

    try {

        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            msg: "Signed up successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    };

};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "email and password are required"
        });
    };

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            msg: "User doesn't exist"
        });
    };

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN_SECRET_USER);

        res.json({
            msg: "logged in successfully",
            token
        });
    } else {
        return res.status(401).json({ error: "Invalid email or password" });
    };

};