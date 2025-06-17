'use client';
import { useState } from 'react';
import axios from 'axios';
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

export default function SearchAmazon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define Copilot action for searching products
  useCopilotAction({
    name: "searchAmazonProducts",
    description: "Searches for products on Amazon and displays them in the chat",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "Search term for Amazon products",
        required: true
      }
    ],
    handler: async ({ query }, { setStatus, setDisplay }) => {
      try {
        setLoading(true);
        setStatus(`Searching Amazon for "${query}"...`);
        
        const response = await axios.get('https://www.searchapi.io/api/v1/search', {
          params: {
            engine: 'amazon_search',
            q: query,
            api_key: process.env.NEXT_PUBLIC_SEARCHAPI_KEY
          }
        });

        const results = response.data.organic_results.slice(0, 3);
        
        if (results.length === 0) {
          setStatus(`No products found for "${query}"`);
          return;
        }

        setDisplay(
          <div className="space-y-4">
            {results.map((product, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex gap-4">
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-24 h-24 object-contain"
                      onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{product.title}</h3>
                    {product.price && (
                      <p className="text-green-600 my-1 font-semibold">{product.price}</p>
                    )}
                    {product.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">⭐ {product.rating}</span>
                        {product.reviews && (
                          <span className="text-gray-500">({product.reviews} reviews)</span>
                        )}
                      </div>
                    )}
                    {product.link && (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        View on Amazon
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

        setStatus(`Found ${results.length} products for "${query}"`);
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message;
        setError(errorMessage);
        setStatus(`Search failed: ${errorMessage}`);
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <CopilotPopup
        instructions="Help the user search for products on Amazon. When they ask to search, use the searchAmazonProducts action to find and display results."
        defaultOpen={false}
        labels={{
          title: "Amazon Shopping Assistant",
          initial: "Hi! I can help you search for products on Amazon. What are you looking for?",
        }}
        clickOutsideToClose={true}
        positioning={{
          placement: 'bottom-end',
          offset: { mainAxis: 10, crossAxis: 0 }
        }}
      />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span>Searching Amazon...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}