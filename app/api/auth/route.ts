import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password, name, action } = await request.json();

    if (action === 'register') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      const user = await User.create({ name, email, password });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      return NextResponse.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      return NextResponse.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}