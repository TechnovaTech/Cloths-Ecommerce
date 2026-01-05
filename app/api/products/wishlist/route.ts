import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export async function POST(request: NextRequest) {
  try {
    const { productIds } = await request.json()

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'Product IDs are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    const products = await Product.find({
      _id: { $in: productIds }
    }).select('name price category images colors stock discount discountType')

    return NextResponse.json({
      success: true,
      products
    })
  } catch (error) {
    console.error('Error fetching wishlist products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist products' },
      { status: 500 }
    )
  }
}