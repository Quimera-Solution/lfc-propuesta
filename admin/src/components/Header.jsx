import { Bell, User, LogOut, Menu } from 'lucide-react'

export default function Header({ user, logout }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 p-2 pr-4 bg-gray-100 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-cuba-red to-cuba-blue rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.[0] || 'A'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || 'ADMIN'}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

