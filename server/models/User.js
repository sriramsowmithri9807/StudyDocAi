import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  institution: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  studentId: {
    type: String
  },
  schedules: [{
    title: String,
    tasks: [{
      name: String,
      completed: Boolean,
      duration: Number,
      priority: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  studyRooms: [{
    name: String,
    subject: String,
    environment: String,
    duration: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  musicPreferences: {
    volume: {
      type: Number,
      default: 50
    },
    genre: {
      type: String,
      default: 'ambient'
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User; 