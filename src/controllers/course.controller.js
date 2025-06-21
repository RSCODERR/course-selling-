import { Course } from "../models/course.js"

export const createCourse = async (req, res) => {
    const adminID = req.userId;
    const { title, description, price, imageUrl } = req.body;
    const course = await Course.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminID
    });
    res.json({
        msg: "course created successfully",
        courseId: course.id
    });
};