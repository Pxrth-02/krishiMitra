'use client'

import { Sprout, TrendingUp, Calendar, AlertTriangle } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { RecentActivities } from '@/components/dashboard/RecentActivities'
import { WeatherWidget } from '@/components/dashboard/WeatherWidget'
import { AlertsPanel } from '@/components/dashboard/AlertsPanel'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Ravi! Here's your farm overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Land"
          value="2 acres"
          icon={Sprout}
          className="bg-gradient-to-r from-green-50 to-green-100 border-green-200"
        />
        <StatCard
          title="Active Crops"
          value="3"
          icon={Sprout}
          trend={{ value: 12, isPositive: true }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
        />
        <StatCard
          title="This Month's Revenue"
          value="₹45,000"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
        />
        <StatCard
          title="Activities Logged"
          value="12"
          icon={Calendar}
          trend={{ value: 5, isPositive: false }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <div className="xl:col-span-1">
          <WeatherWidget />
        </div>

        {/* Recent Activities */}
        <div className="xl:col-span-1">
          <RecentActivities />
        </div>

        {/* Alerts Panel */}
        <div className="xl:col-span-1 lg:col-span-2 xl:col-span-1">
          <AlertsPanel />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Sprout className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <span className="text-sm font-medium">Log Activity</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <span className="text-sm font-medium">View Calendar</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <span className="text-sm font-medium">Market Prices</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <span className="text-sm font-medium">Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  )
}