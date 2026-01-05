import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Collection from '@/models/Collection';

export async function GET() {
  try {
    await dbConnect();
    const collections = await Collection.find({}).populate('products').sort({ createdAt: -1 });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const collection = await Collection.create(data);
    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}