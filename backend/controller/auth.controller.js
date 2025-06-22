const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const { userName, email, passWord } = req.body;

        // Check user already exists
        const exitUser = await User.find({userName: userName});
        if (exitUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(passWord, 10);

        const user = new User({
            userName: userName,
            email: email,
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
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(passWord, user.passWord);
        if(!isMatch){
            return res.status(400).json({ error: 'Invalid password' });
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

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-passWord');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({user});
    } catch (error) {
        res.status(500).json({ message: "Server error: ", error: error.message });
    }
};