import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

export const signupAdmin = async (req, res) => {
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

    if (!parsedData.success) {
        return res.json({
            msg: "Incorrect format",
            error: parsedData.error
        });
    };

    const { email, password, firstName, lastName } = parsedData.data;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "All fields are required" });
    };

    try {

        const hashedPassword = await bcrypt.hash(password, 5);
        const admin = await Admin.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            msg: "Signed up successfully",
            admin
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    };

};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "email and password are required"
        });
    };

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(404).json({
            msg: "User doesn't exist"
        });
    };

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (passwordMatch) {
        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_TOKEN_SECRET_ADMIN);

        res.json({
            msg: "logged in successfully",
            token
        });
    } else {
        return res.status(401).json({ error: "Invalid email or password" });
    };
};