import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is blocked
    const userData = await User.findById(user.userId);
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (userData.isBlocked) {
      return NextResponse.json({ error: 'Your account has been blocked. You cannot place orders.' }, { status: 403 });
    }

    const orderData = await request.json();
    
    const order = await Order.create({
      ...orderData,
      user: user.userId,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is blocked
    const userData = await User.findById(user.userId);
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (userData.isBlocked) {
      return NextResponse.json({ error: 'Your account has been blocked.' }, { status: 403 });
    }

    const orders = await Order.find({ user: user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}