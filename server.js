const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Index.html'));
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY is not set. Add it to your .env file.'
      });
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');

    const llmResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: 'You are Jarvis, a smart personal assistant. Be helpful, concise, and natural. Keep responses clear and friendly.'
          },
          { role: 'user', content: String(message).trim() }
        ]
      })
    });

    const data = await llmResponse.json();

    if (!llmResponse.ok) {
      const errorMessage = data?.error?.message || 'Unknown error from the LLM API.';
      return res.status(llmResponse.status).json({ error: errorMessage });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No response content returned by the model.' });
    }

    res.json({ reply });
  } catch (error) {
    console.error('LLM API error:', error);
    res.status(500).json({ error: 'Failed to process the request. Please try again.' });
  }
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Jarvis AI running at http://localhost:${port}`);
});
