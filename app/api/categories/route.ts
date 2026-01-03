import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    console.log('=== CATEGORY CREATION DEBUG ===');
    console.log('Raw request data:', data);
    console.log('Images received:', data.images);
    console.log('Images array length:', data.images?.length || 0);
    
    // Ensure images is always an array
    const images = Array.isArray(data.images) ? data.images : [];
    
    const categoryData = {
      name: data.name,
      description: data.description,
      status: data.status || 'active',
      images: images
    };
    
    console.log('Saving category with images count:', images.length);
    
    const category = new Category(categoryData);
    const savedCategory = await category.save();
    
    console.log('Saved category images:', savedCategory.images);
    console.log('Saved category full:', savedCategory.toObject());
    
    return NextResponse.json(savedCategory.toObject(), { status: 201 });
  } catch (error) {
    console.error('Category creation error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}