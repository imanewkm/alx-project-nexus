# SocialCrafters Frontend

This directory contains the React Native/Expo frontend application for the SocialCrafters social media platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

## 📱 Features

- **Instagram-like social media interface** with craft-focused content
- **User profiles** with workshop booking capabilities
- **Interactive posts** with likes, comments, and sharing
- **Messaging system** with real-time conversations
- **Workshop discovery and booking** for craft instructors
- **Responsive design** for mobile and tablet devices
- **Centralized layout** with consistent UI patterns

## 🏗️ Project Structure

```
frontend/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home feed
│   │   ├── profile.tsx    # User profile
│   │   ├── messages.tsx   # Messages list
│   │   ├── workshops.tsx  # Workshop discovery
│   │   └── notifications.tsx # Notifications
│   ├── conversation.tsx   # Chat conversation screen
│   ├── user-profile.tsx   # Dynamic user profiles
│   ├── workshop-booking.tsx # Workshop booking
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── PostCard.tsx       # Social media post component
│   ├── PostSkeleton.tsx   # Loading skeleton
│   ├── ResponsiveContainer.tsx # Responsive wrapper
│   ├── ResponsiveFeed.tsx # Responsive feed layout
│   └── Sidebar.tsx        # Navigation sidebar
├── hooks/                 # Custom React hooks
│   ├── useFrameworkReady.ts # Framework readiness
│   └── useMockData.ts     # Mock data management
├── graphql/              # GraphQL queries and mutations
│   ├── queries.ts        # GraphQL queries
│   └── mutations.ts      # GraphQL mutations
├── lib/                  # Utility libraries
│   └── apollo-client.ts  # Apollo GraphQL client
├── types/                # TypeScript type definitions
│   └── graphql.ts        # GraphQL types
└── assets/               # Static assets
    └── images/           # App images and icons
```

## 🛠️ Technology Stack

- **React Native** with **Expo SDK** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based navigation system
- **Lucide React Native** - Beautiful icons
- **Apollo GraphQL** - Data management (prepared for backend integration)

## 🎨 Design Features

- **Centered Layout**: Instagram-like design with max-width containers (470px)
- **Responsive Design**: Adapts to mobile and tablet screen sizes
- **Craft-Focused Content**: Tailored for artists, crafters, and workshop instructors
- **Interactive Elements**: Clickable avatars, navigation between profiles
- **Workshop System**: Booking and discovery for craft workshops
- **Messaging**: Real-time conversation interface

## 🔧 Development

### Available Scripts

```bash
# Start development server
npx expo start

# Start with specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Build for production
npx expo build

# Install new dependencies
npm install <package-name>
```

### Key Components

- **PostCard**: Interactive social media posts with engagement features
- **ResponsiveFeed**: Centered, responsive feed layout
- **Profile Components**: User profiles with workshop booking capabilities
- **Navigation**: Bottom tab navigation with organized sections

## 📱 Screens Overview

1. **Home** (`index.tsx`) - Main feed with craft-focused posts
2. **Profile** (`profile.tsx`) - Current user profile with workshop options
3. **Messages** (`messages.tsx`) - Conversation list with user navigation
4. **Workshops** (`workshops.tsx`) - Workshop discovery and booking
5. **Notifications** (`notifications.tsx`) - Activity notifications
6. **User Profiles** (`user-profile.tsx`) - Dynamic profiles for other users
7. **Conversations** (`conversation.tsx`) - Individual chat screens
8. **Workshop Booking** (`workshop-booking.tsx`) - Workshop reservation system

## 🔗 Integration Ready

The frontend is prepared for backend integration with:
- GraphQL schema definitions
- Apollo Client configuration
- Type-safe API interfaces
- Mock data structure matching expected backend responses

---

**Built with ❤️ for the crafting community**
