// Simple Express server with mock auth endpoints
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// User registration (mock)
app.post('/api/users/register', (req, res) => {
  const { firstName, lastName, email, password, institution, fieldOfStudy } = req.body;
  
  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }
  
  // Mock user creation (no actual DB)
  const user = {
    _id: 'user_' + Date.now(),
    firstName,
    lastName,
    email,
    institution: institution || 'Unknown',
    fieldOfStudy: fieldOfStudy || 'Unknown',
    token: 'mock_token_' + Math.random().toString(36).substring(2)
  };
  
  res.status(201).json(user);
});

// User login (mock)
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Mock user (no actual auth)
  const user = {
    _id: 'user_' + Date.now(),
    firstName: 'Test',
    lastName: 'User',
    email,
    institution: 'Demo University',
    fieldOfStudy: 'Computer Science',
    token: 'mock_token_' + Math.random().toString(36).substring(2)
  };
  
  res.json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`
========================================
 StudyDoc Mock Server Running on Port ${PORT}
========================================

API Endpoints:
 - GET  http://localhost:${PORT}/api/health
 - POST http://localhost:${PORT}/api/users/register
 - POST http://localhost:${PORT}/api/users/login

This is a simple mock server to test frontend authentication.
No actual database is being used.
  `);
}); 