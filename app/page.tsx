"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { PaymentSelection } from "@/components/payment-selection"
import { CryptoPayment } from "@/components/crypto-payment"
import { DomainSuggestions } from "@/components/domain-suggestions"
import { LoginScreen } from "@/components/login-screen"
import { UserDashboard } from "@/components/user-dashboard"
import { DNSZone } from "@/components/dns-zone"
import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Prism from "@/components/ui/prism"
import Sphere from "@/components/ui/sphere"

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [searchResult, setSearchResult] = useState<{
    domain: string
    available: boolean
    price?: number
  } | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showCryptoPayment, setShowCryptoPayment] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showDNSZone, setShowDNSZone] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<any>(null)
  const [userEmail, setUserEmail] = useState("")
  const [paymentYears, setPaymentYears] = useState(1)
  const [newlyRegisteredDomain, setNewlyRegisteredDomain] = useState<string | null>(null)
  const [savedDomains, setSavedDomains] = useState<Array<{domain: string, price: number, savedAt: string}>>([])
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [bookmarkAnimation, setBookmarkAnimation] = useState(false)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSavedModal) {
        const target = event.target as Element
        if (!target.closest('.saved-modal-container')) {
          setShowSavedModal(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSavedModal])
  const [domainSuggestions, setDomainSuggestions] = useState<Array<{
    domain: string
    available: boolean
    price?: number
  }>>([])

  // Check for existing login on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('inti-domains-user-email')
    if (savedEmail) {
      setUserEmail(savedEmail)
      setShowDashboard(true)
    }
  }, [])

  const handleSearch = async (domain: string) => {
    setIsSearching(true)
    setCurrentStep(0)
    setSearchResult(null)
    setShowResult(false)
    setShowPayment(false)
    setShowSuggestions(false)
    setShowLogin(false)
    setShowDashboard(false)
    setShowDNSZone(false)

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
    
    if (isAvailable) {
      setShowResult(true)
    } else {
      // Generate domain suggestions
      const suggestions = generateDomainSuggestions(domain)
      setDomainSuggestions(suggestions)
      setShowSuggestions(true)
    }
    
    setIsSearching(false)
  }

  const generateDomainSuggestions = (originalDomain: string): Array<{
    domain: string
    available: boolean
    price?: number
  }> => {
    const baseName = originalDomain.replace('.cl', '')
    const suggestions = [
      `${baseName}app.cl`,
      `${baseName}online.cl`,
      `${baseName}site.cl`,
      `${baseName}web.cl`,
      `${baseName}chile.cl`,
      `mi${baseName}.cl`,
      `${baseName}2024.cl`,
      `${baseName}pro.cl`
    ]

    return suggestions.map(suggestion => ({
      domain: suggestion,
      available: Math.random() > 0.4, // 60% chance of being available
      price: Math.random() > 0.4 ? Math.floor(Math.random() * 50000) + 10000 : undefined
    }))
  }

  const handleRegisterClick = () => {
    // Check if user is logged in
    if (!userEmail) {
      // Take user directly to create account
      setShowResult(false)
      setShowLogin(true)
      return
    }
    
    // User is logged in, proceed to payment
    setShowResult(false)
    setShowPayment(true)
  }

  const handlePaymentMethodSelect = (method: 'card' | 'crypto', years: number) => {
    setPaymentYears(years)
    if (method === 'card') {
      // TODO: Implement card payment
      alert(`Procesando pago con tarjeta para ${searchResult?.domain} por ${years} años...`)
    } else {
      setShowPayment(false)
      setShowCryptoPayment(true)
    }
  }

  const handleDomainSelect = (domain: string) => {
    setShowSuggestions(false)
    // Find the selected domain from suggestions
    const selectedDomain = domainSuggestions.find(s => s.domain === domain)
    if (selectedDomain && selectedDomain.available) {
      setSearchResult(selectedDomain)
      setShowResult(true)
    }
  }

  const handleBackToSearch = () => {
    setShowResult(false)
    setShowPayment(false)
    setShowSuggestions(false)
    setShowLogin(false)
    setShowDNSZone(false)
    setSelectedDomain(null)
    setSearchResult(null)
    
    // If user was logged in, return to dashboard, otherwise to search
    if (userEmail) {
      setShowDashboard(true)
    }
  }

  const handleLogin = (email: string, password: string) => {
    // Save to localStorage for persistence
    localStorage.setItem('inti-domains-user-email', email)
    setUserEmail(email)
    setShowLogin(false)
    
    // If we have a search result, proceed to payment
    if (searchResult) {
      setShowPayment(true)
    } else {
      setShowDashboard(true)
    }
  }

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('inti-domains-user-email')
    setUserEmail("")
    setShowDashboard(false)
    setShowDNSZone(false)
    setSelectedDomain(null)
    setNewlyRegisteredDomain(null)
  }

  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const handleDomainClick = (domain: any) => {
    setSelectedDomain(domain)
    setShowDashboard(false)
    setShowDNSZone(true)
  }

  const handleBackToDashboard = () => {
    setShowDNSZone(false)
    setShowDashboard(true)
    setSelectedDomain(null)
  }

  const handleCryptoPaymentComplete = () => {
    // Store the newly registered domain
    if (searchResult?.domain) {
      setNewlyRegisteredDomain(searchResult.domain)
    }
    setShowCryptoPayment(false)
    setShowPayment(false)
    setShowResult(false)
    setShowDashboard(true)
  }

  const handleCryptoPaymentBack = () => {
    setShowCryptoPayment(false)
    setShowPayment(true)
  }

  const formatUserName = (email: string) => {
    const username = email.split('@')[0]
    // Convert dots and underscores to spaces, then capitalize each word
    return username
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
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
        {/* Prism - visible everywhere except payment pages */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showPayment || showCryptoPayment ? 'opacity-0' : 'opacity-100'}`}>
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
        
        {/* Sphere - visible only on payment pages */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showPayment || showCryptoPayment ? 'opacity-100' : 'opacity-0'}`}>
          <Sphere 
            height={3.5}
            baseWidth={5.5}
            animationType="rotate"
            glow={1.5}
            noise={0.3}
            transparent={true}
            scale={3.0}
            timeScale={isSearching ? 0.6 : 0.2}
            hueShift={0.2}
            colorFrequency={1.2}
            bloom={1.3}
            offset={{ x: 0, y: 0 }}
          />
        </div>
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-4 left-6 z-20">
        <img 
          src="/inti_logo.png" 
          alt="Inti Domains" 
          className="h-8 w-auto"
        />
      </div>

      {/* Header Buttons - Right Side */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        {/* Bookmark Button - Always visible */}
        <div className="relative saved-modal-container">
          <Button
            onClick={() => setShowSavedModal(!showSavedModal)}
            variant="outline"
            size="sm"
            className={`bg-white/10 hover:bg-white/20 text-white border-white/20 transition-transform duration-300 ${
              bookmarkAnimation ? 'scale-110' : 'scale-100'
            }`}
          >
            <svg className="w-4 h-4" fill={showSavedModal ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {savedDomains.length > 0 && (
              <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                bookmarkAnimation ? 'scale-125 bg-green-500' : 'scale-100'
              }`}>
                {savedDomains.length}
              </span>
            )}
          </Button>
          
          {/* Saved Domains Modal */}
          {showSavedModal && (
            <div className="absolute top-12 right-0 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-80 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium text-sm">Dominios Guardados</h3>
                  <button
                    onClick={() => setShowSavedModal(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {savedDomains.length === 0 ? (
                  <p className="text-white/70 text-sm">No hay dominios guardados</p>
                ) : (
                  <div className="space-y-2">
                    {savedDomains.map((saved, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium text-sm">{saved.domain}</p>
                            <p className="text-white/70 text-xs">${saved.price.toLocaleString('es-CL')} CLP</p>
                            <p className="text-white/50 text-xs">
                              Guardado: {new Date(saved.savedAt).toLocaleDateString('es-CL')}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                // TODO: Implement register from saved
                                alert(`Registrando ${saved.domain}...`)
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
                            >
                              Registrar
                            </button>
                            <button
                              onClick={() => {
                                setSavedDomains(prev => prev.filter((_, i) => i !== index))
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Disclaimer */}
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-3">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="text-yellow-400 font-medium text-xs">Importante</p>
                      <p className="text-yellow-300 text-xs">
                        Guardar un dominio no garantiza su disponibilidad. Es un proceso de primero en llegar, primero en ser servido. ¡Compra rápido antes de que alguien más lo haga!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Login Button - Only show when not logged in and not in login/dashboard/dns */}
        {!showLogin && !showDashboard && !showDNSZone && !userEmail && (
          <Button
            onClick={handleLoginClick}
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </Button>
        )}

        {/* User Name with Logout - Show when logged in */}
        {userEmail && (
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            {formatUserName(userEmail)}
            <LogIn className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl space-y-6">
          {/* Login Screen */}
          {showLogin && (
            <LoginScreen
              onLogin={handleLogin}
              onBack={handleBackToSearch}
            />
          )}

          {/* User Dashboard */}
          {showDashboard && (
            <UserDashboard
              userEmail={userEmail}
              onDomainClick={handleDomainClick}
              onSearch={handleSearch}
              isSearching={isSearching}
              newlyRegisteredDomain={newlyRegisteredDomain || undefined}
            />
          )}

          {/* DNS Zone */}
          {showDNSZone && selectedDomain && (
            <DNSZone
              domain={selectedDomain}
              onBack={handleBackToDashboard}
            />
          )}

          {/* Search Bar */}
          {!showLogin && !showDashboard && !showDNSZone && (
            <div className={`transition-opacity duration-500 ${showResult ? 'opacity-50' : 'opacity-100'}`}>
              <SearchBar onSubmit={handleSearch} disabled={isSearching} />
            </div>
          )}

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
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 font-medium">Disponible</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    ${searchResult.price?.toLocaleString('es-CL')} CLP
        </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handleRegisterClick}
                      className="flex-1 bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      Registrar Ahora
                    </button>
                    <button 
                      onClick={() => {
                        if (searchResult?.domain && searchResult?.price) {
                          // Check if domain is already saved
                          const isAlreadySaved = savedDomains.some(saved => saved.domain === searchResult.domain)
                          
                          if (!isAlreadySaved) {
                            const newSavedDomain = {
                              domain: searchResult.domain,
                              price: searchResult.price,
                              savedAt: new Date().toISOString()
                            }
                            setSavedDomains(prev => [...prev, newSavedDomain])
                            
                            // Trigger animation
                            setBookmarkAnimation(true)
                            setTimeout(() => setBookmarkAnimation(false), 600)
                          }
                        }
                      }}
                      className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-3 rounded-lg transition-colors flex items-center justify-center"
                      title="Guardar para Después"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domain Suggestions */}
          {showSuggestions && (
            <DomainSuggestions
              originalDomain={searchResult?.domain || ''}
              suggestions={domainSuggestions}
              onDomainSelect={handleDomainSelect}
              onBack={handleBackToSearch}
            />
          )}

          {/* Payment Selection */}
          {showPayment && searchResult && (
            <PaymentSelection
              domain={searchResult.domain}
              price={searchResult.price || 0}
              onPaymentMethodSelect={handlePaymentMethodSelect}
              onBack={handleBackToSearch}
            />
          )}

          {showCryptoPayment && searchResult && (
            <CryptoPayment
              domain={searchResult.domain}
              price={searchResult.price || 0}
              years={paymentYears}
              onBack={handleCryptoPaymentBack}
              onPaymentComplete={handleCryptoPaymentComplete}
            />
          )}
        </div>
        </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-1">
        <div className="text-center">
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
