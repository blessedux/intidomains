"use client"

import Sphere from "@/components/ui/sphere"

export default function WikiPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Sphere Background */}
      <div className="absolute inset-0">
        <Sphere 
          height={3.5}
          baseWidth={5.5}
          animationType="rotate"
          glow={1.2}
          noise={0.3}
          transparent={true}
          scale={2.5}
          timeScale={0.2}
          hueShift={0.2}
          colorFrequency={1.2}
          bloom={1.1}
          offset={{ x: 0, y: 0 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            nic.cl sucks
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            Por eso construimos Inti Domains
          </p>
          
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/inti_logo.png" 
              alt="Inti Domains" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* CTA Button */}
          <div className="pt-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white hover:bg-gray-100 text-black font-medium py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Registra tu dominio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
