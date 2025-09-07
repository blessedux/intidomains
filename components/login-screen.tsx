"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void
  onBack: () => void
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    
    // Auto-login with any email for development
    onLogin(email, "dev-password")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
            <p className="text-white/70 text-sm">
              Ingresa tu email para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="space-y-3">
            <button className="text-white/70 text-sm hover:text-white transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
            
            <div className="text-white/70 text-sm">
              ¿No tienes cuenta?{" "}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Regístrate aquí
              </button>
            </div>
          </div>

          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  )
}
