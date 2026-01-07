import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email role createdAt'
      })
      .populate({
        path: 'items.product',
        select: 'name images price category'
      })
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Admin orders fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}