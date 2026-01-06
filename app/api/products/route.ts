import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query = {};
    if (category) query = { ...query, category };
    if (featured) query = { ...query, featured: true };

    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const productData = await request.json();
    
    console.log('=== PRODUCT CREATION DEBUG ===');
    console.log('Received sizeStock:', productData.sizeStock);
    console.log('Raw product data:', productData);
    
    const product = await Product.create(productData);
    
    console.log('Saved product sizeStock:', product.sizeStock);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}