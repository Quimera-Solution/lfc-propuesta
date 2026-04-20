import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Login, Dashboard, NewsList, NewsEdit, Categories } from './pages'
import { Header, Sidebar } from './components'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  // Intercept Axios
  useEffect(() => {
    axios.defaults.baseURL = '/api'
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    return () => {
      axios.interceptors.request.eject()
    }
  }, [token])

  if (!user && window.location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Header user={user} logout={logout} />
            <main className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/new" element={<NewsEdit />} />
                <Route path="/news/:id" element={<NewsEdit />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

