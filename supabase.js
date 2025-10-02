import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase - substitua pelos valores reais
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('As variáveis de ambiente VITE_REACT_APP_SUPABASE_URL e VITE_REACT_APP_SUPABASE_ANON_KEY devem ser definidas.')
  // Fallback para valores de exemplo para evitar crash, mas o login não funcionará
  // Em produção, isso deve ser tratado com um erro ou mensagem clara ao usuário
  // Para o propósito de desenvolvimento, vamos usar placeholders se não definidos
  // Mas para o deploy, elas DEVEM ser definidas.
  // throw new Error('Supabase URL ou Anon Key não definidos.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Função para autenticação com Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  return { data, error }
}

// Função para logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Função para obter usuário atual
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Função para verificar se usuário é premium
export const checkUserPlan = async (userId) => {
  const { data, error } = await supabase
    .from('user_plans')
    .select('plan_type, emails_used_today, created_at')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

// Função para incrementar contador de e-mails
export const incrementEmailCount = async (userId) => {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('user_plans')
    .upsert({
      user_id: userId,
      emails_used_today: 1,
      last_email_date: today
    }, {
      onConflict: 'user_id'
    })
  
  return { data, error }
}
