// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authorRoutes = require('./routes/authorRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use author routes
app.use('/authors', authorRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));