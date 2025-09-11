'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { User, MapPin, Sprout, Phone, Mail, Edit, Save, X } from 'lucide-react'

interface FarmerProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  district: string
  state: string
  landSize: number
  soilType: string
  irrigationType: string
  mainCrop: string
  secondaryCrops: string[]
  experience: number
  preferredLanguage: string
}

const mockProfile: FarmerProfile = {
  id: '1',
  name: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  phone: '+91 9876543210',
  location: 'Kunnamkulam',
  district: 'Thrissur',
  state: 'Kerala',
  landSize: 2.5,
  soilType: 'LOAMY',
  irrigationType: 'DRIP',
  mainCrop: 'Brinjal',
  secondaryCrops: ['Tomato', 'Chilli', 'Okra'],
  experience: 12,
  preferredLanguage: 'MALAYALAM'
}

const soilTypes = [
  { value: 'CLAY', label: 'Clay' },
  { value: 'SANDY', label: 'Sandy' },
  { value: 'LOAMY', label: 'Loamy' },
  { value: 'SILT', label: 'Silt' },
  { value: 'LATERITE', label: 'Laterite' },
  { value: 'ALLUVIAL', label: 'Alluvial' },
  { value: 'BLACK_COTTON', label: 'Black Cotton' },
]

const irrigationTypes = [
  { value: 'DRIP', label: 'Drip Irrigation' },
  { value: 'SPRINKLER', label: 'Sprinkler' },
  { value: 'FLOOD', label: 'Flood Irrigation' },
  { value: 'FURROW', label: 'Furrow Irrigation' },
  { value: 'RAINFED', label: 'Rainfed' },
]

const languages = [
  { value: 'MALAYALAM', label: 'Malayalam' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'HINDI', label: 'Hindi' },
]

export default function Profile() {
  const [profile, setProfile] = useState(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(mockProfile)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({ ...profile })
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // Here you would typically save to the backend
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof FarmerProfile, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal and farm information</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={handleEdit} className="bg-green-600 hover:bg-green-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.phone}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="experience">Experience (Years)</Label>
                {isEditing ? (
                  <Input
                    id="experience"
                    type="number"
                    value={editedProfile.experience}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                  />
                ) : (
                  <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.experience} years</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="language">Preferred Language</Label>
                {isEditing ? (
                  <Select
                    value={editedProfile.preferredLanguage}
                    onValueChange={(value) => handleInputChange('preferredLanguage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="py-2 px-3 bg-gray-50 rounded-md">
                    {languages.find(l => l.value === profile.preferredLanguage)?.label}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Sprout className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{profile.landSize} acres</p>
              <p className="text-sm text-gray-600">Total Land</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Main Crop:</span>
                <Badge variant="outline">{profile.mainCrop}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Soil Type:</span>
                <Badge variant="secondary">
                  {soilTypes.find(s => s.value === profile.soilType)?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Irrigation:</span>
                <Badge variant="secondary">
                  {irrigationTypes.find(i => i.value === profile.irrigationType)?.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location">Village/Town</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={editedProfile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.location}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="district">District</Label>
              {isEditing ? (
                <Input
                  id="district"
                  value={editedProfile.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                />
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.district}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              {isEditing ? (
                <Input
                  id="state"
                  value={editedProfile.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.state}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Farm Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" />
            Farm Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="landSize">Land Size (Acres)</Label>
              {isEditing ? (
                <Input
                  id="landSize"
                  type="number"
                  step="0.1"
                  value={editedProfile.landSize}
                  onChange={(e) => handleInputChange('landSize', parseFloat(e.target.value))}
                />
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.landSize} acres</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="mainCrop">Main Crop</Label>
              {isEditing ? (
                <Input
                  id="mainCrop"
                  value={editedProfile.mainCrop}
                  onChange={(e) => handleInputChange('mainCrop', e.target.value)}
                />
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">{profile.mainCrop}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              {isEditing ? (
                <Select
                  value={editedProfile.soilType}
                  onValueChange={(value) => handleInputChange('soilType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">
                  {soilTypes.find(s => s.value === profile.soilType)?.label}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="irrigationType">Irrigation Type</Label>
              {isEditing ? (
                <Select
                  value={editedProfile.irrigationType}
                  onValueChange={(value) => handleInputChange('irrigationType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {irrigationTypes.map((irrigation) => (
                      <SelectItem key={irrigation.value} value={irrigation.value}>
                        {irrigation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="py-2 px-3 bg-gray-50 rounded-md">
                  {irrigationTypes.find(i => i.value === profile.irrigationType)?.label}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Label>Secondary Crops</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.secondaryCrops.map((crop, index) => (
                <Badge key={index} variant="outline">{crop}</Badge>
              ))}
            </div>
            {isEditing && (
              <Input
                className="mt-2"
                placeholder="Add secondary crops (comma separated)"
                value={editedProfile.secondaryCrops.join(', ')}
                onChange={(e) => handleInputChange('secondaryCrops', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}