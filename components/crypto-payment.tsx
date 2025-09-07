"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Bitcoin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CryptoPaymentProps {
  domain: string
  price: number
  years: number
  onBack: () => void
  onPaymentComplete: () => void
}

export function CryptoPayment({ domain, price, years, onBack, onPaymentComplete }: CryptoPaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<'bitcoin' | 'ethereum' | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'completed'>('pending')
  const [invoiceAddress, setInvoiceAddress] = useState('')

  const totalPrice = price * years

  const handleCryptoSelect = (crypto: 'bitcoin' | 'ethereum') => {
    setSelectedCrypto(crypto)
    // Generate mock invoice address
    if (crypto === 'bitcoin') {
      setInvoiceAddress('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')
    } else {
      setInvoiceAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6')
    }
  }

  const handleCheckPayment = async () => {
    setPaymentStatus('checking')
    
    // Mock payment check - simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock successful payment
    setPaymentStatus('completed')
    
    // Auto-complete after showing success
    setTimeout(() => {
      onPaymentComplete()
    }, 2000)
  }

  const handleBack = () => {
    if (selectedCrypto) {
      setSelectedCrypto(null)
      setPaymentStatus('pending')
      setInvoiceAddress('')
    } else {
      onBack()
    }
  }

  // Show crypto selection
  if (!selectedCrypto) {
    return (
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 max-w-sm mx-auto">
        <div className="text-center space-y-3">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">
              {domain}
            </h2>
            <div className="text-xl font-bold text-white">
              ${totalPrice.toLocaleString('es-CL')} CLP
            </div>
            <p className="text-white/70 text-xs">
              Registro por {years} {years === 1 ? 'año' : 'años'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">
              Selecciona criptomoneda
            </h3>
            
            <div className="space-y-2">
              {/* Bitcoin Option */}
              <Card 
                onClick={() => handleCryptoSelect('bitcoin')}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/20 rounded-full group-hover:bg-orange-500/30 transition-colors">
                      <Bitcoin className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm font-medium">Bitcoin</div>
                      <div className="text-white/60 text-xs">Lightning Network</div>
                    </div>
                    <div className="bg-orange-600 text-white text-xs px-3 py-1 rounded">
                      Pagar
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ethereum Option */}
              <Card 
                onClick={() => handleCryptoSelect('ethereum')}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm font-medium">Ethereum</div>
                      <div className="text-white/60 text-xs">ERC-20 Tokens</div>
                    </div>
                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                      Pagar
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Button 
            onClick={onBack}
            variant="outline"
            size="sm"
            className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
          >
            Volver
          </Button>
        </div>
      </div>
    )
  }

  // Show QR code and payment interface
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 max-w-sm mx-auto">
      <div className="text-center space-y-3">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">
            {domain}
          </h2>
          <div className="text-xl font-bold text-white">
            ${totalPrice.toLocaleString('es-CL')} CLP
          </div>
          <p className="text-white/70 text-xs">
            {selectedCrypto === 'bitcoin' ? 'Bitcoin Lightning' : 'Ethereum'} • {years} {years === 1 ? 'año' : 'años'}
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">📱</div>
            <div className="text-xs text-gray-600 font-mono break-all">
              {invoiceAddress}
            </div>
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'completed' && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">¡Pago Confirmado!</span>
            </div>
            <p className="text-green-400/70 text-xs mt-1">
              Tu dominio {domain} ha sido registrado exitosamente
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={handleCheckPayment}
            disabled={paymentStatus === 'checking' || paymentStatus === 'completed'}
            size="sm"
            className={`w-full text-xs ${
              selectedCrypto === 'bitcoin' 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {paymentStatus === 'checking' ? 'Verificando...' : 
             paymentStatus === 'completed' ? '¡Completado!' : 'Verificar Pago'}
          </Button>
          
          <Button 
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Volver
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-white/60 text-xs">
          Escanea el código QR con tu wallet {selectedCrypto === 'bitcoin' ? 'Bitcoin' : 'Ethereum'} para completar el pago
        </p>
      </div>
    </div>
  )
}
