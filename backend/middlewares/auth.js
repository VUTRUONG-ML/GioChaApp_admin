const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {  
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ!' });
    }
};
const verifyAdmin = (req, res, next) => {
    // Giả sử khi decode JWT, bạn gắn role vào req.user
    if (req.user?.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin
};