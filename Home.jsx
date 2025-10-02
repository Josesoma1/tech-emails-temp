import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Mail, 
  Shield, 
  Zap, 
  Globe, 
  Crown, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { user, isPremium } = useAuth()

  const features = [
    {
      icon: Shield,
      title: 'Totalmente Seguro',
      description: 'Seus dados são protegidos com criptografia de ponta e não armazenamos informações pessoais.'
    },
    {
      icon: Zap,
      title: 'Instantâneo',
      description: 'Crie e-mails temporários em segundos. Interface rápida e responsiva para todas as plataformas.'
    },
    {
      icon: Globe,
      title: 'Múltiplos Domínios',
      description: 'Escolha entre diversos domínios disponíveis para criar seus e-mails temporários.'
    },
    {
      icon: Mail,
      title: 'Inbox em Tempo Real',
      description: 'Receba e visualize mensagens instantaneamente com nossa interface moderna e intuitiva.'
    }
  ]

  const stats = [
    { icon: Users, value: '10K+', label: 'Usuários Ativos' },
    { icon: Mail, value: '100K+', label: 'E-mails Criados' },
    { icon: Star, value: '4.9', label: 'Avaliação' },
    { icon: Clock, value: '24/7', label: 'Disponibilidade' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">100% Seguro e Privado</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                E-mails Temporários
                <br />
                <span className="text-foreground">Seguros e Rápidos</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Proteja sua privacidade online com e-mails temporários. Interface moderna, 
                múltiplos domínios e planos flexíveis para todas as suas necessidades.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Link to="/generator">
                  <Mail className="w-5 h-5 mr-2" />
                  Criar E-mail Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-2"
              >
                <Link to="/pricing">
                  Ver Preços
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Por que escolher o Tech E-mails Temp?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos a melhor experiência em e-mails temporários com recursos avançados e segurança máxima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Planos Flexíveis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece grátis ou upgrade para premium e tenha acesso ilimitado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Free */}
            <Card className="border-2 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Plano Gratuito</h3>
                  <div className="text-4xl font-bold mb-2">R$ 0</div>
                  <p className="text-muted-foreground">Para uso pessoal</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>10 e-mails por dia</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Múltiplos domínios</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Inbox em tempo real</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Interface responsiva</span>
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/generator">Começar Grátis</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-2 border-primary bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Crown className="w-4 h-4" />
                  <span>Mais Popular</span>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Plano Premium</h3>
                  <div className="text-4xl font-bold mb-2">R$ 60</div>
                  <p className="text-muted-foreground">por mês</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>E-mails ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Histórico expandido</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Prioridade no carregamento</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Link to="/pricing">
                    {user && !isPremium ? 'Fazer Upgrade' : 'Começar Premium'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para proteger sua privacidade?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já protegem sua privacidade com nossos e-mails temporários.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
          >
            <Link to="/generator">
              <Mail className="w-5 h-5 mr-2" />
              Criar Primeiro E-mail
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home
