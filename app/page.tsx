"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import Prism from "@/components/ui/prism"

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [searchResult, setSearchResult] = useState<{
    domain: string
    available: boolean
    price?: number
  } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSearch = async (domain: string) => {
    setIsSearching(true)
    setCurrentStep(0)
    setSearchResult(null)
    setShowResult(false)

    // Simulate search steps with progress
    for (let i = 0; i < searchSteps.length; i++) {
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    // Simulate result
    const isAvailable = Math.random() > 0.3 // 70% chance of being available
    const mockPrice = Math.floor(Math.random() * 50000) + 10000 // Between $10-60k CLP
    
    setSearchResult({
      domain,
      available: isAvailable,
      price: isAvailable ? mockPrice : undefined
    })
    
    setShowResult(true)
    setIsSearching(false)
  }

  const searchSteps = [
    "Validando formato del dominio...",
    "Conectando con NIC Chile...",
    "Verificando estado actual de la zona...",
    "Obteniendo precio en vivo...",
    "Preparando resultados...",
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <Prism 
          height={3.5}
          baseWidth={5.5}
          animationType="rotate"
          glow={1.2}
          noise={0.3}
          transparent={true}
          scale={2.5}
          timeScale={isSearching ? 0.6 : 0.2}
          hueShift={0.2}
          colorFrequency={1.2}
          bloom={1.1}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className={`transition-opacity duration-500 ${showResult ? 'opacity-50' : 'opacity-100'}`}>
            <SearchBar onSubmit={handleSearch} disabled={isSearching} />
          </div>

          {/* Search Progress */}
          {isSearching && (
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-sm">
                    {searchSteps[currentStep]}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / searchSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Search Result */}
          {showResult && searchResult && (
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  {searchResult.domain}
                </h2>
                
                {searchResult.available ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-medium">Disponible</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${searchResult.price?.toLocaleString('es-CL')} CLP
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                      Registrar Ahora
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-400 font-medium">No Disponible</span>
                    </div>
                    <p className="text-white/70 text-sm">
                      Este dominio ya está registrado
                    </p>
                    <button 
                      onClick={() => {
                        setShowResult(false)
                        setSearchResult(null)
                      }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      Buscar Otro Dominio
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-0.5">Inti Domains</h1>
          <p className="text-sm text-white/70 max-w-2xl mx-auto mb-0.5">
            Registra tu dominio .cl 
          </p>
          <a 
            href="https://x.com/blessed_ux" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-white/50 hover:text-white/70 transition-colors block"
          >
            Built by Blessed UX
          </a>
        </div>
      </div>

    </div>
  )
}
