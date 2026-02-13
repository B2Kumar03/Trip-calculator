import { User } from "../models/user.model.js";
import { sendWelcomeEmail } from "../services/email.service.js";

// Create/Register User
export const createUser = async (req, res) => {
  try {
    const { user_full_name, email, upi_id, qr_code_image, allowedNotification } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = new User({
      user_full_name,
      email,
      upi_id,
      qr_code_image,
      allowedNotification: allowedNotification || [],
    });

    await user.save();
    
    // Send welcome email
    if (email) {
      await sendWelcomeEmail(email, user_full_name);
    }
    
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-token");
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-token");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { user_full_name, email, upi_id, qr_code_image, allowedNotification, interestedVisitPlace } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        user_full_name,
        email,
        upi_id,
        qr_code_image,
        allowedNotification,
        interestedVisitPlace,
      },
      { new: true, runValidators: true }
    ).select("-token");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User by Email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-token");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
