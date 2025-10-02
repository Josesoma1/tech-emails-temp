import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  CheckCircle, 
  CreditCard, 
  Shield, 
  X,
  Loader2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const PaymentModal = ({ isOpen, onClose, selectedPlan = 'premium' }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  const plans = {
    premium: {
      name: 'Premium',
      price: 60,
      annualPrice: 48,
      features: [
        'E-mails ilimitados',
        'Histórico expandido (30 dias)',
        'Prioridade no carregamento',
        'Domínios personalizados',
        'API de acesso',
        'Suporte prioritário 24/7'
      ]
    }
  }

  const currentPlan = plans[selectedPlan]

  const handlePayment = async () => {
    if (!user) {
      toast.error('Faça login para continuar')
      return
    }

    setLoading(true)
    
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aqui seria implementada a integração real com Stripe/Supabase
      // const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      //   body: { 
      //     plan: selectedPlan,
      //     userId: user.id,
      //     paymentMethod 
      //   }
      // })
      
      toast.success('Pagamento processado com sucesso!')
      onClose()
      
      // Redirecionar para dashboard ou página de sucesso
      window.location.href = '/dashboard?upgraded=true'
      
    } catch (error) {
      console.error('Erro no pagamento:', error)
      toast.error('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Upgrade para {currentPlan.name}
          </CardTitle>
          <p className="text-muted-foreground">
            Desbloqueie todos os recursos premium
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Plano Selecionado */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">
                R$ {currentPlan.price}
                <span className="text-lg font-normal text-muted-foreground">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ou R$ {currentPlan.annualPrice}/mês (anual com 20% off)
              </p>
            </div>
            
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Método de Pagamento */}
          <div>
            <h3 className="font-semibold mb-3">Método de Pagamento</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <CreditCard className="w-5 h-5" />
                <span>Cartão de Crédito</span>
                <Badge variant="secondary" className="ml-auto">Recomendado</Badge>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span>PIX</span>
                <Badge variant="secondary" className="ml-auto">Instantâneo</Badge>
              </label>
            </div>
          </div>

          {/* Informações de Segurança */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <Shield className="w-4 h-4" />
            <span>Pagamento 100% seguro e criptografado</span>
          </div>

          {/* Botão de Pagamento */}
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 mr-2" />
                Confirmar Upgrade - R$ {currentPlan.price}
              </>
            )}
          </Button>

          {/* Termos */}
          <p className="text-xs text-muted-foreground text-center">
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms" className="text-primary hover:underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentModal
