import { prisma } from './prisma'

async function seedDatabase() {
  try {
    // Create sample user and farmer
    const user = await prisma.user.upsert({
      where: { email: 'ravi.kumar@example.com' },
      update: {},
      create: {
        email: 'ravi.kumar@example.com',
        name: 'Ravi Kumar',
        phone: '+91 9876543210'
      }
    })

    const farmer = await prisma.farmer.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        name: 'Ravi Kumar',
        location: 'Kunnamkulam',
        district: 'Thrissur',
        state: 'Kerala',
        landSize: 2.5,
        soilType: 'LOAMY',
        irrigationType: 'DRIP',
        mainCrop: 'Brinjal',
        secondaryCrops: ['Tomato', 'Chilli', 'Okra'],
        experience: 12,
        phoneNumber: '+91 9876543210',
        preferredLanguage: 'MALAYALAM'
      }
    })

    // Create sample activities
    await prisma.activity.createMany({
      data: [
        {
          farmerId: farmer.id,
          type: 'IRRIGATION',
          description: 'Drip irrigation applied to brinjal field',
          crop: 'Brinjal',
          area: 1.5,
          quantity: '500L',
          cost: 50,
          date: new Date('2025-01-15'),
          notes: 'Good water pressure, even distribution',
          weather: 'Sunny'
        },
        {
          farmerId: farmer.id,
          type: 'FERTILIZER_APPLICATION',
          description: 'NPK fertilizer applied',
          crop: 'Brinjal',
          area: 2,
          quantity: '50kg',
          cost: 1200,
          date: new Date('2025-01-14'),
          notes: 'Applied during evening hours',
          weather: 'Partly cloudy'
        }
      ]
    })

    // Create sample advisories
    await prisma.advisory.createMany({
      data: [
        {
          farmerId: farmer.id,
          title: 'Weather Alert',
          content: 'Heavy rainfall expected in next 48 hours. Avoid spraying pesticides.',
          type: 'WEATHER',
          priority: 'HIGH'
        },
        {
          farmerId: farmer.id,
          title: 'Pest Management',
          content: 'Check for aphid infestation. Use neem oil if needed.',
          type: 'PEST_DISEASE',
          priority: 'MEDIUM'
        }
      ]
    })

    // Create crop calendar data
    await prisma.cropCalendar.createMany({
      data: [
        {
          crop: 'Brinjal',
          district: 'Thrissur',
          month: 1,
          activity: 'Land Preparation',
          description: 'Prepare land, add organic manure'
        },
        {
          crop: 'Brinjal',
          district: 'Thrissur',
          month: 2,
          activity: 'Sowing',
          description: 'Sow seeds in nursery beds'
        },
        {
          crop: 'Brinjal',
          district: 'Thrissur',
          month: 3,
          activity: 'Transplanting',
          description: 'Transplant 30-day old seedlings'
        }
      ]
    })

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  seedDatabase()
}

export { seedDatabase }