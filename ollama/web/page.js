'use client';
import { useState } from 'react';
import axios from 'axios';

export default function TestSearch() {
  const [query, setQuery] = useState('iPhone 13 Pro Max');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://www.searchapi.io/api/v1/search', {
        params: {
          engine: 'amazon_search',
          q: query,
          api_key: process.env.NEXT_PUBLIC_SEARCHAPI_KEY // From .env
        }
      });
      
      setResults(response.data.organic_results.slice(0, 3));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Amazon Search (Client-Side)</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Search for products..."
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="space-y-4">
        {results.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="flex gap-4">
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-24 h-24 object-contain"
                />
              )}
              <div>
                <h3 className="font-medium">{product.title}</h3>
                {product.price && (
                  <p className="text-green-600 my-1">{product.price}</p>
                )}
                {product.rating && (
                  <p className="text-yellow-500 text-sm">
                    ⭐ {product.rating} ({product.reviews || '0'} reviews)
                  </p>
                )}
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline mt-2 inline-block"
                >
                  View Product
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && !error && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}