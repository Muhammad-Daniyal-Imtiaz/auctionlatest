// app/api/callAssistant/route.js
import { NextResponse } from 'next/server';
import { VapiClient } from "@vapi-ai/server-sdk";

export async function POST(request) {
  const { message } = await request.json();

  const client = new VapiClient({ token: process.env.VAPI_API_KEY });

  try {
    const response = await client.assistants.message({
      assistantId: 'eabc7ef5-531c-49a4-b2fd-dfdf6e293478',
      request: {
        messages: [
          {
            role: "user",
            content: message,
          }
        ]
      }
    });

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error) {
    console.error('Error calling Vapi Assistant:', error);
    return NextResponse.json({ error: 'Error contacting the assistant.' }, { status: 500 });
  }
}
