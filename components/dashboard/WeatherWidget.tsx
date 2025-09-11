'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react'

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  rainfall: number
}

const mockWeatherData: WeatherData = {
  location: 'Thrissur, Kerala',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 75,
  windSpeed: 12,
  rainfall: 2.5
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return Sun
    case 'cloudy':
    case 'partly cloudy':
      return Cloud
    case 'rainy':
      return CloudRain
    default:
      return Cloud
  }
}

export function WeatherWidget() {
  const WeatherIcon = getWeatherIcon(mockWeatherData.condition)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WeatherIcon className="h-5 w-5" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <WeatherIcon className="h-12 w-12 text-blue-500" />
              <div>
                <p className="text-3xl font-bold">{mockWeatherData.temperature}°C</p>
                <p className="text-sm text-gray-600">{mockWeatherData.condition}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{mockWeatherData.location}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="text-sm font-medium">{mockWeatherData.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
              <p className="text-xs text-gray-500">Wind</p>
              <p className="text-sm font-medium">{mockWeatherData.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <CloudRain className="h-4 w-4 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-500">Rainfall</p>
              <p className="text-sm font-medium">{mockWeatherData.rainfall} mm</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}