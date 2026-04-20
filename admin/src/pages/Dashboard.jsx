import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrendingUp, Newspaper, Users, Eye } from 'lucide-react'

export default function Dashboard() {
  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [{ data: news }] = await Promise.all([
        axios.get('/news?limit=1'),
      ])
      return {
        totalNews: news.pagination.total,
        categories: 2, // Hardcode por ahora
        users: 1,
        views: 1245,
      }
    },
  })

  const recentNewsQuery = useQuery({
    queryKey: ['recent-news'],
    queryFn: () => axios.get('/news?limit=5').then(res => res.data.news),
  })

  if (statsQuery.isLoading || recentNewsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cuba-red"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenido de vuelta, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-cuba-red/10 rounded-xl">
              <Newspaper className="w-6 h-6 text-cuba-red" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Noticias Publicadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.totalNews || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Tag className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categorías</p>
              <p className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.categories || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.users || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Eye className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visitas Hoy</p>
              <p className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.views || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Noticias Recientes</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentNewsQuery.data?.map((news) => (
            <div key={news.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {news.category?.name?.[0] || 'N'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="font-medium">{news.category?.name}</span>
                    <span>•</span>
                    <span>{new Date(news.publishedAt).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="p-6 text-center py-12 text-gray-500">
              No hay noticias aún. ¡Crea la primera!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

