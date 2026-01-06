import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  offerTag: {
    type: String,
    enum: ['New Arrival', 'Best Seller', 'Limited Offer', ''],
    default: '',
  },
  images: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  colors: [{
    type: String,
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sizeStock: {
    type: [{
      size: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
    }],
    default: [],
  },
  minStock: {
    type: Number,
  },
  maxStock: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;