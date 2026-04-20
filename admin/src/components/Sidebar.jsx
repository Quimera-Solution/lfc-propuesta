import { LayoutDashboard, Newspaper, Tag, Users, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/news', icon: Newspaper, label: 'Noticias' },
  { href: '/news/new', icon: Newspaper, label: 'Nueva Noticia' },
  { href: '/categories', icon: Tag, label: 'Categorías' },
  { href: '/users', icon: Users, label: 'Usuarios' },
  { href: '/settings', icon: Settings, label: 'Configuración' },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-cuba-red text-white shadow-lg shadow-red-500/25' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

