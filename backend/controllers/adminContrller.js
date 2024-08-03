const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = createToken(admin._id);

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        const token = createToken(admin._id)
        res.json({ success: true, token })

        res.status(201).json({ success: true, message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    createAdmin,
    loginAdmin
}