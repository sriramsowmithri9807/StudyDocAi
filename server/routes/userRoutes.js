import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, institution, fieldOfStudy, studentId } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      institution,
      fieldOfStudy,
      studentId
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        institution: user.institution,
        fieldOfStudy: user.fieldOfStudy,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        institution: user.institution,
        fieldOfStudy: user.fieldOfStudy,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        institution: user.institution,
        fieldOfStudy: user.fieldOfStudy,
        studentId: user.studentId,
        schedules: user.schedules,
        studyRooms: user.studyRooms,
        musicPreferences: user.musicPreferences
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.institution = req.body.institution || user.institution;
      user.fieldOfStudy = req.body.fieldOfStudy || user.fieldOfStudy;
      user.studentId = req.body.studentId || user.studentId;
      
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        institution: updatedUser.institution,
        fieldOfStudy: updatedUser.fieldOfStudy,
        studentId: updatedUser.studentId,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/schedules
// @desc    Save or update user schedules
// @access  Private
router.put('/schedules', protect, async (req, res) => {
  try {
    const { schedules } = req.body;
    
    if (!schedules || !Array.isArray(schedules)) {
      return res.status(400).json({ message: 'Invalid schedules data' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.schedules = schedules;
      await user.save();
      
      res.json({ message: 'Schedules saved successfully', schedules: user.schedules });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/study-rooms
// @desc    Save or update user study rooms
// @access  Private
router.put('/study-rooms', protect, async (req, res) => {
  try {
    const { studyRooms } = req.body;
    
    if (!studyRooms || !Array.isArray(studyRooms)) {
      return res.status(400).json({ message: 'Invalid study rooms data' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.studyRooms = studyRooms;
      await user.save();
      
      res.json({ message: 'Study rooms saved successfully', studyRooms: user.studyRooms });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/music-preferences
// @desc    Save or update user music preferences
// @access  Private
router.put('/music-preferences', protect, async (req, res) => {
  try {
    const { musicPreferences } = req.body;
    
    if (!musicPreferences) {
      return res.status(400).json({ message: 'Invalid music preferences data' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.musicPreferences = musicPreferences;
      await user.save();
      
      res.json({ message: 'Music preferences saved successfully', musicPreferences: user.musicPreferences });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 