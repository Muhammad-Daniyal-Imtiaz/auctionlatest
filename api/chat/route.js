import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await ollama.chat({
            model: 'llama3.2:1b', // Corrected model name
            messages: [{ role: 'user', content: message }],
            stream: true,
          });

          const encoder = new TextEncoder();
          
          for await (const chunk of response) {
            const content = chunk.message?.content || '';
            controller.enqueue(encoder.encode(content));
          }
        } catch (error) {
          console.error('Stream error:', error);
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(`\n[Error: ${error.message}]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain', // Changed to text/plain for simpler handling
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Ollama API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}