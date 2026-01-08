import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'ATELIER' },
  adminEmail: { type: String, default: 'admin@example.com' },
  currency: { type: String, default: 'INR' },
  taxRate: { type: Number, default: 10 },
  shippingFee: { type: Number, default: 50 },
  notifications: { type: Boolean, default: true },
  emailAlerts: { type: Boolean, default: true },
  maintenanceMode: { type: Boolean, default: false }
}, {
  timestamps: true
})

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema)