import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getInternship } from './tools/getIntership';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getEducation } from './tools/getEducation';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

function errorHandler(error: unknown) {
  if (error == null) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('[CHAT-API] Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable');
      return new Response('Missing API key', { status: 500 });
    }

    console.log('[CHAT-API] API key available:', process.env.GOOGLE_GENERATIVE_AI_API_KEY?.slice(0, 10) + '...');

    messages.unshift(SYSTEM_PROMPT);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getInternship,
      getEducation,
    };

    console.log('[CHAT-API] About to call streamText');

    const result = await streamText({
      model: google('gemini-2.0-flash'),
      messages,
      tools,
      maxSteps: 2,
    });

    console.log('[CHAT-API] streamText completed successfully');
    const response = result.toDataStreamResponse();
    return response;
  } catch (error) {
    console.error('Chat API error:', error);

    if (error instanceof Error && error.message?.includes('quota')) {
      return new Response('API quota exceeded. Please try again later.', { status: 429 });
    }
    if (error instanceof Error && error.message?.includes('network')) {
      return new Response('Network error. Please check your connection and try again.', { status: 503 });
    }

    return new Response(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
