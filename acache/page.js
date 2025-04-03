// components/JsonDataFetcher.jsx
'use client'
import { useState } from 'react'

export default function JsonDataFetcher() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cacheStatus, setCacheStatus] = useState('No data loaded')
  const [loadTimes, setLoadTimes] = useState({
    cachedTime: null,
    freshTime: null,
    lastLoadType: null
  })

  const fetchData = async (useCache = true) => {
    setLoading(true)
    const startTime = performance.now()
    
    try {
      const url = useCache 
        ? '/api/json-data' 
        : 'https://jsonplaceholder.typicode.com/todos?_=' + Date.now()
      
      const response = await fetch(url, {
        cache: useCache ? 'force-cache' : 'no-store'
      })
      
      const jsonData = await response.json()
      const endTime = performance.now()
      const loadTime = (endTime - startTime).toFixed(2)
      
      setData(jsonData)
      
      if (useCache) {
        setLoadTimes({
          cachedTime: loadTime,
          freshTime: loadTimes.freshTime,
          lastLoadType: 'cached'
        })
        setCacheStatus(`Loaded with caching (${loadTime}ms)`)
      } else {
        setLoadTimes({
          cachedTime: loadTimes.cachedTime,
          freshTime: loadTime,
          lastLoadType: 'fresh'
        })
        setCacheStatus(`Loaded fresh (${loadTime}ms)`)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setCacheStatus('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    fetchData(false)
  }

  const clearCache = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/json-data', {
        method: 'POST'
      })
      
      if (response.ok) {
        setCacheStatus('Cache cleared successfully')
        setData(null)
        setLoadTimes({
          cachedTime: null,
          freshTime: null,
          lastLoadType: null
        })
      } else {
        setCacheStatus('Failed to clear cache')
      }
    } catch (error) {
      console.error('Cache clear error:', error)
      setCacheStatus('Error clearing cache')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">JSON Data Fetcher with Performance Metrics</h2>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <button 
          onClick={() => fetchData(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading && loadTimes.lastLoadType === 'cached' ? 'Loading...' : 'Fetch Data (Cached)'}
        </button>
        
        <button 
          onClick={refreshData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading && loadTimes.lastLoadType === 'fresh' ? 'Loading...' : 'Refresh (No Cache)'}
        </button>

        <button 
          onClick={clearCache}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Clear Cache'}
        </button>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="font-medium">Status: {cacheStatus}</div>
        {loadTimes.cachedTime && (
          <div className="text-sm text-blue-600">
            Last cached load: {loadTimes.cachedTime}ms
          </div>
        )}
        {loadTimes.freshTime && (
          <div className="text-sm text-green-600">
            Last fresh load: {loadTimes.freshTime}ms
          </div>
        )}
        {loadTimes.cachedTime && loadTimes.freshTime && (
          <div className="text-sm font-semibold">
            Difference: {(loadTimes.freshTime - loadTimes.cachedTime).toFixed(2)}ms slower
          </div>
        )}
      </div>
      
      {data && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">First 3 items:</h3>
            <span className="text-sm text-gray-600">
              Total items: {data.length}
            </span>
          </div>
          <pre className="text-sm overflow-auto max-h-60 border p-2 bg-white rounded">
            {JSON.stringify(data.slice(0, 3), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}