# KrishiMitra - Smart Farming Assistant

A production-ready Next.js 15 application designed for Kerala farmers, featuring AI-powered agricultural guidance with Malayalam, English, and Hindi language support.

---

## 📖 Table of Contents
1. [System Architecture](#system-architecture)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [Database Schema & Prisma Models](#database-schema--prisma-models)
5. [Key Technical Flows](#key-technical-flows)
6. [Getting Started & Installation](#getting-started--installation)
7. [Project Structure](#project-structure)
8. [API Endpoints](#api-endpoints)
9. [Mobile & Offline Optimizations](#mobile--offline-optimizations)
10. [Security & Performance Implementations](#security--performance-implementations)
11. [Interview Q&A Cheat Sheet](#interview-qa-cheat-sheet)

---

## 🏗️ System Architecture

KrishiMitra is built with a client-server paradigm utilizing Next.js Client and Server Components. Data is stored in a relational PostgreSQL database and queried securely using Prisma ORM. 

```mermaid
graph TD
    User([Farmer UI / Mobile Client])
    NextJS[Next.js App Router Frontend / Client Components]
    ApiRoutes[API Route Handlers / Next.js Server]
    DB[(PostgreSQL Database)]
    Prisma[Prisma ORM]
    WeatherAPI[RapidAPI: OpenWeather API]

    User <-->|HTTP / REST| NextJS
    NextJS <-->|Local Client States / Geolocation| User
    NextJS <-->|Fetch Requests| ApiRoutes
    ApiRoutes <-->|Prisma Queries| Prisma
    Prisma <-->|SQL Connection| DB
    NextJS <-->|Location Queries| WeatherAPI
```

---

## 🌟 Core Features

### Core Functionality
*   **Farm Dashboard**: Comprehensive farm overview with key metrics (land size, active crops, monthly revenue, logs), alerts, and quick actions.
*   **Activity Tracking**: Log and monitor detailed farming activities (irrigation, fertilizer/pesticide application, weeding) with quantities, costs, weather details, and outcome records.
*   **Profile Management**: Complete profile management containing farm statistics, soil conditions, irrigation styles, and crop preferences.
*   **AI Chatbot**: Multilingual assistant supporting Malayalam, English, and Hindi. Ready for OpenAI integration.

### Advanced Features
*   **Real-time Weather Integration**: Pulls live conditions based on farmer's geolocation to provide specific agricultural advice (e.g. "rain expected, do not spray pesticides").
*   **Pest & Disease Management**: Simulated advisory panels for pest identification, outbreak warnings, and treatment schedules.
*   **Crop Calendar**: Season-specific and region-specific calendar showing crop sowing, transplanting, and harvest periods in Kerala.
*   **Market Price Updates**: Tracks market price trends for regional crops.
*   **Government Scheme Alerts**: Dynamic notifications about agricultural subsidies and schemes.

---

## 💻 Technology Stack

*   **Frontend Framework**: Next.js 15, React 18, TypeScript.
*   **Styling & UI**: Tailwind CSS with shadcn/ui components (Radix UI primitives).
*   **Icons & Animations**: Lucide React and Framer Motion.
*   **Database & ORM**: PostgreSQL with Prisma Client.
*   **Authentication**: NextAuth.js (ready for custom provider setup).
*   **APIs**: Geolocation API, RapidAPI (OpenWeather service), Axios.

---

## 🗃️ Database Schema & Prisma Models

The database models are designed to capture farmer metadata and logs. All relations cascade delete properly to avoid orphaned records.

```mermaid
erDiagram
    User ||--o| Farmer : "1-to-1 Profile mapping"
    Farmer ||--o{ Activity : "logs many"
    Farmer ||--o{ Advisory : "receives many"
    Farmer ||--o{ Reminder : "creates many"
    Farmer ||--o{ Alert : "receives many"
    
    User {
        string id PK
        string email UK
        string name
        string phone
        datetime createdAt
    }
    Farmer {
        string id PK
        string userId FK
        string name
        string location
        string district
        float landSize
        enum soilType
        enum irrigationType
        string mainCrop
        int experience
        enum preferredLanguage
    }
    Activity {
        string id PK
        string farmerId FK
        enum type
        string description
        string crop
        float cost
        datetime date
    }
```

### Key Enums Supported
*   **SoilType**: `CLAY`, `SANDY`, `LOAMY`, `SILT`, `LATERITE`, `ALLUVIAL`, `BLACK_COTTON`
*   **IrrigationType**: `DRIP`, `SPRINKLER`, `FLOOD`, `FURROW`, `RAINFED`
*   **Language**: `MALAYALAM`, `ENGLISH`, `HINDI`
*   **ActivityType**: `SOWING`, `IRRIGATION`, `FERTILIZER_APPLICATION`, `PESTICIDE_APPLICATION`, `WEEDING`, `HARVESTING`, `LAND_PREPARATION`, `PRUNING`, `MULCHING`, `OTHER`
*   **AdvisoryType**: `WEATHER`, `PEST_DISEASE`, `FERTILIZER`, `IRRIGATION`, `HARVESTING`, `MARKET_PRICE`, `GOVERNMENT_SCHEME`, `GENERAL`

---

## 🔄 Key Technical Flows

### 1. Geolocation & Weather Fetch
1. The farmer visits the dashboard.
2. The `useGeolocation` custom React hook prompts browser permission.
3. Once coordinates are retrieved, `WeatherWidget` queries RapidAPI's `open-weather13.p.rapidapi.com` backend.
4. Response temperatures are converted from Kelvin to Celsius: `Math.round(temp - 273.15)`.
5. Fallback location defaults to Thrissur, Kerala if permissions are denied.

### 2. Multi-Language AI Chatbot Response
The API route handler (`api/chatbot/route.ts`) checks the input language and routes prompts to custom logic:
*   Uses a regex pattern (`/[\u0D00-\u0D7F]/`) to detect Malayalam characters.
*   Runs a keyword match (`weather` / `കാലാവസ്ഥ`, `pest` / `കീട`, `fertilizer` / `വളം`) to generate tailored responses in the correct language.

---

## 🚀 Getting Started & Installation

### Prerequisites
*   Node.js 18+
*   PostgreSQL Database
*   npm, yarn, or pnpm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krishimitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/farming_app"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   OPENAI_API_KEY="your-openai-api-key"
   WEATHER_API_KEY="your-weather-api-key"
   ```

4. **Initialize database & Seed**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start dev server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact.

---

## 📁 Project Structure

```
├── api/                    # REST API Route Handlers
│   ├── activities/        # Log and fetch activities
│   ├── auth/              # Auth configurations (NextAuth)
│   ├── chatbot/           # Chat assistant endpoint
│   └── farmers/           # Farmer profile management
├── app/                    # Next.js App Router Page layouts
│   ├── activities/        # Activity logs page
│   ├── chatbot/           # Interactive chat assistant
│   ├── dashboard/         # Dashboard layout & stats
│   └── profile/           # Farmer configuration settings
├── components/            # Reusable UI components
│   ├── ui/               # shadcn UI wrappers
│   ├── layout/           # Shared Navbar & Shells
│   └── dashboard/        # Dashboard widgets (Weather, Alert Panel)
├── hooks/                  # Custom React Hooks (useGeolocation)
├── lib/                    # Configuration clients (Prisma client, Seeder)
├── prisma/                 # Database Schema configuration
└── public/                 # Static assets
```

---

## 🌐 API Endpoints

### Farmers API
*   `GET /api/farmers` — Fetch all farmers with recent activities, unread alerts, and advisories.
*   `POST /api/farmers` — Creates new farmer profiles, auto-generating linked User credentials.

### Activities API
*   `GET /api/activities?farmerId=xxx&type=xxx` — Filters farm activities by farmer and action types.
*   `POST /api/activities` — Creates a new activity log entry.

### Chatbot API
*   `POST /api/chatbot` — Submits questions (`message`, `farmerId`, `language`) to retrieve context-aware answers.

---

## 📱 Mobile & Offline Optimizations

*   **PWA Shell Architecture**: Configured with responsive grid-layouts, touch-friendly buttons, and viewport adaptations for field usage.
*   **Offline Fallbacks**: Dashboard panels utilize mock arrays and default configurations to keep features functional when network connectivity drops in rural farmlands.

---

## 🔒 Security & Performance Implementations

*   **SQL Injection Prevention**: Built entirely with Prisma ORM, which forces parameterized queries on all database operations, eliminating direct SQL injection attacks.
*   **XSS Protection**: React’s default dynamic expression escaping prevents execution of malicious Javascript inside details entered by users.
*   **Type Safety**: TypeScript definitions protect the application lifecycle against runtime exceptions.

---

## 📝 Interview Q&A Cheat Sheet

#### Q: How does the application architecture handle database operations?
> **A**: KrishiMitra uses Next.js route handlers as API endpoints. These routes construct SQL calls through Prisma Client (a type-safe ORM), connect to PostgreSQL, execute transactions, and serve JSON results back to React client components.

#### Q: What is the purpose of `output: 'export'` in next.config.js?
> **A**: This tells Next.js to perform a static HTML export, generating static builds in the `out` directory. Note that dynamic server route handlers (Node.js API routes) cannot run directly in a purely static environment. If we deploy as a pure static site, API calls must be proxied to an independent runtime backend server (like Node/Express on Cloud Run, serverless functions, or GCP).

#### Q: How does the chatbot support multiple languages?
> **A**: The chatbot detects language input by running a regex pattern check (`/[\u0D00-\u0D7F]/`) for Malayalam characters. It responds in Malayalam or English dynamically and is architected to utilize OpenAI's multi-lingual model API wrappers once configured.

#### Q: How is cascade deletion handled in the schema?
> **A**: All child tables related to `Farmer` (such as `Activity`, `Advisory`, `Reminder`, and `Alert`) are configured with `onDelete: Cascade` in the Prisma schema file. Deleting a farmer's profile automatically cleans up their operational history in PostgreSQL, preventing database bloat and maintaining referential integrity.