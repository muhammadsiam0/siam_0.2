import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: String,
  size: Number,
  mimeType: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.File || mongoose.model('File', fileSchema);