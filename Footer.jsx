import { Link } from 'react-router-dom'
import { Mail, Github, Twitter, Shield, Zap, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-30"></div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tech E-mails Temp
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Proteja sua privacidade online com e-mails temporários seguros e confiáveis. Interface moderna e planos flexíveis.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Gerador de E-mails
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Documentação
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Recursos</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>100% Seguro</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>Instantâneo</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>Múltiplos Domínios</span>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:suporte@techemailstemp.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Tech E-mails Temp. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Feito com ❤️ para proteger sua privacidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
