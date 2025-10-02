import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Crown, 
  Mail, 
  Shield, 
  Zap, 
  Globe,
  Users,
  Clock,
  Star,
  ArrowRight,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { signInWithGoogle } from '../lib/supabase'
import toast from 'react-hot-toast'

const Pricing = () => {
  const { user, isPremium } = useAuth()
  const [isAnnual, setIsAnnual] = useState(false)

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

  const handleUpgrade = () => {
    if (!user) {
      handleSignIn()
      return
    }
    // Aqui seria implementada a integração com o sistema de pagamento
    toast.success('Redirecionando para pagamento...')
  }

  const freeFeatures = [
    'Até 10 e-mails por dia',
    'Múltiplos domínios disponíveis',
    'Inbox em tempo real',
    'Interface responsiva',
    'Criptografia básica',
    'Suporte por e-mail'
  ]

  const premiumFeatures = [
    'E-mails ilimitados',
    'Histórico expandido (30 dias)',
    'Prioridade no carregamento',
    'Domínios personalizados',
    'API de acesso',
    'Suporte prioritário 24/7',
    'Backup automático',
    'Relatórios de uso'
  ]

  const enterpriseFeatures = [
    'Tudo do Premium',
    'E-mails ilimitados para equipe',
    'Domínios corporativos',
    'Integração SSO',
    'Gerenciamento de usuários',
    'SLA garantido',
    'Suporte dedicado',
    'Customização completa'
  ]

  const faqs = [
    {
      question: 'Como funciona o limite de 10 e-mails por dia?',
      answer: 'No plano gratuito, você pode criar até 10 e-mails temporários por dia. O contador é resetado a cada 24 horas.'
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura premium a qualquer momento. Você continuará tendo acesso aos recursos premium até o final do período pago.'
    },
    {
      question: 'Os e-mails temporários são realmente seguros?',
      answer: 'Sim, utilizamos criptografia de ponta a ponta e não armazenamos dados pessoais. Os e-mails são automaticamente excluídos após o período de validade.'
    },
    {
      question: 'Existe desconto para pagamento anual?',
      answer: 'Sim, oferecemos 20% de desconto para assinaturas anuais do plano Premium.'
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Planos e Preços
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para suas necessidades. Comece grátis ou upgrade para premium 
            e tenha acesso a recursos avançados e e-mails ilimitados.
          </p>

          {/* Toggle Annual/Monthly */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Anual
            </span>
            {isAnnual && (
              <Badge className="bg-green-500 text-white">
                20% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="border-2 border-border relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold mb-2">Plano Gratuito</CardTitle>
              <div className="text-4xl font-bold mb-2">R$ 0</div>
              <p className="text-muted-foreground">Para uso pessoal básico</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/generator">
                  Começar Grátis
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-primary bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                <Crown className="w-4 h-4 mr-1" />
                Mais Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold mb-2">Plano Premium</CardTitle>
              <div className="text-4xl font-bold mb-2">
                R$ {isAnnual ? '48' : '60'}
                <span className="text-lg font-normal text-muted-foreground">
                  /{isAnnual ? 'mês' : 'mês'}
                </span>
              </div>
              {isAnnual && (
                <p className="text-sm text-green-600">
                  Economize R$ 144 por ano
                </p>
              )}
              <p className="text-muted-foreground">Para usuários avançados</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {user && !isPremium ? 'Fazer Upgrade' : 'Começar Premium'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-border relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold mb-2">Plano Enterprise</CardTitle>
              <div className="text-4xl font-bold mb-2">Personalizado</div>
              <p className="text-muted-foreground">Para empresas e equipes</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Falar com Vendas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comparação Detalhada
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold">Recursos</th>
                        <th className="text-center p-4 font-semibold">Gratuito</th>
                        <th className="text-center p-4 font-semibold">Premium</th>
                        <th className="text-center p-4 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">E-mails por dia</td>
                        <td className="text-center p-4">10</td>
                        <td className="text-center p-4">Ilimitado</td>
                        <td className="text-center p-4">Ilimitado</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Histórico de mensagens</td>
                        <td className="text-center p-4">7 dias</td>
                        <td className="text-center p-4">30 dias</td>
                        <td className="text-center p-4">Personalizado</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Domínios disponíveis</td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">API de acesso</td>
                        <td className="text-center p-4">
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Suporte prioritário</td>
                        <td className="text-center p-4">
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já protegem sua privacidade com nossos e-mails temporários.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link to="/generator">
                <Mail className="w-5 h-5 mr-2" />
                Começar Grátis
              </Link>
            </Button>
            <Button 
              onClick={handleUpgrade}
              size="lg" 
              variant="outline"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
