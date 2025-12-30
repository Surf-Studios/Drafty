# Drafty

A beautiful, minimalist note-taking application built with TypeScript, React, and Vite.

## Features

- ✏️ **Create and manage notes** - Write and organize your thoughts effortlessly
- 🔐 **Firebase Authentication** - Secure user login and signup
- 👤 **User-specific notes** - Each user has their own private notes
- 🎨 **Claude-inspired theme** - Warm, professional design with a focus on readability
- 🔤 **Trebuchet MS font** - Clean, modern typography throughout
- 💾 **Local storage** - Your notes are automatically saved to your browser
- 🎯 **Simple and intuitive** - No unnecessary complexity, just notes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Firebase account (free tier works)

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Email/Password authentication in the Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
3. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and create a web app if you haven't already
   - Copy the firebaseConfig values

4. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

5. Fill in your Firebase credentials in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Sign up or sign in** with your email and password
2. Click "✏️ New Note" to create a new note
3. Enter a title and start writing
4. Your notes are automatically saved as you type
5. Click on any note in the sidebar to view or edit it
6. Use the "🗑️ Delete" button to remove notes
7. Click "🚪 Sign Out" when you're done

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Firebase** - Authentication and user management
- **CSS3** - Styling with CSS variables

## Design Philosophy

Drafty follows a minimalist design philosophy inspired by Claude's interface:
- Warm, earthy color palette (#ca9763 accent color)
- Clean, spacious layout
- Focus on content over chrome
- Smooth transitions and interactions

## License

MIT
