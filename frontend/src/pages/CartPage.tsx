import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const INITIAL_CART = [
  { id: 1, name: 'Fresh Spinach', price: 2.49, unit: 'bunch', img: '🥬', qty: 2 },
  { id: 2, name: 'Red Apples', price: 3.99, unit: 'kg', img: '🍎', qty: 1 },
  { id: 4, name: 'Carrots', price: 1.99, unit: 'kg', img: '🥕', qty: 3 },
]

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_CART)
  const navigate = useNavigate()

  const updateQty = (id, delta) => setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const remove = (id) => setItems(items.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = subtotal >= 30 ? 0 : 4.99
  const total = subtotal + delivery

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart ({items.length})</h1>
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-3">🛒</div>
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/products" className="inline-block bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-700">Browse Products</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
                <div className="bg-green-50 rounded-lg text-4xl w-16 h-16 flex items-center justify-center shrink-0">{item.img}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}/{item.unit}</p>
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 text-gray-600 hover:bg-gray-50">−</button>
                  <span className="px-3 font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-50">+</button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => remove(item.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className="font-bold">{delivery === 0 ? 'FREE' : '$' + delivery.toFixed(2)}</span></div>
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between text-base">
                <span className="font-bold text-gray-900">Total</span><span className="font-bold text-green-700">${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 mt-4">Checkout →</button>
          </div>
        </div>
      )}
    </div>
  )
}