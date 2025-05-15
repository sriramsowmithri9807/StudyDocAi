# StudyDoc AI Backend Server

This is the backend server for StudyDoc AI, a study application that helps students organize their study sessions, create study rooms, schedule tasks, and more.

## MongoDB Integration

The application uses MongoDB to store user information and data. This allows for:

1. User authentication (registration and login)
2. Storing user schedules and tasks
3. Saving study room configurations
4. Persisting music preferences

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

#### Option 1: MongoDB Atlas (Cloud)

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster
3. Click "Connect" and select "Connect your application"
4. Copy the connection string
5. Create a `.env` file in the server directory with:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/studydoc
JWT_SECRET=your_secret_jwt_key
PORT=5000
```

Replace `<username>`, `<password>`, and the cluster address with your MongoDB Atlas credentials.

#### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Create a `.env` file in the server directory with:

```
MONGODB_URI=mongodb://localhost:27017/studydoc
JWT_SECRET=your_secret_jwt_key
PORT=5000
```

### 3. Start the Server

For development (with auto-reload):
```bash
npm run server:dev
```

For production:
```bash
npm run server
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate a user

### User Data
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Study Data
- `PUT /api/users/schedules` - Save user schedules
- `PUT /api/users/study-rooms` - Save study room configurations
- `PUT /api/users/music-preferences` - Save music preferences

## Integration with Frontend

The frontend application connects to this backend server using the API endpoints. The connection URL is configured in the frontend's `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

## Running Full Stack Application

To run both the frontend and backend together:

```bash
npm run dev:full
```

This will start both the React frontend and the Node.js backend concurrently. 