import jwt from "jsonwebtoken";

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(403).json({ msg: "You're not signed in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_ADMIN);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}

export { adminMiddleware }