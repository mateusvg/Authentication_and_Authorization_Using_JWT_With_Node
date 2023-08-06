const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

// Main route to verify working API
app.get('/', (req, res) => {
    res.send({ Messagen: 'Welcome' });
});

// Authentication route
app.post('/login', (req, res) => {
    // Perform authentication logic
    // Assuming the user is authenticated successfully
    const userId = 123; // Get the user ID from your authentication logic
    // Create and sign the token
    const token = jwt.sign({ userId }, '12345abc'); // In production use environment variables
    // Send the token back to the client
    res.json({ token });
});
// Protected route
app.get('/protected', jwtMiddleware, (req, res) => {
    // Access the user ID from the request object
    const userId = req.userId;
    // Use the user ID to fetch protected resources
    // Return the resources to the client
    res.json({ userId, data: 'Protected data' });
});
// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});