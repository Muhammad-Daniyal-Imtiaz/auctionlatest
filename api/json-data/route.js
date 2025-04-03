// app/api/json-data/route.js
import { revalidateTag } from 'next/cache'

export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    next: { tags: ['json-data'] }
  })
  const data = await res.json()
  return Response.json(data)
}

export async function POST() {
  // Clear the cache for this endpoint
  revalidateTag('json-data')
  return new Response(null, { status: 204 })
}