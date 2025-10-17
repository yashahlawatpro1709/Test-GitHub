'use client'

import { useEffect, useState } from 'react'

export default function TestGoldPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/site-images?section=gold-jewelry&t=' + Date.now())
        const result = await response.json()
        console.log('API Response:', result)
        setData(result)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gold Jewelry API Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">API Response:</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      {data?.images && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Found {data.images.length} images</h2>
          {data.images.map((img: any) => (
            <div key={img.id} className="border p-2 mb-2">
              <p><strong>ID:</strong> {img.id}</p>
              <p><strong>Section:</strong> {img.section}</p>
              <p><strong>Title:</strong> {img.title}</p>
              <p><strong>URL:</strong> {img.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
