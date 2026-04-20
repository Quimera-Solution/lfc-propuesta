import { useState, useEffect, createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get('/auth/me')
      localStorage.setItem('userId', data.id)
      return data
    },
    enabled: !!token && !!userId,
    staleTime: 5 * 60 * 1000,
  })

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await axios.post('/auth/login', { email, password })
      return data
    },
    onSuccess: (data) => {
      const { token, user } = data
      localStorage.setItem('token', token)
      localStorage.setItem('userId', user.id)
      setToken(token)
      setUserId(user.id)
      queryClient.setQueryData(['user'], user)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('/auth/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      setToken(null)
      setUserId(null)
      queryClient.clear()
    },
  })

  return (
    <AuthContext.Provider
      value={{
        user: userQuery.data,
        token,
        login: loginMutation.mutate,
        loginLoading: loginMutation.isPending,
        logout: logoutMutation.mutate,
        logoutLoading: logoutMutation.isPending,
        isAuthenticated: !!token && !!userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

