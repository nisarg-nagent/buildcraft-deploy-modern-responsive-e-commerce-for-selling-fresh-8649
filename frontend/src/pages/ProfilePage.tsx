import { useNavigate } from 'react-router-dom'

const NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'Order #FC-10235 is out for delivery', time: '2h ago', accent: '#0ea5e9' },
  { id: 2, type: 'low_stock', title: 'Low stock alert: Carrots (8 left)', time: '1d ago', accent: '#f59e0b' },
  { id: 3, type: 'order', title: 'Order #FC-10234 delivered', time: '3d ago', accent: '#16a34a' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const userRaw = localStorage.getItem('user')
  const user = userRaw ? JSON.parse(userRaw) : { name: 'Demo User', email: 'demo@example.com', role: 'admin' }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h2 className="font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full capitalize">{user.role}</span>
          <button onClick={logout} className="mt-4 w-full bg-red-50 text-red-600 font-bold py-2 rounded-lg hover:bg-red-100 text-sm">Sign Out</button>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="h-10 w-1 shrink-0 rounded-full" style={{ backgroundColor: n.accent }} aria-hidden />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{n.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}