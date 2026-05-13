const ORDERS = [
  { id: 'FC-10234', date: '2024-05-12', items: 4, total: 24.97, status: 'delivered', accent: '#16a34a' },
  { id: 'FC-10235', date: '2024-05-14', items: 2, total: 9.48, status: 'out_for_delivery', accent: '#0ea5e9' },
  { id: 'FC-10236', date: '2024-05-16', items: 6, total: 42.10, status: 'processing', accent: '#f59e0b' },
  { id: 'FC-10237', date: '2024-05-17', items: 3, total: 14.44, status: 'pending', accent: '#a3a3a3' },
]

const STATUS_LABEL = {
  pending: 'Pending',
  processing: 'Processing',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
      <p className="text-sm text-gray-500 mb-6">Track your recent purchases</p>
      <div className="space-y-3">
        {ORDERS.map(o => (
          <div key={o.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 min-w-0">
              <span className="h-12 w-1 shrink-0 rounded-full" style={{ backgroundColor: o.accent }} aria-hidden />
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900">Order #{o.id}</h3>
                <p className="text-sm text-gray-500">{o.date} • {o.items} items</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: o.accent + '22', color: o.accent }}>{STATUS_LABEL[o.status]}</span>
              <span className="font-bold text-green-700">${o.total.toFixed(2)}</span>
              <button className="text-sm text-green-600 hover:text-green-700 font-bold">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}