import { Link } from 'react-router-dom'

const CATEGORIES = [
  { id: 'veggies', name: 'Vegetables', emoji: '🥦', count: 42, accent: '#16a34a' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎', count: 38, accent: '#dc2626' },
  { id: 'herbs', name: 'Herbs', emoji: '🌿', count: 14, accent: '#059669' },
  { id: 'organic', name: 'Organic', emoji: '🥬', count: 26, accent: '#84cc16' },
]

const FEATURED = [
  { id: 1, name: 'Fresh Spinach', price: 2.49, unit: 'bunch', img: '🥬', tag: 'Organic' },
  { id: 2, name: 'Red Apples', price: 3.99, unit: 'kg', img: '🍎', tag: 'Best Seller' },
  { id: 3, name: 'Ripe Bananas', price: 1.29, unit: 'dozen', img: '🍌', tag: 'Fresh' },
  { id: 4, name: 'Carrots', price: 1.99, unit: 'kg', img: '🥕', tag: 'Local' },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-lg">
        <div className="max-w-2xl">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">FREE DELIVERY OVER $30</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Farm-fresh produce, delivered daily.</h1>
          <p className="text-white/90 mb-6">Hand-picked vegetables and fruits from local farms to your kitchen — no middlemen, no waste.</p>
          <Link to="/products" className="inline-block bg-white text-green-700 font-bold px-6 py-3 rounded-lg hover:bg-green-50">Shop Now →</Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to="/products" className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <h3 className="font-bold text-gray-900" style={{ color: cat.accent }}>{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Today</h2>
          <Link to="/products" className="text-green-600 font-bold text-sm hover:text-green-700">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED.map(p => (
            <Link key={p.id} to={'/products/' + p.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="bg-green-50 rounded-xl text-6xl text-center py-6 mb-3">{p.img}</div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1">{p.tag}</span>
              <h3 className="font-bold text-gray-900">{p.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-green-700 font-bold">${p.price.toFixed(2)}<span className="text-xs text-gray-500 font-normal">/{p.unit}</span></span>
                <button className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-700">Add</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}