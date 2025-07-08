const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const { userName, email, phoneNumber, passWord } = req.body;

        // Check user already exists
        const exitUser = await User.findOne({
            $or: [{ userName }, { email }]
        });
        if (exitUser) {
            return res.status(400).json({ message: "Tên người dùng hoặc email đã tồn tại." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(passWord, 10);

        const user = new User({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            passWord: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error ", error: error.message });
    }
};

exports.login = async(req, res) => {
    try{
        const {email, passWord} = req.body;

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({ message: "Tài khoản sử dụng email không tồn tại" });
        }

        const isMatch = await bcrypt.compare(passWord, user.passWord);
        if(!isMatch){
            return res.status(400).json({ message: 'Sai mật khẩu' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user:{
                id: user._id,
                userName:user.userName,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login Fail" });
    }
};

// /api/auth
exports.getUsers = async (req, res) => {
    try{
        const currentUserId = req.user.id;
        const users = await User.find({_id: {$ne: currentUserId}}); // $ne: not equal -> lấy danh sách users ngoại trừ user hiện tại đang đăng nhập
        if (users.length === 0) {
            return res.status(404).json({ message: "User empty" });
        }

        res.status(200).json({
            message:"fectch users successful!",
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Server error: ", error: error.message });
    }
};

// /api/auth/:id
exports.getUserById = async (req, res) => {
    const idUser = req.params.id;
    try{
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: "User empty" });
        }

        res.status(200).json({
            message:"fectch user successful!",
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Server error: ", error: error.message });
    }
};

// /api/auth/me
exports.getMe = async (req, res) => {
    const idUser = req.user.id;
    try{
        const me = await User.findById(idUser).select("-password");
        if(!me){
            res.status(404).json({message: "User not found!"});
        }
        res.status(200).json(me);
    } catch (error) {
        res.status(500).json({ message: "Server error: ", error: error.message });
    }
};

// /api/auth/update/:id
exports.updateUser = async(req, res) => {
    const idUser = req.params.id;
    const { name, email, phoneNumber, role} = req.body;
    if(!name || !email){
        res.status(400).json({
            message: "Fields are required!"
        });
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(idUser , {
            userName: name,
            email: email,
            phoneNumber: phoneNumber,
            isAdmin: role
        }, {new: true});

        if(!updatedUser){
            res.status(404).json({message: "User not found!"});
        }
        
        res.status(200).json({
            message: "Update user successfull",
            user: updatedUser
        });
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// /api/auth/delete/:idUser
exports.deleteUser = async(req, res) => {
    const idUser = req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(idUser);
        if(!deletedUser){
            res.status(404).json({message: "User not found!"});
        }

        res.status(200).json({
            message: "Deleted user successfull!",
            user: deletedUser
        })
    } catch(error) {
        res.status(500).json({message: "Server error", error: error.message});
    };
};