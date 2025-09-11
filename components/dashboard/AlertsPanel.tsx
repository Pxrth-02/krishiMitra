'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react'
import { format } from 'date-fns'

interface Alert {
  id: string
  title: string
  message: string
  type: 'WEATHER' | 'PEST_OUTBREAK' | 'PRICE_ALERT' | 'GOVERNMENT_SCHEME'
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
  createdAt: Date
  isRead: boolean
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Heavy Rain Expected',
    message: 'Heavy rainfall predicted for next 48 hours. Avoid spraying pesticides.',
    type: 'WEATHER',
    severity: 'WARNING',
    createdAt: new Date('2025-01-15T08:00:00'),
    isRead: false
  },
  {
    id: '2',
    title: 'Pest Outbreak Alert',
    message: 'Aphid infestation reported in nearby brinjal farms. Inspect your crop immediately.',
    type: 'PEST_OUTBREAK',
    severity: 'CRITICAL',
    createdAt: new Date('2025-01-14T14:30:00'),
    isRead: false
  },
  {
    id: '3',
    title: 'Price Update',
    message: 'Brinjal prices increased by 15% in Thrissur market. Good time to sell.',
    type: 'PRICE_ALERT',
    severity: 'INFO',
    createdAt: new Date('2025-01-14T09:15:00'),
    isRead: true
  }
]

const alertIcons = {
  INFO: Info,
  WARNING: AlertTriangle,
  CRITICAL: AlertCircle,
}

const alertColors = {
  INFO: 'bg-blue-100 text-blue-800 border-blue-200',
  WARNING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CRITICAL: 'bg-red-100 text-red-800 border-red-200',
}

const typeColors = {
  WEATHER: 'bg-blue-50 text-blue-700',
  PEST_OUTBREAK: 'bg-red-50 text-red-700',
  PRICE_ALERT: 'bg-green-50 text-green-700',
  GOVERNMENT_SCHEME: 'bg-purple-50 text-purple-700',
}

export function AlertsPanel() {
  const unreadCount = mockAlerts.filter(alert => !alert.isRead).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} new</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockAlerts.map((alert) => {
            const Icon = alertIcons[alert.severity]
            const alertColorClass = alertColors[alert.severity]
            const typeColorClass = typeColors[alert.type]
            
            return (
              <div
                key={alert.id}
                className={`p-3 border rounded-lg ${alertColorClass} ${!alert.isRead ? 'border-l-4' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{alert.title}</span>
                    {!alert.isRead && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="text-sm mb-2 opacity-90">{alert.message}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={typeColorClass}>
                    {alert.type.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs opacity-70">
                    {format(alert.createdAt, 'MMM dd, HH:mm')}
                  </span>
                </div>
              </div>
            )
          })}
          
          {mockAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}