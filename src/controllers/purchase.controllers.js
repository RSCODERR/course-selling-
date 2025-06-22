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


export const userPurchases = async (req, res) => {
    try {
        const userId = req.userId;

        const purchases = await Purchase.find({
            userId
        });

        if (!purchases.length) { // .find always returns an array so check if it's empty if yes then no courses found
            return res.json({
                msg: "no courses found"
            });
        }

        res.json({
            purchases
        });
    } catch (error) {
        res.status(500).json({
            error: `something went wrong ${error.message}`
        });
    };
};