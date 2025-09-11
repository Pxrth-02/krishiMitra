'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Droplets, Sprout, Bug } from 'lucide-react'
import { format } from 'date-fns'

interface Activity {
  id: string
  type: string
  description: string
  date: Date
  crop?: string
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'IRRIGATION',
    description: 'Drip irrigation applied to brinjal field',
    date: new Date('2025-01-15'),
    crop: 'Brinjal'
  },
  {
    id: '2',
    type: 'FERTILIZER_APPLICATION',
    description: 'NPK fertilizer applied - 50kg',
    date: new Date('2025-01-14'),
    crop: 'Brinjal'
  },
  {
    id: '3',
    type: 'PEST_MONITORING',
    description: 'Checked for pest infestation',
    date: new Date('2025-01-13'),
    crop: 'Brinjal'
  },
  {
    id: '4',
    type: 'WEEDING',
    description: 'Manual weeding completed',
    date: new Date('2025-01-12'),
    crop: 'Brinjal'
  }
]

const activityIcons = {
  IRRIGATION: Droplets,
  FERTILIZER_APPLICATION: Sprout,
  PEST_MONITORING: Bug,
  WEEDING: Sprout,
  SOWING: Sprout,
  HARVESTING: Sprout,
}

const activityColors = {
  IRRIGATION: 'bg-blue-100 text-blue-800',
  FERTILIZER_APPLICATION: 'bg-green-100 text-green-800',
  PEST_MONITORING: 'bg-red-100 text-red-800',
  WEEDING: 'bg-yellow-100 text-yellow-800',
  SOWING: 'bg-purple-100 text-purple-800',
  HARVESTING: 'bg-orange-100 text-orange-800',
}

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = activityIcons[activity.type as keyof typeof activityIcons] || Sprout
            const colorClass = activityColors[activity.type as keyof typeof activityColors] || 'bg-gray-100 text-gray-800'
            
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-full bg-green-100">
                  <Icon className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className={colorClass}>
                      {activity.type.replace('_', ' ')}
                    </Badge>
                    {activity.crop && (
                      <Badge variant="outline">{activity.crop}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                  <p className="text-xs text-gray-400">{format(activity.date, 'MMM dd, yyyy')}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}