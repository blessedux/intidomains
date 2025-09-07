"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DomainSuggestion {
  domain: string
  available: boolean
  price?: number
}

interface DomainSuggestionsProps {
  originalDomain: string
  suggestions: DomainSuggestion[]
  onDomainSelect: (domain: string) => void
  onBack: () => void
}

export function DomainSuggestions({ originalDomain, suggestions, onDomainSelect, onBack }: DomainSuggestionsProps) {
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {originalDomain}
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">No Disponible</span>
          </div>
          <p className="text-white/70 text-sm">
            Este dominio ya está registrado. Aquí tienes algunas alternativas:
          </p>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion.domain}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {suggestion.available ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <div className="text-white font-medium">
                    {suggestion.domain}
                  </div>
                  {suggestion.available && suggestion.price && (
                    <div className="text-green-400 text-sm">
                      ${suggestion.price.toLocaleString('es-CL')} CLP
                    </div>
                  )}
                </div>
              </div>
              
              {suggestion.available ? (
                <Button 
                  onClick={() => onDomainSelect(suggestion.domain)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Seleccionar
                </Button>
              ) : (
                <span className="text-red-400 text-sm">No disponible</span>
              )}
            </div>
          ))}
        </div>

        <Button 
          onClick={onBack}
          variant="outline"
          className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          Buscar Otro Dominio
        </Button>
      </div>
    </div>
  )
}
