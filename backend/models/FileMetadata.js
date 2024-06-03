// backend/models/FileMetadata.js
import mongoose from 'mongoose';

const fileMetadataSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  path: { type: String, required: true },
  category: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
});

const FileMetadata = mongoose.model('FileMetadata', fileMetadataSchema);

export default FileMetadata;

