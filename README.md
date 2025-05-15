# 📚 StudyDoc AI

Transform your study experience with AI-powered document analysis and learning assistance.

![StudyDoc AI](https://img.shields.io/badge/StudyDoc-AI-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=for-the-badge&logo=mongodb)

## ✨ Features

- 🤖 **AI-Powered Document Analysis**: Advanced document understanding and summarization
- 👥 **Study Rooms**: Collaborative learning spaces for group study
- ⏱️ **Pomodoro Timer**: Built-in focus timer for effective study sessions
- 📅 **Study Scheduler**: Plan and organize your study sessions
- 💬 **AI Assistant**: Get instant help with your study materials
- 💾 **MongoDB Integration**: Store user data and settings persistently
- **AI Assistant with Llama LLM**: Integrated AI assistant that can answer questions based on uploaded documents
- **Document Analysis**: Upload study materials for AI to analyze and extract key information
- **Flashcard Generation**: Automatically generate study flashcards from your uploaded documents
- **Quiz Generation**: Create custom quizzes based on your study materials

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start mock server for authentication (in a separate terminal)
npm run mock-server

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with Shadcn/ui
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **State Management**: React Query
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Llama LLM**: Integration with Llama LLM for enhanced document analysis and content generation

## 🌟 Key Components

- **Study Room**: Virtual spaces for focused learning
- **AI Chat**: Intelligent study assistance
- **Document Analysis**: Smart document processing
- **Progress Tracking**: Monitor your study progress
- **User Accounts**: Save and retrieve your data

## 🗄️ MongoDB Integration

StudyDoc AI now supports MongoDB integration for storing user data, allowing for:

1. User authentication (registration and login)
2. Persistent storage of schedules and tasks
3. Saving study room configurations
4. Storing music preferences

### Setup Instructions

#### Quick Start with Mock Server

To quickly test the application with a mock authentication server (no actual database):

```bash
npm run mock-server
```

This will start a simple Express server on port 5000 that simulates user registration and login.

#### Full MongoDB Setup

For full functionality with MongoDB:

1. Create a MongoDB Atlas account or use a local MongoDB installation
2. Create a `.env` file in the root directory with:

```
VITE_API_URL=http://localhost:5000/api
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/studydoc
JWT_SECRET=your_secure_secret_key
PORT=5000
```

3. Install dependencies if you haven't already:

```bash
npm install
```

4. Start the MongoDB server:

```bash
npm run server
```

5. In a separate terminal, start the frontend:

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

### Available API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/schedules` - Save user schedules
- `PUT /api/users/study-rooms` - Save study room configurations
- `PUT /api/users/music-preferences` - Save music preferences

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 💜 for students and lifelong learners

## Llama LLM Integration

The AI Assistant now features integration with Llama LLM for enhanced document analysis and content generation:

### Key AI Features

1. **Document Analysis**
   - Upload and process study materials
   - Extract key concepts and information
   - Utilize semantic understanding for better responses

2. **Smart Q&A**
   - Ask questions about your study materials
   - Get contextual answers based on your uploaded documents
   - Receive explanations tailored to your study content

3. **Automated Flashcards**
   - Generate study flashcards from your documents
   - Organize cards by topic
   - Review with an interactive flashcard interface

4. **Custom Quizzes**
   - Create quizzes based on your study materials
   - Multiple-choice questions with explanations
   - Track your progress and understanding

## Technical Implementation

The Llama LLM integration is implemented using:

- Document processing pipeline for text extraction
- Context-aware question answering system
- Custom flashcard and quiz generators
- Frontend components for interactive study tools

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open the application in your browser

## Technologies

- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn/UI
- MongoDB
- JWT Authentication
- Llama LLM
