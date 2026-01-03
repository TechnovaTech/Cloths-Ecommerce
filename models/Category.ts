import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  images: {
    type: [String],
    default: []
  },
}, {
  timestamps: true,
});

// Clear any existing model to avoid conflicts
if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model('Category', CategorySchema);