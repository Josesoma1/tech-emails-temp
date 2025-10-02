import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Shield,
  Mail,
  Globe,
  Zap,
  Eye,
  TrendingUp
} from 'lucide-react'

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: 'Como Proteger sua Privacidade Online com E-mails Temporários',
    excerpt: 'Descubra as melhores práticas para manter sua identidade digital segura usando e-mails temporários em cadastros, verificações e testes.',
    content: 'A privacidade online nunca foi tão importante quanto hoje. Com o aumento de vazamentos de dados e spam, proteger seu e-mail principal tornou-se essencial...',
    author: 'Tech Team',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'Privacidade',
    image: '/blog/privacy-online.jpg',
    featured: true,
    views: 1250
  }

  const blogPosts = [
    {
      id: 2,
      title: 'API de E-mails Temporários: Guia Completo para Desenvolvedores',
      excerpt: 'Aprenda a integrar nossa API em suas aplicações para testes automatizados e verificações seguras.',
      author: 'Dev Team',
      date: '2024-01-12',
      readTime: '8 min',
      category: 'Desenvolvimento',
      views: 890
    },
    {
      id: 3,
      title: '10 Casos de Uso para E-mails Temporários em 2024',
      excerpt: 'Explore diferentes cenários onde e-mails temporários podem melhorar sua segurança e produtividade.',
      author: 'Security Expert',
      date: '2024-01-10',
      readTime: '6 min',
      category: 'Segurança',
      views: 1100
    },
    {
      id: 4,
      title: 'Comparativo: E-mails Temporários vs E-mails Descartáveis',
      excerpt: 'Entenda as diferenças e quando usar cada tipo de solução para proteger sua privacidade.',
      author: 'Tech Analyst',
      date: '2024-01-08',
      readTime: '4 min',
      category: 'Análise',
      views: 750
    },
    {
      id: 5,
      title: 'Tendências de Privacidade Digital para 2024',
      excerpt: 'As principais tendências em proteção de dados e como se preparar para o futuro da privacidade online.',
      author: 'Privacy Advocate',
      date: '2024-01-05',
      readTime: '7 min',
      category: 'Tendências',
      views: 980
    },
    {
      id: 6,
      title: 'Como Evitar Spam com E-mails Temporários',
      excerpt: 'Estratégias eficazes para manter sua caixa de entrada limpa e livre de mensagens indesejadas.',
      author: 'Email Expert',
      date: '2024-01-03',
      readTime: '5 min',
      category: 'Dicas',
      views: 1300
    }
  ]

  const categories = [
    { name: 'Privacidade', count: 8, icon: Shield },
    { name: 'Desenvolvimento', count: 5, icon: Globe },
    { name: 'Segurança', count: 6, icon: Shield },
    { name: 'Dicas', count: 10, icon: Zap },
    { name: 'Análise', count: 4, icon: TrendingUp }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Privacidade': 'bg-blue-500',
      'Desenvolvimento': 'bg-green-500',
      'Segurança': 'bg-red-500',
      'Dicas': 'bg-yellow-500',
      'Análise': 'bg-purple-500',
      'Tendências': 'bg-pink-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Blog Tech E-mails
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Artigos sobre privacidade digital, segurança online e as melhores práticas 
              para proteger sua identidade na internet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Post */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Artigo em Destaque</span>
                </h2>
                <Card className="overflow-hidden border-2 border-primary/20">
                  <div className="aspect-video bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Imagem do artigo</p>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className={`${getCategoryColor(featuredPost.category)} text-white`}>
                        {featuredPost.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{featuredPost.author}</span>
                      </div>
                      <Button asChild>
                        <Link to={`/blog/${featuredPost.id}`}>
                          Ler Artigo
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Artigos Recentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${getCategoryColor(post.category)} text-white`}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          <Link 
                            to={`/blog/${post.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categorias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/blog/category/${category.name.toLowerCase()}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        <span className="group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Newsletter</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Receba os melhores artigos sobre privacidade e segurança digital diretamente no seu e-mail.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Seu e-mail"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    />
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Inscrever-se
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sem spam. Cancele a qualquer momento.
                  </p>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mais Populares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{post.views} visualizações</span>
                        </div>
                      </Link>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Proteja sua Privacidade Hoje
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Coloque em prática o que você aprendeu. Crie seu primeiro e-mail temporário e mantenha sua identidade segura.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link to="/generator">
                <Mail className="w-5 h-5 mr-2" />
                Criar E-mail Temporário
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
