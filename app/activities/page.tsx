'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Plus, Filter, Droplets, Sprout, Bug, Scissors, Search } from 'lucide-react'
import { format } from 'date-fns'

interface Activity {
  id: string
  type: string
  description: string
  crop: string
  area?: number
  quantity?: string
  cost?: number
  date: Date
  notes?: string
  weather?: string
}

const mockActivities: Activity[] = [
  {
    id: '1',
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
    id: '2',
    type: 'FERTILIZER_APPLICATION',
    description: 'NPK fertilizer applied',
    crop: 'Brinjal',
    area: 2,
    quantity: '50kg',
    cost: 1200,
    date: new Date('2025-01-14'),
    notes: 'Applied during evening hours',
    weather: 'Partly cloudy'
  },
  {
    id: '3',
    type: 'PESTICIDE_APPLICATION',
    description: 'Organic pesticide spray for aphid control',
    crop: 'Brinjal',
    area: 2,
    quantity: '10L',
    cost: 800,
    date: new Date('2025-01-13'),
    notes: 'Focused on leaf undersides',
    weather: 'Calm, no wind'
  },
  {
    id: '4',
    type: 'WEEDING',
    description: 'Manual weeding around plants',
    crop: 'Brinjal',
    area: 1,
    cost: 300,
    date: new Date('2025-01-12'),
    notes: 'Removed grass and broad-leaf weeds',
    weather: 'Overcast'
  }
]

const activityIcons = {
  IRRIGATION: Droplets,
  FERTILIZER_APPLICATION: Sprout,
  PESTICIDE_APPLICATION: Bug,
  WEEDING: Scissors,
  SOWING: Sprout,
  HARVESTING: Sprout,
}

const activityColors = {
  IRRIGATION: 'bg-blue-100 text-blue-800',
  FERTILIZER_APPLICATION: 'bg-green-100 text-green-800',
  PESTICIDE_APPLICATION: 'bg-red-100 text-red-800',
  WEEDING: 'bg-yellow-100 text-yellow-800',
  SOWING: 'bg-purple-100 text-purple-800',
  HARVESTING: 'bg-orange-100 text-orange-800',
}

export default function Activities() {
  const [activities, setActivities] = useState(mockActivities)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCrop, setFilterCrop] = useState('all')

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.crop.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    const matchesCrop = filterCrop === 'all' || activity.crop === filterCrop
    
    return matchesSearch && matchesType && matchesCrop
  })

  const totalCost = filteredActivities.reduce((sum, activity) => sum + (activity.cost || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor and log all your farming activities</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Log New Activity
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
                <p className="text-2xl font-bold">{filteredActivities.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">₹{totalCost.toLocaleString()}</p>
              </div>
              <Sprout className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">{filteredActivities.filter(a => a.date.getMonth() === new Date().getMonth()).length}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="IRRIGATION">Irrigation</SelectItem>
                <SelectItem value="FERTILIZER_APPLICATION">Fertilizer</SelectItem>
                <SelectItem value="PESTICIDE_APPLICATION">Pesticide</SelectItem>
                <SelectItem value="WEEDING">Weeding</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCrop} onValueChange={setFilterCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="Brinjal">Brinjal</SelectItem>
                <SelectItem value="Tomato">Tomato</SelectItem>
                <SelectItem value="Chilli">Chilli</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle>Activities Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const Icon = activityIcons[activity.type as keyof typeof activityIcons] || Sprout
              const colorClass = activityColors[activity.type as keyof typeof activityColors] || 'bg-gray-100 text-gray-800'
              
              return (
                <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <Icon className="h-5 w-5 text-green-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={colorClass}>
                          {activity.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">{activity.crop}</Badge>
                        <span className="text-sm text-gray-500">
                          {format(activity.date, 'MMM dd, yyyy')}
                        </span>
                        {activity.weather && (
                          <span className="text-xs text-gray-400">
                            Weather: {activity.weather}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-2">{activity.description}</h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {activity.area && (
                          <div>
                            <span className="text-gray-500">Area:</span>
                            <span className="ml-2 font-medium">{activity.area} acres</span>
                          </div>
                        )}
                        {activity.quantity && (
                          <div>
                            <span className="text-gray-500">Quantity:</span>
                            <span className="ml-2 font-medium">{activity.quantity}</span>
                          </div>
                        )}
                        {activity.cost && (
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="ml-2 font-medium">₹{activity.cost}</span>
                          </div>
                        )}
                      </div>
                      
                      {activity.notes && (
                        <p className="text-sm text-gray-600 mt-2 italic">{activity.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No activities found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}