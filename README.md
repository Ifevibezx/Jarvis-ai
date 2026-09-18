# Jarvis AI

A simple Jarvis-style chatbot UI with a lightweight Express backend that connects to an OpenAI-compatible LLM API.

## Features

- Chat UI in `Index.html`
- Secure backend route at `/api/chat`
- OpenAI-compatible API support via environment variables
- Optional `OPENAI_BASE_URL` for providers like Azure OpenAI, Groq, OpenRouter, etc.

## Setup

1. Install dependencies:
   npm install

2. Create your environment file:
   cp .env.example .env

3. Add your API key:
   OPENAI_API_KEY=your_key_here

4. Start the app:
   npm start

5. Open:
   http://localhost:3000

## Notes

- Put your API key in `.env`, not in the frontend.
- The app is designed for OpenAI-compatible APIs, so it can work with OpenAI and several proxy providers.
- If you want to use a different provider, change `OPENAI_BASE_URL` and `OPENAI_MODEL` accordingly.
