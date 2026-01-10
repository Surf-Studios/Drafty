# Drafty

Drafty is a modern, offline-first study workspace built with TypeScript, React, and Vite. It includes notebooks, projects, flashcards, a whiteboard, and a settings panel for themes and data import/export.

## What you can do

- Sign in with Firebase Authentication (email/password)
- Use multiple modes: Notebooks, Projects, Flashcards, Whiteboard, Study
- Organize notebooks into Projects
- Customize theme, accent color, and editor preferences
- Export/import/clear your data from Settings

## Data storage and portability

Drafty stores your content in the browser (localStorage) and namespaces it per Firebase user ID.

- Private to your device/browser profile
- Works offline after the app loads
- Not automatically synced across devices

To move data between devices/browsers, use Settings → Files:

- Export to JSON
- Import from JSON

This approach is cross-platform by default (Windows/macOS/Linux/ChromeOS) because it relies on standard web APIs, not OS-specific file paths.

## Themes and light mode

- Catppuccin theme presets with Dark/Light mode
- Accent colors are adjusted in light mode to keep UI icons and outlines readable

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Open http://localhost:5173.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Firebase setup

This project uses Firebase for authentication. If you want to point Drafty to your own Firebase project, create a `.env` in the project root and provide the `VITE_FIREBASE_*` values (see the existing Firebase setup in the repo for the exact variable names).

## License

MIT
