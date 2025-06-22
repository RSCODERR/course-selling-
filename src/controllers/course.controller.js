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

export const editCourse = async (req, res) => {
    try {
        const adminID = req.userId;
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findOneAndUpdate(
            { _id: courseId, creatorId: adminID },
            updates,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ msg: "Course not found or unauthorized" });
        }

        res.json({ msg: "Course updated", courseId: course.id });

    } catch (error) {
        res.status(500).json({
            msg: `something went wrong ${error.message}`
        });
    }
};


export const bulkViewer = async (req, res) => {
    try {
        const adminID = req.userId;
        const courses = await Course.find({
            creatorId: adminID
        });

        if (!courses.length) {
            return res.status(404).json({
                msg: "Error no courses found"
            });
        };

        res.json({
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    };
};