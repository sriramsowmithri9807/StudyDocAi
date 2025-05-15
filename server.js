const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// Mock user registration
app.post('/api/users/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const user = {
    id: 'user_' + Date.now(),
    firstName,
    lastName,
    email,
    token: 'token_' + Math.random().toString(36).substr(2)
  };
  
  res.json(user);
});

// Mock user login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = {
    id: 'user_' + Date.now(),
    firstName: 'Demo',
    lastName: 'User',
    email,
    token: 'token_' + Math.random().toString(36).substr(2)
  };
  
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API health check: http://localhost:${PORT}/api/health`);
  console.log(`API Endpoints:`);
  console.log(`- POST http://localhost:${PORT}/api/users/register`);
  console.log(`- POST http://localhost:${PORT}/api/users/login`);
}); 