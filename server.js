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
    const token = jwt.sign({ userId }, '12345abc', { expiresIn: "10s" }); // In production use environment variables, expire in 10 seconds
    // Send the token back to the client and save this token in local storage
    res.json({ token });

    // To save a string in Local Storage you use
    // window.localStorage.setItem(key, value);
    // You can get the value later with:
    // window.localStorage.getItem(key);
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