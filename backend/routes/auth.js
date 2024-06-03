import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import FileMetadata from '../models/FileMetadata.js';

const router = express.Router();

// Route for registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ token, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Route for fetching files
router.get('/files', async (req, res) => {
  try {
    const files = await FileMetadata.find();
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for deleting file
router.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await FileMetadata.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
