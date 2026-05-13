import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [payment, setPayment] = useState('cod')
  const navigate = useNavigate()

  const placeOrder = () => {
    alert('Order placed! Order #FC-' + Math.floor(Math.random() * 90000 + 10000))
    navigate('/orders')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Secure Checkout</h1>
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ' + (step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500')}>{s}</div>
            {s < 3 && <div className={'w-12 h-0.5 ' + (step > s ? 'bg-green-600' : 'bg-gray-200')} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {step === 1 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Delivery Address</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Full Name" defaultValue="Demo User" className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="Phone" defaultValue="555-0100" className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="Address Line 1" defaultValue="123 Garden Lane" className="border border-gray-200 rounded-lg px-4 py-2.5 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="City" defaultValue="Springfield" className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="Postal Code" defaultValue="62701" className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button onClick={() => setStep(2)} className="mt-4 bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-700">Continue →</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-2">
              {[{ id: 'cod', label: '💵 Cash on Delivery' }, { id: 'card_mock', label: '💳 Credit / Debit Card' }].map(opt => (
                <label key={opt.id} className={'flex items-center gap-3 border rounded-lg p-4 cursor-pointer ' + (payment === opt.id ? 'border-green-500 bg-green-50' : 'border-gray-200')}>
                  <input type="radio" checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-green-600" />
                  <span className="font-bold text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(1)} className="border border-gray-200 px-6 py-2.5 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(3)} className="bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-700">Review →</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Review & Place Order</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-sm">
              <p className="text-gray-700"><span className="font-bold">Ship to:</span> Demo User, 123 Garden Lane, Springfield</p>
              <p className="text-gray-700 mt-1"><span className="font-bold">Payment:</span> {payment === 'cod' ? 'Cash on Delivery' : 'Card (mock)'}</p>
              <p className="text-gray-700 mt-1"><span className="font-bold">Total:</span> $14.44</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="border border-gray-200 px-6 py-2.5 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Back</button>
              <button onClick={placeOrder} className="bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-700">🔒 Place Order</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}