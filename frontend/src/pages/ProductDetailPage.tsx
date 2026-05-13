import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PRODUCT = {
  id: 1, name: 'Fresh Organic Spinach', price: 2.49, unit: 'bunch', img: '🥬',
  description: 'Locally grown, hand-picked spinach leaves. Packed with iron, vitamins A and C. Perfect for salads, smoothies, and sautés.',
  origin: 'Greenfield Farms, CA', stock: 24, rating: 4.7, reviews: 128,
  nutrition: [
    { label: 'Calories', value: '23 kcal' },
    { label: 'Protein', value: '2.9g' },
    { label: 'Iron', value: '15% DV' },
    { label: 'Vitamin C', value: '47% DV' },
  ],
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/products" className="text-green-600 font-bold text-sm hover:text-green-700 mb-4 inline-block">← Back to products</Link>
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <div className="bg-green-50 rounded-2xl flex items-center justify-center text-9xl py-16">{PRODUCT.img}</div>
        <div>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mb-2">Product #{id}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{PRODUCT.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-500">{PRODUCT.rating} ({PRODUCT.reviews} reviews)</span>
          </div>
          <p className="text-gray-600 mb-4">{PRODUCT.description}</p>
          <p className="text-sm text-gray-500 mb-6">📍 Origin: {PRODUCT.origin}</p>
          <div className="text-3xl font-bold text-green-700 mb-6">${PRODUCT.price.toFixed(2)}<span className="text-base text-gray-500 font-normal">/{PRODUCT.unit}</span></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50">−</button>
              <span className="px-4 font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-50">+</button>
            </div>
            <button onClick={addToCart} className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700">
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PRODUCT.nutrition.map(n => (
              <div key={n.label} className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">{n.label}</p>
                <p className="font-bold text-gray-900 text-sm">{n.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}