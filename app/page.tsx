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
        <Prism 
          height={showPayment ? 4.0 : 3.5}
          baseWidth={showPayment ? 4.0 : 5.5}
          animationType="rotate"
          glow={showPayment ? 1.5 : 1.2}
          noise={0.3}
          transparent={true}
          scale={showPayment ? 3.0 : 2.5}
          timeScale={isSearching ? 0.6 : 0.2}
          hueShift={0.2}
          colorFrequency={1.2}
          bloom={showPayment ? 1.3 : 1.1}
        />
      </div>

      {/* Login Button - Only show when not logged in and not in login/dashboard/dns */}
      {!showLogin && !showDashboard && !showDNSZone && !userEmail && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={handleLoginClick}
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </Button>
        </div>
      )}

      {/* User Name with Logout - Show when logged in and in payment/crypto/dns */}
      {userEmail && (showPayment || showCryptoPayment || showDNSZone) && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            {formatUserName(userEmail)}
            <LogIn className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

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
              onLogout={handleLogout}
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
                  <button 
                    onClick={handleRegisterClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Registrar Ahora
                  </button>
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
