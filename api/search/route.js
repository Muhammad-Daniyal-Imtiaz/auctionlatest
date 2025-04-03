import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // First determine if this is a product search
    const analysis = await ollama.chat({
      model: 'llama3.2:1b',
      messages: [{
        role: 'system',
        content: `Determine if the user wants to search for products. Respond ONLY with JSON: {"isProductSearch":boolean,"query":string}`
      }, {
        role: 'user',
        content: message
      }],
      format: 'json',
      stream: true
    });

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis.message.content);
    } catch (e) {
      throw new Error("Failed to analyze user request");
    }

    if (parsedAnalysis.isProductSearch) {
      // Perform product search
      const searchResponse = await fetch(
        `https://www.searchapi.io/api/v1/search?engine=amazon_search&q=${encodeURIComponent(parsedAnalysis.query)}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.SEARCHAPI_API_KEY}`
          }
        }
      );

      if (!searchResponse.ok) {
        throw new Error("Product search failed");
      }

      const products = (await searchResponse.json()).organic_results.slice(0, 3);

      // Generate summary
      const summary = await ollama.chat({
        model: 'llama3:1b',
        messages: [{
          role: 'system',
          content: "Summarize these product results in a helpful way"
        }, {
          role: 'user',
          content: JSON.stringify(products)
        }],
        stream: false
      });

      return NextResponse.json({
        type: 'products',
        summary: summary.message.content,
        products
      });
    }

    // Regular chat response
    const response = await ollama.chat({
      model: 'llama3:1b',
      messages: [{ role: 'user', content: message }],
      stream: false,
    });

    return NextResponse.json({
      type: 'chat',
      message: response.message.content
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || "An error occurred",
        type: 'error' 
      },
      { status: 500 }
    );
  }
}