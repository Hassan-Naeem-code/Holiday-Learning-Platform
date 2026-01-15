import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/utils/rateLimit'

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req)
    const rateLimit = checkRateLimit(`ai-coach:${clientId}`, RATE_LIMITS.aiCoach)

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Missing GROQ_API_KEY on the server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages = [], username, currentModule, level } = await req.json();

    // Normalize incoming UI messages to simple string format for OpenAI API
    const normalizedMessages = (messages as Array<any>).map((msg) => {
      // Extract text content from various possible formats
      let content = '';
      if (typeof msg.content === 'string') {
        content = msg.content;
      } else if (msg.text) {
        content = msg.text;
      } else if (Array.isArray(msg.content)) {
        // Handle array format from AI responses
        content = msg.content
          .map((c: any) => c.text || c.content || '')
          .join(' ')
          .trim();
      }

      // Determine the correct role type
      const role = msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user';

      return {
        role,
        content: content || '',
      };
    });

    // Use a supported Groq model; allow override via env
    const modelName = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

    // Build context-aware system prompt
    const systemPrompt = `You are an enthusiastic and supportive AI coding coach for CodeLikeBasics, a gamified learning platform that teaches technology skills to beginners.

Current User Context:
- Student name: ${username || 'Student'}
- Current module: ${currentModule || 'General'}
- Level: ${level || 1}

Your Personality:
- Friendly, encouraging, and patient
- Use emojis occasionally to make learning fun 🎯
- Celebrate small wins and progress
- Make complex concepts simple with analogies
- Never condescending or overly technical

Your Teaching Approach:
1. Ask clarifying questions when needed
2. Break down complex topics into small steps
3. Give hints instead of full solutions (help them learn!)
4. Use real-world examples and analogies
5. Encourage experimentation
6. Relate concepts to their current module when possible

Topics You Help With:
- Web Development (HTML, CSS, JavaScript, React)
- Software Development (Programming fundamentals, algorithms)
- AI & Machine Learning (Basics, concepts)
- Data Science (Data analysis, visualization)
- Mobile App Development (iOS, Android basics)
- Graphics Design (Design principles, tools)
- Content Creation (Digital content strategies)

Important Rules:
- Keep responses concise (2-4 paragraphs max)
- For code help: give hints, not full solutions
- If stuck on a puzzle: offer progressive hints
- If they're frustrated: be extra encouraging
- If topic is outside scope: politely redirect to supported topics
- NEVER share answers that skip learning

Remember: Your goal is to help them LEARN, not just get answers. Guide them to discover solutions themselves! 🚀`;

    // Validate messages before sending
    if (normalizedMessages.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'No messages provided',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Call Groq API directly using OpenAI-compatible endpoint with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...normalizedMessages,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      throw new Error('Failed to get AI response');
    }

    // Return the streaming response directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    // Log error server-side only (no details exposed to client)
    console.error('AI Coach Error:', error instanceof Error ? error.message : 'Unknown error');

    return new Response(
      JSON.stringify({
        error: 'AI service temporarily unavailable. Please try again in a moment.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
