import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRODUCTS = [
  { id: 1, name: 'Fresh Spinach', category: 'veggies', price: 2.49, unit: 'bunch', img: '🥬', stock: 24 },
  { id: 2, name: 'Red Apples', category: 'fruits', price: 3.99, unit: 'kg', img: '🍎', stock: 50 },
  { id: 3, name: 'Ripe Bananas', category: 'fruits', price: 1.29, unit: 'dozen', img: '🍌', stock: 30 },
  { id: 4, name: 'Carrots', category: 'veggies', price: 1.99, unit: 'kg', img: '🥕', stock: 18 },
  { id: 5, name: 'Tomatoes', category: 'veggies', price: 2.79, unit: 'kg', img: '🍅', stock: 22 },
  { id: 6, name: 'Strawberries', category: 'fruits', price: 4.49, unit: 'pack', img: '🍓', stock: 12 },
  { id: 7, name: 'Broccoli', category: 'veggies', price: 2.29, unit: 'piece', img: '🥦', stock: 14 },
  { id: 8, name: 'Grapes', category: 'fruits', price: 3.49, unit: 'kg', img: '🍇', stock: 19 },
  { id: 9, name: 'Fresh Basil', category: 'herbs', price: 1.79, unit: 'bunch', img: '🌿', stock: 9 },
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'veggies', label: 'Vegetables' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'herbs', label: 'Herbs' },
]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const visible = PRODUCTS.filter(p => (filter === 'all' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All Products</h1>
      <p className="text-sm text-gray-500 mb-6">Browse our fresh selection</p>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search produce..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={'px-4 py-2 rounded-lg text-sm font-bold ' + (filter === f.id ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-green-50')}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map(p => (
          <Link key={p.id} to={'/products/' + p.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="bg-green-50 rounded-xl text-6xl text-center py-6 mb-3">{p.img}</div>
            <h3 className="font-bold text-gray-900">{p.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5 capitalize">{p.category}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-green-700 font-bold">${p.price.toFixed(2)}<span className="text-xs text-gray-500 font-normal">/{p.unit}</span></span>
              <span className="text-xs text-gray-400">{p.stock} left</span>
            </div>
          </Link>
        ))}
        {visible.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">No products match your search.</div>
        )}
      </div>
    </div>
  )
}