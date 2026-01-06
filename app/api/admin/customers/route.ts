import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    
    // Get all users
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    // Get order statistics for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });
        const orderCount = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          orderCount,
          totalSpent
        };
      })
    );
    
    return NextResponse.json(usersWithStats);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}