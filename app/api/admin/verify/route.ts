import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token');
  
  if (!adminToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  return NextResponse.json({ success: true });
}