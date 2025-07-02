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

// /api/auth
exports.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        if (!users) {
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

// /api/auth/update/:idUser
exports.updateUser = async(req, res) => {
    const idUser = req.params.id;
    const { name, email, role} = req.body;
    if(!name || !email){
        res.status(400).json({
            message: "Fields are required!"
        });
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(idUser , {
            userName: name,
            email: email,
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