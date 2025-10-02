import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getCurrentUser, checkUserPlan } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userPlan, setUserPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão inicial
    getCurrentUser().then(({ user }) => {
      setUser(user)
      if (user) {
        loadUserPlan(user.id)
      }
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await loadUserPlan(session.user.id)
        } else {
          setUserPlan(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserPlan = async (userId) => {
    try {
      const { data, error } = await checkUserPlan(userId)
      if (!error) {
        setUserPlan(data || { plan_type: 'free', emails_used_today: 0 })
      }
    } catch (error) {
      console.error('Erro ao carregar plano do usuário:', error)
      setUserPlan({ plan_type: 'free', emails_used_today: 0 })
    }
  }

  const refreshUserPlan = () => {
    if (user) {
      loadUserPlan(user.id)
    }
  }

  const canCreateEmail = () => {
    if (!userPlan) return false
    if (userPlan.plan_type === 'premium') return true
    return userPlan.emails_used_today < 10
  }

  const getRemainingEmails = () => {
    if (!userPlan) return 0
    if (userPlan.plan_type === 'premium') return 'Ilimitado'
    return Math.max(0, 10 - userPlan.emails_used_today)
  }

  const value = {
    user,
    userPlan,
    loading,
    canCreateEmail,
    getRemainingEmails,
    refreshUserPlan,
    isPremium: userPlan?.plan_type === 'premium'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
