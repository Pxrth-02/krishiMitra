# KrishiMitra - Smart Farming Assistant

A production-ready Next.js application designed for Kerala farmers, featuring AI-powered agricultural guidance with Malayalam language support.

## Features

### Core Functionality
- **Dashboard**: Comprehensive farm overview with key metrics and statistics
- **Activity Tracking**: Log and monitor farming activities with detailed records  
- **Profile Management**: Complete farmer and farm information management
- **AI Chatbot**: Multilingual assistant supporting Malayalam, English, and Hindi

### Advanced Features
- **Weather Integration**: Real-time weather data and farming recommendations
- **Pest & Disease Management**: AI-powered pest identification and treatment advice
- **Market Price Updates**: Current market rates and selling recommendations
- **Government Scheme Alerts**: Notifications about subsidies and schemes
- **Crop Calendar**: Season-specific farming guidance
- **Personalized Advisory**: Context-aware recommendations based on farm profile

### Technical Features
- **Mobile-First Design**: Fully responsive across all devices
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Core features work without internet
- **Voice Input**: Speech-to-text for easy data entry
- **Multi-language Support**: Malayalam, English, Hindi interfaces

## Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js (ready for integration)
- **AI/ML**: OpenAI API integration for chatbot
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Database Schema

### Key Models
- **User**: Authentication and basic user data
- **Farmer**: Comprehensive farmer profile with farm details
- **Activity**: Farming activity tracking with costs and outcomes
- **Advisory**: AI-generated farming advice and recommendations  
- **Alert**: Weather, pest, and market alerts
- **CropCalendar**: Season-specific farming guidance
- **WeatherData**: Historical and current weather information

## Getting Started

### Prerequisites
- Node.js 16+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd krishimitra-farming-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Configure the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/farming_app"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-api-key"
WEATHER_API_KEY="your-weather-api-key"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── dashboard/         # Dashboard page
│   ├── activities/        # Activity tracking page
│   ├── profile/          # Profile management page
│   ├── chatbot/          # AI chatbot interface
│   └── api/              # API routes
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## API Endpoints

### Farmers API
- `GET /api/farmers` - Fetch all farmers
- `POST /api/farmers` - Create new farmer profile

### Activities API  
- `GET /api/activities` - Fetch farming activities (with filtering)
- `POST /api/activities` - Log new farming activity

### Chatbot API
- `POST /api/chatbot` - Send message to AI assistant

## Features in Detail

### Dashboard
- Farm overview with key statistics
- Recent activities timeline
- Weather widget with 7-day forecast
- Alert and notification panel
- Quick action buttons

### Activity Tracking
- Log various farming activities (irrigation, fertilization, pest control, etc.)
- Track costs, quantities, and outcomes
- Filter and search capabilities
- Visual timeline of activities
- Export functionality

### Profile Management
- Personal information management
- Farm details (location, soil type, irrigation, crops)
- Experience and preferences
- Multi-language settings
- Profile picture upload

### AI Chatbot
- Natural language processing in Malayalam
- Voice input and audio output
- Context-aware responses
- Integration with farm profile data
- Suggested questions and quick actions

## Mobile Responsiveness

The application is designed mobile-first with:
- Touch-friendly interface elements
- Optimized layouts for small screens  
- Hamburger navigation menu
- Swipe gestures support
- Offline functionality for core features

## Security Features

- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection
- CSRF protection
- Rate limiting on API endpoints
- Secure authentication flows

## Performance Optimizations

- Server-side rendering with Next.js
- Image optimization
- Code splitting and lazy loading
- Database query optimization
- Caching strategies
- CDN integration ready

## Deployment

The application is configured for easy deployment on:
- Vercel (recommended for Next.js)
- Netlify
- AWS
- Google Cloud Platform
- Self-hosted servers

### Environment Variables for Production
Ensure all environment variables are properly configured in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Kerala Agricultural Department for domain expertise
- Local farmers for requirements and feedback
- Open source community for excellent tools and libraries

---

**KrishiMitra** - Empowering Kerala farmers with AI-driven agricultural intelligence.