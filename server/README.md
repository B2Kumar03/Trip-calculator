# Trip Calculator API Server

Complete REST API and Socket.io server for Trip Calculator application.

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the server directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://bk7355583_db_user:N0PHPrtp0RnKPftW@cluster0.bc5oyiq.mongodb.net/?appName=Cluster0
```

### 3. Start Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### Users (`/api/users`)
- `POST /` - Create user
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `GET /email/:email` - Get user by email
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Trips (`/api/trips`)
- `POST /` - Create trip
- `GET /` - Get all trips
- `GET /:id` - Get trip by ID
- `PUT /:id` - Update trip
- `DELETE /:id` - Delete trip
- `POST /:id/members` - Add member to trip
- `DELETE /:id/members` - Remove member from trip

### Expenses (`/api/expenses`)
- `POST /` - Create expense
- `GET /` - Get all expenses
- `GET /trip/:tripId` - Get expenses by trip
- `GET /trip/:tripId/summary` - Get expense summary
- `GET /:id` - Get expense by ID
- `PUT /:id` - Update expense
- `DELETE /:id` - Delete expense

### Settlements (`/api/settlements`)
- `POST /trip/:tripId/calculate` - Calculate settlement
- `GET /trip/:tripId` - Get settlement by trip
- `PUT /trip/:tripId/status` - Update settlement status
- `GET /` - Get all settlements

### Chat (`/api/chat`)
- `GET /trip/:tripId` - Get or create chat
- `GET /trip/:tripId/messages` - Get chat messages
- `POST /message` - Add message (REST)
- `DELETE /trip/:tripId/message/:messageId` - Delete message

## 🔌 Socket.io Events

### Client → Server

#### Join Trip Chat
```javascript
socket.emit("join_trip", tripId);
```

#### Leave Trip Chat
```javascript
socket.emit("leave_trip", tripId);
```

#### Send Message
```javascript
socket.emit("send_message", {
  tripId: "trip_id_here",
  sender_id: "user_id_here",
  name: "User Name",
  text: "Message text",
  file: "" // optional
});
```

#### Typing Indicator
```javascript
socket.emit("typing", {
  tripId: "trip_id_here",
  userId: "user_id_here",
  userName: "User Name",
  isTyping: true
});
```

### Server → Client

#### Joined Trip
```javascript
socket.on("joined_trip", (data) => {
  console.log(data.message); // "Successfully joined trip chat"
});
```

#### New Message
```javascript
socket.on("new_message", (data) => {
  console.log(data.message); // Message object with sender info
});
```

#### User Typing
```javascript
socket.on("user_typing", (data) => {
  console.log(`${data.userName} is typing`);
});
```

#### Error
```javascript
socket.on("error", (data) => {
  console.error(data.message);
});
```

## 🧪 Testing

### REST API Testing
Use the `test-api.http` file with REST Client extension in VS Code, or use Postman/Thunder Client.

### Socket.io Testing
Use the client test file or connect from your frontend:

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Join a trip
  socket.emit('join_trip', 'trip_id_here');
});

socket.on('new_message', (data) => {
  console.log('New message:', data.message);
});

// Send a message
socket.emit('send_message', {
  tripId: 'trip_id_here',
  sender_id: 'user_id_here',
  name: 'Test User',
  text: 'Hello from socket!'
});
```

## 📁 Project Structure

```
server/
├── controllers/     # Business logic
│   ├── user.controller.js
│   ├── trip.controller.js
│   ├── expense.controller.js
│   ├── settlement.controller.js
│   └── chat.controller.js
├── models/          # MongoDB schemas
│   ├── user.model.js
│   ├── trip.model.js
│   ├── expense.model.js
│   ├── settlement.model.js
│   └── chat.model.js
├── routes/          # API routes
│   ├── user.routes.js
│   ├── trip.routes.js
│   ├── expense.routes.js
│   ├── settlement.routes.js
│   └── chat.routes.js
├── socket/          # Socket.io handlers
│   └── chat.socket.js
├── db/              # Database connection
│   └── index.js
├── index.js         # Main server file
└── package.json
```

## 🔒 Notes

- MongoDB connection string is hardcoded in `db/index.js` as fallback
- CORS is set to `*` for development - change in production
- Socket.io CORS should match your frontend URL in production
- All timestamps are automatically managed by Mongoose
