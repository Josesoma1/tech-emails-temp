import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Pricing from './pages/Pricing'
import ApiDocs from './pages/ApiDocs'
import Blog from './pages/Blog'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col dark">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/category/:category" element={<BlogCategory />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

// Componentes de páginas simples para completar as rotas
const BlogPost = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Artigo do Blog</h1>
      <p className="text-muted-foreground">Página individual do artigo em desenvolvimento.</p>
    </div>
  </div>
)

const BlogCategory = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Categoria do Blog</h1>
      <p className="text-muted-foreground">Página de categoria em desenvolvimento.</p>
    </div>
  </div>
)

const Dashboard = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground">Painel do usuário em desenvolvimento.</p>
    </div>
  </div>
)

const Privacy = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          No Tech E-mails Temp, levamos sua privacidade a sério. Esta política descreve como 
          coletamos, usamos e protegemos suas informações.
        </p>
        <h2>Informações que Coletamos</h2>
        <p>
          Coletamos apenas as informações necessárias para fornecer nossos serviços, incluindo 
          dados de autenticação do Google e estatísticas de uso anônimas.
        </p>
        <h2>Como Usamos suas Informações</h2>
        <p>
          Suas informações são usadas exclusivamente para autenticação, controle de limites 
          e melhoria dos nossos serviços.
        </p>
        <h2>Proteção de Dados</h2>
        <p>
          Utilizamos criptografia de ponta a ponta e não armazenamos conteúdo de e-mails 
          temporários por mais tempo que o necessário.
        </p>
      </div>
    </div>
  </div>
)

const Terms = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Termos de Serviço</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Bem-vindo ao Tech E-mails Temp. Ao usar nossos serviços, você concorda com estes termos.
        </p>
        <h2>Uso Aceitável</h2>
        <p>
          Nossos serviços devem ser usados apenas para fins legítimos. É proibido usar 
          e-mails temporários para atividades ilegais ou spam.
        </p>
        <h2>Limitações de Responsabilidade</h2>
        <p>
          O Tech E-mails Temp não se responsabiliza por conteúdo de terceiros recebido 
          através de nossos e-mails temporários.
        </p>
        <h2>Modificações</h2>
        <p>
          Reservamos o direito de modificar estes termos a qualquer momento, com notificação 
          prévia aos usuários.
        </p>
      </div>
    </div>
  </div>
)

const FAQ = () => (
  <div className="min-h-screen py-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h1>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg">
          <h3 className="font-semibold mb-2">O que são e-mails temporários?</h3>
          <p className="text-muted-foreground">
            E-mails temporários são endereços de e-mail que funcionam por um período limitado, 
            ideais para cadastros, verificações e proteção da sua privacidade.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Por quanto tempo os e-mails ficam ativos?</h3>
          <p className="text-muted-foreground">
            Os e-mails temporários ficam ativos por até 24 horas, tempo suficiente para 
            receber verificações e confirmações.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg">
          <h3 className="font-semibold mb-2">É seguro usar e-mails temporários?</h3>
          <p className="text-muted-foreground">
            Sim, nossos e-mails temporários são completamente seguros e não armazenamos 
            dados pessoais ou conteúdo das mensagens.
          </p>
        </div>
      </div>
    </div>
  </div>
)

const NotFound = () => (
  <div className="min-h-screen py-20 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8">
        A página que você está procurando não existe.
      </p>
      <a 
        href="/" 
        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Voltar ao Início
      </a>
    </div>
  </div>
)

export default App
