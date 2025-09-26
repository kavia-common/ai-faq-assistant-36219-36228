# FAQ Bot Frontend (React)

A clean and modern interface for interacting with the AI-powered FAQ Bot (RAG + MCP).
Implements the Ocean Professional theme with blue primary and amber accents.

## Features
- Ocean Professional theme (modern, minimalist, subtle gradients, smooth transitions)
- Central question input with primary action
- Answer panel with loading and error states
- Recent questions sidebar with quick select and clear
- REST API integration via environment-configurable base URL

## Getting Started

Install dependencies:
- npm install

Run the app in development mode:
- npm start
Open http://localhost:3000 in your browser.

Build for production:
- npm run build

## Backend API

By default, the frontend will POST to the relative route:
- POST /api/ask
Body:
- { "question": "your question" }

If your backend runs on a different host/port, set an environment variable:
- Create a .env file in the project root, using .env.example as a reference
- REACT_APP_API_BASE_URL=http://localhost:8000

The final endpoint becomes {REACT_APP_API_BASE_URL}/api/ask

## Theme

Key theme variables are defined in src/App.css:
- --primary: #2563EB
- --secondary: #F59E0B
- --bg, --surface, --text, etc.

Theme toggle (light/dark) is supported and applied at document root (data-theme attribute).

## Project Structure

- src/App.js: Main layout tying together header, input, answer, recent
- src/components/Header.jsx: Top bar with brand and theme toggle
- src/components/QuestionInput.jsx: Central input + Ask button
- src/components/AnswerPanel.jsx: Displays AI answer
- src/components/RecentQuestions.jsx: Sidebar list of previous questions
- src/services/api.js: REST API calls and environment config

## Notes

- No heavy UI frameworks are used; styles are handcrafted for performance and clarity.
- Keep the backend URL in environment variables; do not hardcode secrets or addresses.
