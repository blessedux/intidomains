"use client"

import { useState } from "react"
import { CreditCard, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentSelectionProps {
  domain: string
  price: number
  onPaymentMethodSelect: (method: 'card' | 'crypto', years: number) => void
  onBack: () => void
}

export function PaymentSelection({ domain, price, onPaymentMethodSelect, onBack }: PaymentSelectionProps) {
  const [selectedYears, setSelectedYears] = useState(1)
  
  const totalPrice = price * selectedYears
  
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
            Registro por {selectedYears} {selectedYears === 1 ? 'año' : 'años'}
          </p>
        </div>

        {/* Years Selection */}
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">Selecciona duración</h4>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 5].map((years) => (
              <button
                key={years}
                onClick={() => setSelectedYears(years)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedYears === years
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {years} {years === 1 ? 'año' : 'años'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">
            Selecciona método de pago
          </h3>
          
          <div className="space-y-2">
            {/* Credit/Debit Card Option */}
            <Card 
              onClick={() => onPaymentMethodSelect('card', selectedYears)}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium">Tarjeta</div>
                    <div className="text-white/60 text-xs">Visa, Mastercard, Amex</div>
                  </div>
                  <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                    Pagar
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crypto Option */}
            <Card 
              onClick={() => onPaymentMethodSelect('crypto', selectedYears)}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-500/20 rounded-full group-hover:bg-orange-500/30 transition-colors">
                    <Coins className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium">Criptomonedas</div>
                    <div className="text-white/60 text-xs">Bitcoin, Ethereum, USDC</div>
                  </div>
                  <div className="bg-orange-600 text-white text-xs px-3 py-1 rounded">
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
