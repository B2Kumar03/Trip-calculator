# Quick Start Guide

## 🚀 Installation & Setup

### Step 1: Install Dependencies
```bash
cd server
npm install
```

This will install:
- express
- mongoose
- socket.io
- cors
- dotenv
- uuid
- zod
- nodemon

### Step 2: Start the Server
```bash
npm start
```

The server will:
- Connect to MongoDB automatically
- Start on `http://localhost:3000`
- Enable Socket.io on the same port

## ✅ Testing the API

### Option 1: Use test-api.http file
1. Install "REST Client" extension in VS Code
2. Open `test-api.http`
3. Click "Send Request" above each endpoint

### Option 2: Use Postman/Thunder Client
Import the endpoints from `test-api.http` or manually test:
- `GET http://localhost:3000/` - Health check
- `POST http://localhost:3000/api/users` - Create user
- `GET http://localhost:3000/api/trips` - Get all trips

### Option 3: Use cURL
```bash
# Health check
curl http://localhost:3000/

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "user_full_name": "Test User",
    "email": "test@example.com"
  }'
```

## 🔌 Testing Socket.io

### Option 1: Use test-socket.html
1. Open `test-socket.html` in a browser
2. Enter server URL: `http://localhost:3000`
3. Click "Connect"
4. Enter Trip ID and Sender ID
5. Click "Join Trip"
6. Send messages!

### Option 2: Use Browser Console
```javascript
// In browser console (after including socket.io client)
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('join_trip', 'your_trip_id');
});

socket.on('new_message', (data) => {
  console.log('New message:', data);
});

socket.emit('send_message', {
  tripId: 'your_trip_id',
  sender_id: 'your_user_id',
  name: 'Test User',
  text: 'Hello!'
});
```

## 📋 Typical Workflow

1. **Create Users**
   ```
   POST /api/users
   ```

2. **Create Trip**
   ```
   POST /api/trips
   ```

3. **Add Members to Trip**
   ```
   POST /api/trips/:id/members
   ```

4. **Add Expenses**
   ```
   POST /api/expenses
   ```

5. **Calculate Settlement**
   ```
   POST /api/settlements/trip/:tripId/calculate
   ```

6. **Chat via Socket.io**
   - Connect to socket
   - Join trip room
   - Send/receive messages

## 🔍 Verify Everything Works

1. **Check MongoDB Connection**
   - Look for: `✅ MongoDB Connected: ...` in console

2. **Check Server Running**
   - Visit: `http://localhost:3000`
   - Should see JSON response with endpoints

3. **Test Socket.io**
   - Open `test-socket.html`
   - Connect and send a test message

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check internet connection
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (if using Atlas)

### Port Already in Use
- Change PORT in `.env` or `index.js`
- Or kill process using port 3000

### Socket.io Not Connecting
- Check CORS settings in `index.js`
- Verify frontend URL matches CORS origin
- Check browser console for errors

## 📝 Notes

- MongoDB URI is hardcoded in `db/index.js` as fallback
- All models have timestamps (createdAt, updatedAt)
- Socket.io rooms are named: `trip_${tripId}`
- All IDs are MongoDB ObjectIds
