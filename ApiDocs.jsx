import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Copy, 
  ExternalLink, 
  Key, 
  Globe, 
  Mail,
  Shield,
  Zap,
  CheckCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

const ApiDocs = () => {
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    toast.success('Código copiado!')
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const endpoints = [
    {
      method: 'GET',
      path: '/v1/temp_email/domains',
      description: 'Obter lista de domínios disponíveis',
      params: [],
      response: {
        domains: ['example.com', 'temp-mail.org', 'guerrillamail.com']
      }
    },
    {
      method: 'GET',
      path: '/v1/temp_email/create',
      description: 'Criar novo e-mail temporário',
      params: [
        { name: 'domain', type: 'string', required: false, description: 'Domínio específico (opcional)' }
      ],
      response: {
        email: 'random123@example.com',
        created_at: '2024-01-15T10:30:00Z'
      }
    },
    {
      method: 'GET',
      path: '/v1/temp_email/inbox',
      description: 'Obter mensagens do inbox',
      params: [
        { name: 'email', type: 'string', required: true, description: 'E-mail temporário' }
      ],
      response: {
        messages: [
          {
            id: 'msg_123',
            from: 'sender@example.com',
            subject: 'Assunto da mensagem',
            date: '2024-01-15T10:35:00Z',
            preview: 'Prévia da mensagem...'
          }
        ]
      }
    },
    {
      method: 'GET',
      path: '/v1/temp_email/message',
      description: 'Obter conteúdo completo da mensagem',
      params: [
        { name: 'email', type: 'string', required: true, description: 'E-mail temporário' },
        { name: 'message_id', type: 'string', required: true, description: 'ID da mensagem' }
      ],
      response: {
        message: {
          id: 'msg_123',
          from: 'sender@example.com',
          subject: 'Assunto da mensagem',
          body: '<html>Conteúdo HTML da mensagem</html>',
          text: 'Conteúdo em texto puro',
          date: '2024-01-15T10:35:00Z'
        }
      }
    }
  ]

  const codeExamples = {
    javascript: `// Exemplo em JavaScript
const API_KEY = 'sua-api-key';
const BASE_URL = 'https://sonjj.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'sonjj.p.rapidapi.com'
};

// Criar e-mail temporário
async function createTempEmail() {
  const response = await fetch(\`\${BASE_URL}/v1/temp_email/create\`, {
    headers
  });
  const data = await response.json();
  return data.email;
}

// Verificar inbox
async function checkInbox(email) {
  const response = await fetch(
    \`\${BASE_URL}/v1/temp_email/inbox?email=\${encodeURIComponent(email)}\`,
    { headers }
  );
  return await response.json();
}`,

    python: `# Exemplo em Python
import requests

API_KEY = 'sua-api-key'
BASE_URL = 'https://sonjj.p.rapidapi.com'

headers = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'sonjj.p.rapidapi.com'
}

# Criar e-mail temporário
def create_temp_email():
    response = requests.get(f'{BASE_URL}/v1/temp_email/create', headers=headers)
    return response.json()['email']

# Verificar inbox
def check_inbox(email):
    params = {'email': email}
    response = requests.get(f'{BASE_URL}/v1/temp_email/inbox', 
                          headers=headers, params=params)
    return response.json()`,

    curl: `# Exemplo com cURL

# Criar e-mail temporário
curl -X GET "https://sonjj.p.rapidapi.com/v1/temp_email/create" \\
  -H "X-RapidAPI-Key: sua-api-key" \\
  -H "X-RapidAPI-Host: sonjj.p.rapidapi.com"

# Verificar inbox
curl -X GET "https://sonjj.p.rapidapi.com/v1/temp_email/inbox?email=exemplo@temp.com" \\
  -H "X-RapidAPI-Key: sua-api-key" \\
  -H "X-RapidAPI-Host: sonjj.p.rapidapi.com"`
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Documentação da API
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Integre e-mails temporários em suas aplicações com nossa API RESTful simples e poderosa. 
              Perfeita para testes automatizados, verificações e proteção de privacidade.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                REST API
              </Badge>
              <Badge className="bg-blue-500 text-white">
                <Shield className="w-3 h-3 mr-1" />
                Autenticada
              </Badge>
              <Badge className="bg-purple-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Tempo Real
              </Badge>
            </div>

            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <a href="https://rapidapi.com/sonjj/api/temp-email" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Obter API Key
              </a>
            </Button>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Início Rápido</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Key className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Obter API Key</h3>
                    <p className="text-sm text-muted-foreground">
                      Registre-se no RapidAPI e obtenha sua chave de acesso gratuita
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Fazer Requisições</h3>
                    <p className="text-sm text-muted-foreground">
                      Use os endpoints para criar e-mails e verificar mensagens
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Receber E-mails</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitore o inbox em tempo real para novas mensagens
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Endpoints da API</h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Badge 
                        className={`${
                          endpoint.method === 'GET' ? 'bg-green-500' : 
                          endpoint.method === 'POST' ? 'bg-blue-500' : 'bg-orange-500'
                        } text-white`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                    </CardTitle>
                    <p className="text-muted-foreground">{endpoint.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Parâmetros */}
                    {endpoint.params.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Parâmetros</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-2">Nome</th>
                                <th className="text-left p-2">Tipo</th>
                                <th className="text-left p-2">Obrigatório</th>
                                <th className="text-left p-2">Descrição</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.params.map((param, i) => (
                                <tr key={i} className="border-b border-border">
                                  <td className="p-2 font-mono">{param.name}</td>
                                  <td className="p-2">{param.type}</td>
                                  <td className="p-2">
                                    {param.required ? (
                                      <Badge variant="destructive">Sim</Badge>
                                    ) : (
                                      <Badge variant="secondary">Não</Badge>
                                    )}
                                  </td>
                                  <td className="p-2">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Resposta */}
                    <div>
                      <h4 className="font-semibold mb-2">Resposta de Exemplo</h4>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${index}`)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Exemplos de Código */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Exemplos de Código</h2>
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="mt-0">
                      <div className="relative">
                        <pre className="bg-muted p-6 overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Limites e Autenticação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Autenticação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Todas as requisições devem incluir os headers de autenticação do RapidAPI:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    X-RapidAPI-Key: sua-api-key<br/>
                    X-RapidAPI-Host: sonjj.p.rapidapi.com
                  </code>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://rapidapi.com/sonjj/api/temp-email" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Obter API Key Gratuita
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Limites de Uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Plano Gratuito:</span>
                    <span className="font-semibold">100 req/dia</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plano Básico:</span>
                    <span className="font-semibold">1.000 req/dia</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plano Pro:</span>
                    <span className="font-semibold">10.000 req/dia</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rate limit: 10 requisições por minuto
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Casos de Uso */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Casos de Uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Testes Automatizados</h3>
                  <p className="text-sm text-muted-foreground">
                    Teste fluxos de verificação de e-mail sem usar endereços reais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Proteção de Privacidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Proteja e-mails pessoais em cadastros e verificações
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Integração Web</h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione funcionalidade de e-mail temporário em suas aplicações
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtenha sua API key gratuita e comece a integrar e-mails temporários em suas aplicações hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <a href="https://rapidapi.com/sonjj/api/temp-email" target="_blank" rel="noopener noreferrer">
                  <Key className="w-5 h-5 mr-2" />
                  Obter API Key
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/generator">
                  <Mail className="w-5 h-5 mr-2" />
                  Testar Interface
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiDocs
