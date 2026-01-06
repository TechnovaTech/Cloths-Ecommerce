import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await Order.find({ user: user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orderData = await request.json();
    
    // Update stock for each item in the order
    for (const item of orderData.items) {
      const product = await Product.findById(item.product);
      if (product) {
        // If product has size-specific stock
        if (product.sizeStock && product.sizeStock.length > 0 && item.size) {
          const sizeIndex = product.sizeStock.findIndex(s => s.size === item.size);
          if (sizeIndex !== -1) {
            // Reduce size-specific stock
            product.sizeStock[sizeIndex].stock = Math.max(0, product.sizeStock[sizeIndex].stock - item.quantity);
          }
          // Recalculate total stock from all sizes
          product.stock = product.sizeStock.reduce((total, sizeItem) => total + sizeItem.stock, 0);
        } else {
          // Reduce general stock
          product.stock = Math.max(0, product.stock - item.quantity);
        }
        
        await product.save();
      }
    }

    const order = await Order.create({
      ...orderData,
      user: user.userId,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}