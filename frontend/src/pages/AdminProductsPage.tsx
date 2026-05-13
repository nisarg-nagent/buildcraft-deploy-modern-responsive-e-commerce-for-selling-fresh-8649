import { useState } from 'react'

const INITIAL = [
  { id: 1, name: 'Fresh Spinach', category: 'veggies', price: 2.49, stock: 24, active: true, accent: '#16a34a' },
  { id: 2, name: 'Red Apples', category: 'fruits', price: 3.99, stock: 50, active: true, accent: '#dc2626' },
  { id: 3, name: 'Ripe Bananas', category: 'fruits', price: 1.29, stock: 30, active: true, accent: '#eab308' },
  { id: 4, name: 'Carrots', category: 'veggies', price: 1.99, stock: 8, active: true, accent: '#f97316' },
  { id: 5, name: 'Tomatoes', category: 'veggies', price: 2.79, stock: 22, active: false, accent: '#ef4444' },
]

export default function AdminProductsPage() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')

  const toggleActive = (id) => setItems(items.map(i => i.id === id ? { ...i, active: !i.active } : i))
  const visible = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-sm text-gray-500">CRUD + workflow status</p>
        </div>
        <button className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">+ Add Product</button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search products..."
        className="w-full md:w-80 border border-gray-200 rounded-lg px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(row => (
              <tr key={row.id} className="border-t border-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full" style={{ backgroundColor: row.accent }} aria-hidden />
                  <span className="font-bold text-gray-900">{row.name}</span>
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">{row.category}</td>
                <td className="px-4 py-3 font-bold text-green-700">${row.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={row.stock < 10 ? 'text-amber-600 font-bold' : 'text-gray-700'}>{row.stock}{row.stock < 10 ? ' ⚠' : ''}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={'px-2 py-1 rounded-full text-xs font-bold ' + (row.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')}>
                    {row.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(row.id)} className="text-green-600 hover:text-green-700 font-bold text-xs mr-3">Toggle</button>
                  <button className="text-blue-600 hover:text-blue-700 font-bold text-xs mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}