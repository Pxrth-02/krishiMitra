'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Leaf } from 'lucide-react'
import { format } from 'date-fns'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  language?: 'malayalam' | 'english'
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഹായിയാണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?',
    sender: 'bot',
    timestamp: new Date('2025-01-15T10:00:00'),
    language: 'malayalam'
  },
  {
    id: '2',
    content: 'വഴുതന ചെടിയിൽ ഇലകൾ മഞ്ഞയായി വരുന്നു. എന്താണ് കാരണം?',
    sender: 'user',
    timestamp: new Date('2025-01-15T10:05:00'),
    language: 'malayalam'
  },
  {
    id: '3',
    content: 'വഴുതന ഇലകൾ മഞ്ഞയാവാനുള്ള പ്രധാന കാരണങ്ങൾ:\n\n1. അമിത വെള്ളം അല്ലെങ്കിൽ കുറവ് വെള്ളം\n2. പോഷകക്കുറവ് (പ്രത്യേകിച്ച് നൈട്രജൻ)\n3. കീടങ്ങളുടെയോ രോഗങ്ങളുടെയോ ആക്രമണം\n\nനിലവിൽ എത്ര തവണ വെള്ളം നൽകുന്നുണ്ട്? അടുത്തിടെ എന്തെങ്കിലും വളം കൊടുത്തിട്ടുണ്ടോ?',
    sender: 'bot',
    timestamp: new Date('2025-01-15T10:06:00'),
    language: 'malayalam'
  }
]

const suggestedQuestions = [
  'വഴുതന കൃഷിയുടെ സമയം എപ്പോൾ?',
  'മഴക്കാലത്ത് എന്ത് ശ്രദ്ധിക്കണം?',
  'പുതിയ കീടങ്ങളെ എങ്ങനെ തിരിച്ചറിയാം?',
  'വില നിർണ്ണയം എവിടെ കാണാം?',
  'When is the best time to harvest brinjal?',
  'What fertilizers should I use for tomatoes?'
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date(),
        language: newMessage.match(/[\u0D00-\u0D7F]/) ? 'malayalam' : 'english'
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): string => {
    const isEnglish = !userMessage.match(/[\u0D00-\u0D7F]/)
    
    if (userMessage.toLowerCase().includes('weather') || userMessage.includes('കാലാവസ്ഥ')) {
      return isEnglish 
        ? 'Based on current weather conditions in Thrissur, we expect moderate rainfall in the next 2 days. It\'s a good time to avoid spraying pesticides. Make sure your drainage is working well.'
        : 'ത്രിശ്ശൂരിലെ നിലവിലെ കാലാവസ്ഥ പ്രകാരം, അടുത്ത 2 ദിവസത്തിൽ മിതമായ മഴ പ്രതീക്ഷിക്കാം. കീടനാശിനി തളിക്കുന്നത് ഒഴിവാക്കുന്നതാണ് നല്ലത്. ഡ്രെയിനേജ് ശരിയാണെന്ന് ഉറപ്പുവരുത്തുക.'
    }
    
    if (userMessage.toLowerCase().includes('pest') || userMessage.includes('കീട')) {
      return isEnglish
        ? 'For pest management in brinjal: 1) Check leaves regularly, 2) Use neem oil spray weekly, 3) Install yellow sticky traps, 4) Maintain proper spacing between plants. Would you like specific treatment for any particular pest?'
        : 'വഴുതനയിലെ കീട നിയന്ത്രണത്തിന്: 1) ഇലകൾ പതിവായി പരിശോധിക്കുക, 2) വാരത്തിലൊരിക്കൽ വേപ്പെണ്ണ തളിക്കുക, 3) മഞ്ഞ കെണികൾ വയ്ക്കുക, 4) ചെടികൾക്കിടയിൽ ശരിയായ ഇടം പാലിക്കുക. ഏതെങ്കിലും പ്രത്യേക കീടത്തിന് ചികിത്സ വേണോ?'
    }
    
    return isEnglish
      ? 'I understand your concern. Based on your farm profile and current conditions, I recommend consulting with our knowledge base or speaking to a local agricultural expert. Can you provide more specific details about your issue?'
      : 'നിങ്ങളുടെ പ്രശ്നം ഞാൻ മനസ്സിലാക്കുന്നു. നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ വിവരങ്ങളും നിലവിലെ അവസ്ഥയും അടിസ്ഥാനമാക്കി, ഞങ്ങളുടെ വിജ്ഞാന ശേഖരം പരിശോധിക്കുകയോ പ്രാദേശിക കാർഷിക വിദഗ്ധനുമായി സംസാരിക്കുകയോ ചെയ്യാൻ ശുപാർശ ചെയ്യുന്നു. കൂടുതൽ വിശദാംശങ്ങൾ നൽകാമോ?'
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // Here you would integrate with speech recognition API
    if (!isRecording) {
      // Start recording
      console.log('Starting voice recording...')
    } else {
      // Stop recording and process
      console.log('Stopping voice recording...')
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">KrishiMitra AI Assistant</h1>
        <p className="text-gray-600 mt-2">Get instant help with your farming questions in Malayalam or English</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-600" />
                Chat Assistant
                <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-green-600' 
                      : 'bg-blue-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`max-w-[70%] ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(message.timestamp, 'HH:mm')}
                      {message.language && (
                        <span className="ml-2 capitalize">({message.language})</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your question in Malayalam or English..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleVoiceRecording}
                  variant="outline"
                  size="icon"
                  className={isRecording ? 'bg-red-100 text-red-600' : ''}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Leaf className="h-4 w-4 mr-2" />
                Crop Calendar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Weather Updates
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Market Prices
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Government Schemes
              </Button>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-2 text-sm rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Language Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Language Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  മലയാളം (Malayalam)
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  English
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  हिन्दी (Hindi)
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Ask questions in your preferred language. The AI will respond accordingly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}