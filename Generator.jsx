import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Copy, 
  RefreshCw, 
  Clock, 
  Shield, 
  Crown,
  AlertCircle,
  CheckCircle,
  Inbox,
  Eye,
  Trash2,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEmailAPI } from '../hooks/useEmailAPI'
import { signInWithGoogle, incrementEmailCount } from '../lib/supabase'
import toast from 'react-hot-toast'

const Generator = () => {
  const { user, canCreateEmail, getRemainingEmails, isPremium, refreshUserPlan } = useAuth()
  const { 
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
  } = useEmailAPI()

  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    fetchDomains()
  }, [fetchDomains])

  useEffect(() => {
    if (currentEmail) {
      fetchInbox(currentEmail)
    }
  }, [currentEmail, fetchInbox])

  // Auto-refresh inbox
  useEffect(() => {
    let interval
    if (autoRefresh && currentEmail) {
      interval = setInterval(() => {
        refreshInbox()
      }, 10000) // Refresh every 10 seconds
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, currentEmail, refreshInbox])

  const handleCreateEmail = async () => {
    if (!user) {
      toast.error('Faça login para criar e-mails temporários')
      return
    }

    if (!canCreateEmail()) {
      toast.error('Limite diário atingido. Faça upgrade para premium!')
      return
    }

    try {
      const email = await createEmail(selectedDomain)
      if (email) {
        // Increment email count for free users
        if (!isPremium) {
          await incrementEmailCount(user.id)
          refreshUserPlan()
        }
        setAutoRefresh(true)
      }
    } catch (error) {
      toast.error('Erro ao criar e-mail temporário')
    }
  }

  const handleCopyEmail = () => {
    if (currentEmail) {
      navigator.clipboard.writeText(currentEmail)
      toast.success('E-mail copiado para a área de transferência!')
    }
  }

  const handleViewMessage = async (messageId) => {
    if (!currentEmail) return
    
    try {
      const message = await fetchMessage(currentEmail, messageId)
      setSelectedMessage(message)
    } catch (error) {
      toast.error('Erro ao carregar mensagem')
    }
  }

  const handleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        toast.error('Erro ao fazer login')
      }
    } catch (error) {
      toast.error('Erro ao conectar com Google')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  if (!user) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Login Necessário</h2>
                <p className="text-muted-foreground mb-6">
                  Faça login com sua conta Google para criar e-mails temporários seguros.
                </p>
                <Button 
                  onClick={handleSignIn} 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Entrar com Google
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Gerador de E-mails Temporários
            </h1>
            <p className="text-xl text-muted-foreground">
              Crie e-mails temporários seguros em segundos
            </p>
          </div>

          {/* User Status */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.user_metadata?.avatar_url || '/default-avatar.png'}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{user.user_metadata?.name}</h3>
                      <div className="flex items-center space-x-2">
                        {isPremium ? (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Gratuito</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">E-mails restantes hoje</p>
                    <p className="text-2xl font-bold text-primary">{getRemainingEmails()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email Generator */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Criar E-mail Temporário</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Domain Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Escolher Domínio (Opcional)
                    </label>
                    <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Domínio aleatório" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Domínio aleatório</SelectItem>
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            @{domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Create Button */}
                  <Button 
                    onClick={handleCreateEmail}
                    disabled={loading || !canCreateEmail()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    {loading ? 'Criando...' : 'Criar E-mail Temporário'}
                  </Button>

                  {!canCreateEmail() && !isPremium && (
                    <div className="flex items-center space-x-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-500">
                        Limite diário atingido. Faça upgrade para premium!
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Email */}
              {currentEmail && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>E-mail Ativo</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm flex-1">{currentEmail}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyEmail}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Auto-refresh: {autoRefresh ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setAutoRefresh(!autoRefresh)}
                      >
                        <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>E-mail temporário ativo e seguro</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Inbox */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Inbox className="w-5 h-5" />
                      <span>Caixa de Entrada</span>
                    </div>
                    {currentEmail && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={refreshInbox}
                        disabled={loading}
                      >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!currentEmail ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Crie um e-mail temporário para ver as mensagens</p>
                    </div>
                  ) : inbox.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma mensagem recebida ainda</p>
                      <p className="text-sm">As mensagens aparecerão automaticamente aqui</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inbox.map((message, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleViewMessage(message.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium truncate flex-1 mr-2">
                              {message.subject || 'Sem assunto'}
                            </h4>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            De: {message.from}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(message.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Message Viewer */}
              {selectedMessage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Mensagem</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedMessage(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        {selectedMessage.subject || 'Sem assunto'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>De:</strong> {selectedMessage.from}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        <strong>Data:</strong> {formatDate(selectedMessage.date)}
                      </p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ 
                          __html: selectedMessage.body || selectedMessage.text || 'Mensagem vazia' 
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generator
