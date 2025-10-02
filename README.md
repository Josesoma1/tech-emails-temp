# Tech E-mails Temp

Uma aplicação web moderna para geração de e-mails temporários com interface dark, autenticação Google, sistema de planos e API integrada.

## 🚀 Características

- **Interface Dark Moderna**: Design responsivo com tema escuro elegante
- **Autenticação Google**: Login seguro via Supabase
- **Sistema de Planos**: Plano gratuito (10 e-mails/dia) e Premium (ilimitado)
- **API Integrada**: Integração com API de e-mails temporários
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tempo Real**: Inbox atualizado automaticamente

## 🛠️ Tecnologias

- **Frontend**: React 18, TailwindCSS, shadcn/ui
- **Autenticação**: Supabase Auth (Google OAuth)
- **API**: RapidAPI (Sonjj Temp Email)
- **Ícones**: Lucide React
- **Notificações**: React Hot Toast
- **Roteamento**: React Router DOM

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/tech-emails-temp.git
   cd tech-emails-temp
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   REACT_APP_RAPIDAPI_KEY=your-rapidapi-key
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm run dev
   ```

## ⚙️ Configuração do Supabase

1. **Crie um projeto no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Copie a URL e a chave anônima

2. **Configure a autenticação Google**
   - Vá para Authentication > Providers
   - Ative o Google OAuth
   - Configure as credenciais do Google Cloud Console

3. **Crie as tabelas necessárias**
   ```sql
   -- Tabela para controle de planos dos usuários
   CREATE TABLE user_plans (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'premium')),
     emails_used_today INTEGER DEFAULT 0,
     last_email_date DATE DEFAULT CURRENT_DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- RLS (Row Level Security)
   ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;

   -- Política para usuários verem apenas seus próprios dados
   CREATE POLICY "Users can view own plan" ON user_plans
     FOR SELECT USING (auth.uid() = user_id);

   -- Política para usuários atualizarem apenas seus próprios dados
   CREATE POLICY "Users can update own plan" ON user_plans
     FOR UPDATE USING (auth.uid() = user_id);

   -- Política para inserção de novos planos
   CREATE POLICY "Users can insert own plan" ON user_plans
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

## 🔑 Configuração da API

1. **Obtenha uma chave da RapidAPI**
   - Acesse [RapidAPI](https://rapidapi.com)
   - Procure por "Temp Email" ou "Sonjj"
   - Inscreva-se no plano gratuito
   - Copie sua API key

2. **Configure a chave no arquivo .env**
   ```env
   REACT_APP_RAPIDAPI_KEY=sua-chave-aqui
   ```

## 📱 Funcionalidades

### Plano Gratuito
- ✅ Até 10 e-mails temporários por dia
- ✅ Múltiplos domínios disponíveis
- ✅ Inbox em tempo real
- ✅ Interface responsiva
- ✅ Histórico de 7 dias

### Plano Premium (R$ 60/mês)
- ✅ E-mails ilimitados
- ✅ Histórico expandido (30 dias)
- ✅ Prioridade no carregamento
- ✅ Suporte prioritário
- ✅ API de acesso

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Build command: `pnpm run build`
4. Publish directory: `dist`

## 📖 Uso da API

### Criar E-mail Temporário
```javascript
const response = await fetch('https://sonjj.p.rapidapi.com/v1/temp_email/create', {
  headers: {
    'X-RapidAPI-Key': 'sua-api-key',
    'X-RapidAPI-Host': 'sonjj.p.rapidapi.com'
  }
});
const data = await response.json();
console.log(data.email);
```

### Verificar Inbox
```javascript
const response = await fetch(`https://sonjj.p.rapidapi.com/v1/temp_email/inbox?email=${email}`, {
  headers: {
    'X-RapidAPI-Key': 'sua-api-key',
    'X-RapidAPI-Host': 'sonjj.p.rapidapi.com'
  }
});
const messages = await response.json();
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: suporte@techemailstemp.com
- **Website**: [techemailstemp.com](https://techemailstemp.com)
- **Documentação**: [techemailstemp.com/api-docs](https://techemailstemp.com/api-docs)

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [RapidAPI](https://rapidapi.com) - API Marketplace
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Lucide](https://lucide.dev) - Ícones
- [TailwindCSS](https://tailwindcss.com) - Framework CSS

---

Feito com ❤️ para proteger sua privacidade online.
