import { Purchase } from "../models/purchase";

export const purchaseCourse = async (req, res) => {
    try {

        const userId = req.userId;
        const courseId = req.body.courseId;

        if (!courseId) {
            return res.status(400).json({ msg: "courseId is required" });
        }

        const existing = await Purchase.findOne({ userId, courseId });
        if (existing) {
            return res.status(400).json({ msg: "Course already purchased" });
        }

        const purchase = await Purchase.create({
            userId,
            courseId
        });

        res.json({
            msg: "course purchased successfully",
            purchase
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    };
}

export const previewCourse = async (req, res) => {
    try {
        const courses = await Purchase.find({});
        res.json({
            courses
        });
    } catch (error) {
        res.status(500).json({
            error: `something went wrong ${error.message}`
        });
    };
};