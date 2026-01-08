import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import Product from '@/models/Product'

export async function GET() {
  try {
    await dbConnect()

    const revenueResult = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
    const totalRevenue = revenueResult[0]?.total || 0

    const totalOrders = await Order.countDocuments()
    const totalCustomers = await User.countDocuments({ role: { $ne: 'admin' } })
    const totalProducts = await Product.countDocuments()

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { 
        $group: { 
          _id: '$items.productId', 
          totalSold: { $sum: '$items.quantity' },
          productName: { $first: '$items.name' }
        } 
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ])

    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        avgOrderValue
      },
      topProducts: topProducts.map(product => ({
        name: product.productName,
        sales: product.totalSold
      }))
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}