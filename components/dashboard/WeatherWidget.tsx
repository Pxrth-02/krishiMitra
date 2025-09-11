'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react'
import axios from 'axios'
import useGeolocation, { Location } from '@/hooks/useGeolocation'

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  rainfall: number
}

async function fetchWeather(location: Location) {
  const lat = location.lat
  const lon = location.lng

  const options = {
    method: 'GET',
    url: 'https://open-weather13.p.rapidapi.com/latlon',
    params: {
      latitude: lat,
      longitude: lon,
      lang: 'EN',
    },
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
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
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Thrissur, Kerala',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    windSpeed: 12,
    rainfall: 2.5,
  })

  const { location, error, loading } = useGeolocation()

  useEffect(() => {
    if (!loading && location) {
      const getWeather = async () => {
        const res = await fetchWeather(location)
        if (!res) {
          console.log('Something went wrong')
          return
        }

        console.log('Weather API Response:', res)

        setWeatherData({
          location: res.name,
          temperature: Math.round(Number(res.main.temp) - 273.15), // K → °C
          condition: res.weather?.[0]?.main || 'Unknown',
          humidity: res.main.humidity,
          windSpeed: Math.round(res.wind.speed * 3.6), // m/s → km/h
          rainfall: res.rain?.['1h'] || res.rain?.['3h'] || 2.5,
        })
      }

      getWeather()
    }
  }, [loading, location])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Failed to get location</div>

  const WeatherIcon = getWeatherIcon(weatherData.condition)

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
                <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-sm text-gray-600">{weatherData.condition}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{weatherData.location}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="text-sm font-medium">{weatherData.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
              <p className="text-xs text-gray-500">Wind</p>
              <p className="text-sm font-medium">{weatherData.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <CloudRain className="h-4 w-4 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-500">Rainfall</p>
              <p className="text-sm font-medium">{weatherData.rainfall} mm</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
