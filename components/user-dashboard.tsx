"use client"

import { useState } from "react"
import { Globe, ChevronRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"

interface Domain {
  id: string
  name: string
  registeredDate: string
  expiresDate: string
  status: 'active' | 'expired' | 'pending'
  developers: string[]
}

interface UserDashboardProps {
  userEmail: string
  onDomainClick: (domain: Domain) => void
  onSearch: (domain: string) => void
  isSearching: boolean
  newlyRegisteredDomain?: string
}

export function UserDashboard({ userEmail, onDomainClick, onSearch, isSearching, newlyRegisteredDomain }: UserDashboardProps) {
  // Mock data - in real app this would come from API
  const [domains] = useState<Domain[]>(() => {
    const baseDomains = [
      {
        id: '1',
        name: 'miempresa.cl',
        registeredDate: '2023-01-15',
        expiresDate: '2025-01-15',
        status: 'active' as const,
        developers: ['juan@empresa.com', 'maria@empresa.com']
      },
      {
        id: '2',
        name: 'portafolio.cl',
        registeredDate: '2023-06-20',
        expiresDate: '2024-06-20',
        status: 'active' as const,
        developers: ['juan@empresa.com']
      },
      {
        id: '3',
        name: 'tiendaonline.cl',
        registeredDate: '2022-12-10',
        expiresDate: '2024-12-10',
        status: 'expired' as const,
        developers: []
      },
      {
        id: '4',
        name: 'blogpersonal.cl',
        registeredDate: '2023-03-10',
        expiresDate: '2025-03-10',
        status: 'active' as const,
        developers: ['juan@empresa.com']
      },
      {
        id: '5',
        name: 'consultoria.cl',
        registeredDate: '2023-08-15',
        expiresDate: '2024-08-15',
        status: 'active' as const,
        developers: ['maria@empresa.com', 'carlos@empresa.com']
      },
      {
        id: '6',
        name: 'eventos.cl',
        registeredDate: '2023-11-01',
        expiresDate: '2024-11-01',
        status: 'active' as const,
        developers: ['juan@empresa.com']
      }
    ]

    // Add newly registered domain if provided
    if (newlyRegisteredDomain) {
      const newDomain: Domain = {
        id: Date.now().toString(),
        name: newlyRegisteredDomain,
        registeredDate: new Date().toISOString().split('T')[0],
        expiresDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        status: 'active',
        developers: [userEmail]
      }
      return [newDomain, ...baseDomains] // Put new domain at the top
    }

    return baseDomains
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'expired': return 'text-red-400'
      case 'pending': return 'text-yellow-400'
      default: return 'text-white/70'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'expired': return 'Expirado'
      case 'pending': return 'Pendiente'
      default: return 'Desconocido'
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-white">Mis Dominios</h2>
            <p className="text-white/70 text-sm">{userEmail}</p>
          </div>

          {/* Domains List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {domains.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/70">No tienes dominios registrados</p>
                <p className="text-white/50 text-sm mt-2">Usa la barra de búsqueda abajo para registrar tu primer dominio</p>
              </div>
            ) : (
              domains.map((domain) => (
                <div 
                  key={domain.id}
                  onClick={() => onDomainClick(domain)}
                  className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <div>
                          <h3 className="text-white font-medium">{domain.name}</h3>
                          <div className="flex items-center space-x-4 text-xs text-white/60">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Expira: {new Date(domain.expiresDate).toLocaleDateString('es-CL')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{domain.developers.length} desarrollador{domain.developers.length !== 1 ? 'es' : ''}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-medium ${getStatusColor(domain.status)}`}>
                        {getStatusText(domain.status)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Search Bar */}
          <div className="pt-4 border-t border-white/10">
            <SearchBar onSubmit={onSearch} disabled={isSearching} />
          </div>
        </div>
      </div>
    </div>
  )
}
