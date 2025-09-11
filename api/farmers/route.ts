import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const farmers = await prisma.farmer.findMany({
      include: {
        user: true,
        activities: {
          take: 5,
          orderBy: { date: 'desc' }
        },
        advisories: {
          where: { isRead: false }
        },
        alerts: {
          where: { isRead: false }
        }
      }
    })

    return NextResponse.json(farmers)
  } catch (error) {
    console.error('Error fetching farmers:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const farmer = await prisma.farmer.create({
      data: {
        ...data,
        user: {
          create: {
            email: data.email,
            name: data.name,
            phone: data.phoneNumber
          }
        }
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(farmer, { status: 201 })
  } catch (error) {
    console.error('Error creating farmer:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}