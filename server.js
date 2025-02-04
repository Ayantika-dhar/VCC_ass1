const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/testdb';  // Connecting to your local MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));

// Define a simple Schema
const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true }
});

const Message = mongoose.model('Message', MessageSchema);

// API Routes
app.get('/', (req, res) => {
    res.send('Hello World from Express & MongoDB!');
});

// Add a new message to MongoDB
app.post('/add', async (req, res) => {
    const { text } = req.body;
    const message = new Message({ text });

    try {
        await message.save();
        res.status(201).send({ message: ' Message saved!', data: message });
    } catch (error) {
        res.status(500).send({ message: ' Error saving message.', error });
    }
});

// Retrieve all messages from MongoDB
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.send(messages);
    } catch (error) {
        res.status(500).send({ message: ' Error fetching messages.', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});

