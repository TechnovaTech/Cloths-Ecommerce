import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Settings from '@/models/Settings'

export async function GET() {
  try {
    await dbConnect()
    
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create(data)
    } else {
      settings = await Settings.findOneAndUpdate({}, data, { new: true })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}