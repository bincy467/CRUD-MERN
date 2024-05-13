const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/crud');

// Get all users
app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
app.post('/create', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
app.delete('/deleteuser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await UserModel.findByIdAndDelete(id);
        res.json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is Running");
});
