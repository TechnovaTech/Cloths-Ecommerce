import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Direct MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/cloths-ecommerce';

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
}, { timestamps: true });

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  sizes: [String],
  colors: [String],
  stock: Number,
  featured: Boolean,
  tags: [String],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const sampleProducts = [
  {
    name: "Premium Cashmere Sweater",
    description: "Luxurious cashmere sweater with perfect fit",
    price: 299,
    category: "Sweaters",
    images: ["/cashmere-knit-front.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"],
    stock: 50,
    featured: true,
    tags: ["premium", "cashmere", "winter"]
  },
  {
    name: "Silk Dress Shirt",
    description: "Elegant silk shirt for formal occasions",
    price: 199,
    category: "Shirts",
    images: ["/silk-shirt-front.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    stock: 30,
    featured: true,
    tags: ["silk", "formal", "elegant"]
  },
  {
    name: "Leather Boots",
    description: "Handcrafted leather boots with premium quality",
    price: 399,
    category: "Shoes",
    images: ["/leather-boots-front.jpg"],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Brown", "Black"],
    stock: 25,
    featured: false,
    tags: ["leather", "boots", "handcrafted"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });
    console.log('Created admin user');
    
    // Create sample products
    await Product.insertMany(sampleProducts);
    console.log('Created sample products');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();