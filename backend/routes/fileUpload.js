import express from 'express';
import multer from 'multer';
import path from 'path';
import FileMetadata from '../models/FileMetadata.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/images')); // Change directory as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/uploads', upload.single('file'), async (req, res) => {
  const { description, category, country } = req.body;
  const filePath = path.relative(path.join(__dirname, '../../uploads'), req.file.path).replace(/\\/g, '/');

  const file = new FileMetadata({
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    size: req.file.size,
    path: filePath,
    category,
    country,
    description,
  });

  try {
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(400).json({ error: 'Error saving file metadata' });
  }
});

// Public endpoint to fetch files
router.get('/files', async (req, res) => {
  try {
    const files = await FileMetadata.find();
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
