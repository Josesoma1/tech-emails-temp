import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

const API_BASE = 'https://sonjj.p.rapidapi.com/v1/temp_email'
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY || 'your-rapidapi-key'

const apiHeaders = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'sonjj.p.rapidapi.com'
}

export const useEmailAPI = () => {
  const [loading, setLoading] = useState(false)
  const [currentEmail, setCurrentEmail] = useState(null)
  const [inbox, setInbox] = useState([])
  const [domains, setDomains] = useState([])

  // Buscar domínios disponíveis
  const fetchDomains = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/domains`, {
        headers: apiHeaders
      })
      
      if (!response.ok) {
        throw new Error('Erro ao buscar domínios')
      }
      
      const data = await response.json()
      setDomains(data.domains || [])
      return data.domains || []
    } catch (error) {
      console.error('Erro ao buscar domínios:', error)
      toast.error('Erro ao carregar domínios disponíveis')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Criar novo e-mail temporário
  const createEmail = useCallback(async (domain = null) => {
    try {
      setLoading(true)
      const url = domain ? `${API_BASE}/create?domain=${domain}` : `${API_BASE}/create`
      
      const response = await fetch(url, {
        headers: apiHeaders
      })
      
      if (!response.ok) {
        throw new Error('Erro ao criar e-mail')
      }
      
      const data = await response.json()
      setCurrentEmail(data.email)
      setInbox([]) // Limpar inbox anterior
      toast.success('E-mail temporário criado com sucesso!')
      return data.email
    } catch (error) {
      console.error('Erro ao criar e-mail:', error)
      toast.error('Erro ao criar e-mail temporário')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar inbox do e-mail
  const fetchInbox = useCallback(async (email) => {
    if (!email) return []
    
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/inbox?email=${encodeURIComponent(email)}`, {
        headers: apiHeaders
      })
      
      if (!response.ok) {
        throw new Error('Erro ao buscar inbox')
      }
      
      const data = await response.json()
      setInbox(data.messages || [])
      return data.messages || []
    } catch (error) {
      console.error('Erro ao buscar inbox:', error)
      toast.error('Erro ao carregar mensagens')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar mensagem específica
  const fetchMessage = useCallback(async (email, messageId) => {
    if (!email || !messageId) return null
    
    try {
      setLoading(true)
      const response = await fetch(
        `${API_BASE}/message?email=${encodeURIComponent(email)}&message_id=${messageId}`,
        { headers: apiHeaders }
      )
      
      if (!response.ok) {
        throw new Error('Erro ao buscar mensagem')
      }
      
      const data = await response.json()
      return data.message || null
    } catch (error) {
      console.error('Erro ao buscar mensagem:', error)
      toast.error('Erro ao carregar mensagem')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Atualizar inbox automaticamente
  const refreshInbox = useCallback(() => {
    if (currentEmail) {
      fetchInbox(currentEmail)
    }
  }, [currentEmail, fetchInbox])

  return {
    loading,
    currentEmail,
    inbox,
    domains,
    fetchDomains,
    createEmail,
    fetchInbox,
    fetchMessage,
    refreshInbox,
    setCurrentEmail
  }
}
