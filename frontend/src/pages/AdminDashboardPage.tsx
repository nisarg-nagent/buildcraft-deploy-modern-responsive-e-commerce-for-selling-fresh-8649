const STATS = [
  { label: 'Revenue (7d)', value: '$4,238', delta: '+12%', accent: '#16a34a' },
  { label: 'Orders', value: '186', delta: '+8%', accent: '#0ea5e9' },
  { label: 'Customers', value: '512', delta: '+3%', accent: '#a855f7' },
  { label: 'Low Stock', value: '7', delta: 'alert', accent: '#f59e0b' },
]

const RECENT = [
  { id: 'FC-10240', customer: 'Alice Green', total: 34.90, status: 'processing' },
  { id: 'FC-10239', customer: 'Bob Smith', total: 12.45, status: 'delivered' },
  { id: 'FC-10238', customer: 'Carol White', total: 89.20, status: 'pending' },
  { id: 'FC-10237', customer: 'Demo User', total: 14.44, status: 'out_for_delivery' },
]

const TOP_PRODUCTS = [
  { name: 'Red Apples', sold: 240, accent: '#dc2626' },
  { name: 'Spinach', sold: 198, accent: '#16a34a' },
  { name: 'Bananas', sold: 175, accent: '#eab308' },
  { name: 'Carrots', sold: 142, accent: '#f97316' },
]

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Operations overview</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.accent }}>{s.value}</p>
            <p className="text-xs font-bold text-gray-400 mt-1">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-green-600 font-bold hover:text-green-700">Export CSV</button>
          </div>
          <div className="space-y-2">
            {RECENT.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{r.id}</p>
                  <p className="text-xs text-gray-500">{r.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700 text-sm">${r.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 capitalize">{r.status.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {TOP_PRODUCTS.map(p => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-gray-900">{p.name}</span>
                  <span className="text-gray-500">{p.sold} sold</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: (p.sold / 3) + '%', backgroundColor: p.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}