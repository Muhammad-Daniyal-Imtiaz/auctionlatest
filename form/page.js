'use client'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function ProductForm() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: ''
  })
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/uploadproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          clerk_id: user.id,
          price: parseFloat(formData.price)
        }),
      })

      const data = await res.json()
      setResponse(data)

      if (data.success) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          tags: ''
        })
      }
    } catch (error) {
      setResponse({ success: false, error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Submitting...' : 'Submit Product'}
        </button>
      </form>

      {response && (
        <div className={`mt-4 p-3 rounded ${response.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {response.success ? (
            <div>
              <p>✅ Product data received successfully!</p>
              <pre className="text-xs mt-2">{JSON.stringify(response.product, null, 2)}</pre>
            </div>
          ) : (
            <p>❌ Error: {response.error}</p>
          )}
        </div>
      )}
    </div>
  )
}
