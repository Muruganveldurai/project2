const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routesapp.use('/api/books', bookRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
