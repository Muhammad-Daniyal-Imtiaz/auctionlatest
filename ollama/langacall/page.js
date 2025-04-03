'use client';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAnswer = async () => {
    if (!query.trim()) {
      setError('Please enter a question');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch answer');
      }
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>RAG System with Next.js & Ollama</h1>
      <input
        type="text"
        placeholder="Ask a question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={fetchAnswer} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {answer && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}