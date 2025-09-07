"use client"

import { useState } from "react"
import { ArrowLeft, Globe, Users, Plus, Trash2, ExternalLink, Rocket, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Domain {
  id: string
  name: string
  registeredDate: string
  expiresDate: string
  status: 'active' | 'expired' | 'pending'
  developers: string[]
}

interface DNSZoneProps {
  domain: Domain
  onBack: () => void
}

export function DNSZone({ domain, onBack }: DNSZoneProps) {
  const [newDeveloperEmail, setNewDeveloperEmail] = useState("")
  const [developers, setDevelopers] = useState(domain.developers)
  const [newEmailAddress, setNewEmailAddress] = useState("")
  const [emailAddresses, setEmailAddresses] = useState([
    { id: '1', address: 'admin', fullEmail: `admin@${domain.name}`, status: 'active' },
    { id: '2', address: 'info', fullEmail: `info@${domain.name}`, status: 'active' },
    { id: '3', address: 'support', fullEmail: `support@${domain.name}`, status: 'active' }
  ])
  const [editingEmail, setEditingEmail] = useState<string | null>(null)
  const [editingDeveloper, setEditingDeveloper] = useState<string | null>(null)
  const [dnsRecords, setDnsRecords] = useState([
    { id: '1', type: 'A', name: '@', value: '76.76.19.19', ttl: 3600 },
    { id: '2', type: 'CNAME', name: 'www', value: domain.name, ttl: 3600 },
    { id: '3', type: 'MX', name: '@', value: 'mail.vercel-dns.com', ttl: 3600 }
  ])
  const [newRecord, setNewRecord] = useState({ type: 'A', name: '', value: '', ttl: 3600 })
  const [editingRecord, setEditingRecord] = useState<string | null>(null)
  const [dnsPropagation, setDnsPropagation] = useState('')

  const handleAddDeveloper = () => {
    if (newDeveloperEmail && !developers.includes(newDeveloperEmail)) {
      setDevelopers([...developers, newDeveloperEmail])
      setNewDeveloperEmail("")
    }
  }

  const handleRemoveDeveloper = (email: string) => {
    setDevelopers(developers.filter(dev => dev !== email))
  }

  const handleDeployToVercel = () => {
    // Redirect to Vercel in a new tab
    window.open('https://vercel.com', '_blank')
  }

  const handleAddDnsRecord = () => {
    if (newRecord.name && newRecord.value) {
      const record = {
        id: Date.now().toString(),
        ...newRecord
      }
      setDnsRecords([...dnsRecords, record])
      setNewRecord({ type: 'A', name: '', value: '', ttl: 3600 })
    }
  }

  const handleEditDnsRecord = (id: string, field: string, value: string) => {
    setDnsRecords(dnsRecords.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ))
  }

  const handleDeleteDnsRecord = (id: string) => {
    setDnsRecords(dnsRecords.filter(record => record.id !== id))
  }

  const handleCheckPropagation = () => {
    // TODO: Implement DNS propagation check
    alert(`Verificando propagación DNS para ${domain.name}...`)
  }

  const handleAddEmailAddress = () => {
    if (newEmailAddress.trim()) {
      const newEmail = {
        id: Date.now().toString(),
        address: newEmailAddress.trim(),
        fullEmail: `${newEmailAddress.trim()}@${domain.name}`,
        status: 'active' as const
      }
      setEmailAddresses([...emailAddresses, newEmail])
      setNewEmailAddress("")
    }
  }

  const handleDeleteEmailAddress = (id: string) => {
    setEmailAddresses(emailAddresses.filter(email => email.id !== id))
  }

  const handleEditEmailAddress = (id: string, newAddress: string) => {
    setEmailAddresses(emailAddresses.map(email => 
      email.id === id 
        ? { ...email, address: newAddress, fullEmail: `${newAddress}@${domain.name}` }
        : email
    ))
    setEditingEmail(null)
  }

  const handleEditDeveloper = (oldEmail: string, newEmail: string) => {
    setDevelopers(developers.map(dev => dev === oldEmail ? newEmail : dev))
    setEditingDeveloper(null)
  }

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main DNS Zone Panel */}
        <div className="lg:col-span-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 h-full">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={onBack}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h2 className="text-xl font-bold text-white">{domain.name}</h2>
                    <p className="text-white/70 text-sm">Zona DNS</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {domain.status === 'active' ? (
                    <button
                      onClick={() => window.open(`https://${domain.name}`, '_blank')}
                      className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors cursor-pointer"
                    >
                      Activo
                    </button>
                  ) : (
                    <span className="text-xs font-medium px-2 py-1 rounded bg-red-500/20 text-red-400">
                      Expirado
                    </span>
                  )}
                </div>
              </div>

              {/* Domain Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Información del Dominio</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/70">Registrado:</span>
                      <span className="text-white text-xs">{new Date(domain.registeredDate).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Expira:</span>
                      <span className="text-white text-xs">{new Date(domain.expiresDate).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Estado:</span>
                      <span className={`text-xs ${domain.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {domain.status === 'active' ? 'Activo' : 'Expirado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">Registros DNS</h3>
                    <Button
                      onClick={handleAddDnsRecord}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {/* DNS Records List */}
                  <div className="space-y-2 mb-4">
                    {dnsRecords.map((record) => (
                      <div key={record.id} className="bg-white/5 rounded p-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Input
                            value={`${record.type} ${record.name} ${record.value}`}
                            onChange={(e) => {
                              const parts = e.target.value.split(' ')
                              if (parts.length >= 3) {
                                handleEditDnsRecord(record.id, 'type', parts[0])
                                handleEditDnsRecord(record.id, 'name', parts[1])
                                handleEditDnsRecord(record.id, 'value', parts.slice(2).join(' '))
                              }
                            }}
                            className="flex-1 bg-white/10 border-white/20 text-white text-xs h-6"
                            placeholder="A @ 76.76.19.19"
                          />
                          <Button
                            onClick={() => handleDeleteDnsRecord(record.id)}
                            size="sm"
                            variant="outline"
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Record Form */}
                  <div className="space-y-2">
                    <Input
                      placeholder="A @ 76.76.19.19"
                      value={`${newRecord.type} ${newRecord.name} ${newRecord.value}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(' ')
                        if (parts.length >= 3) {
                          setNewRecord({
                            type: parts[0],
                            name: parts[1],
                            value: parts.slice(2).join(' '),
                            ttl: 3600
                          })
                        }
                      }}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-6"
                    />
                  </div>
                </div>
              </div>

              {/* Deploy to Vercel CTA */}
              <div className="bg-black rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium text-sm">Desplegar a Vercel</h3>
                    <p className="text-white/70 text-xs">
                      Despliega tu sitio web
                    </p>
                  </div>
                  <Button
                    onClick={handleDeployToVercel}
                    size="sm"
                    className="bg-white hover:bg-gray-100 text-black text-xs font-medium"
                  >
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                    </svg>
                    Vercel
                  </Button>
                </div>
              </div>

              {/* DNS Propagation Checker */}
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium text-sm">Verificar Propagación DNS</h3>
                  <Button
                    onClick={() => handleCheckPropagation()}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    Verificar
                  </Button>
                </div>
                <p className="text-white/60 text-xs mt-2">
                  Verifica si los cambios DNS se han propagado globalmente para {domain.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Developers Panel */}
        <div className="lg:col-span-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 h-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-medium">Devs</h3>
              </div>

              {/* Add Developer */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={newDeveloperEmail}
                    onChange={(e) => setNewDeveloperEmail(e.target.value)}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 text-sm"
                  />
                  <Button
                    onClick={handleAddDeveloper}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Developers List */}
              <div className="space-y-2">
                {developers.length === 0 ? (
                  <p className="text-white/70 text-sm">No hay desarrolladores agregados</p>
                ) : (
                  developers.map((email, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between min-w-0">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                          {editingDeveloper === email ? (
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              <Input
                                defaultValue={email}
                                className="flex-1 bg-white/10 border-white/20 text-white text-sm h-6"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditDeveloper(email, e.currentTarget.value)
                                  } else if (e.key === 'Escape') {
                                    setEditingDeveloper(null)
                                  }
                                }}
                                autoFocus
                              />
                              <Button
                                onClick={() => handleEditDeveloper(email, (document.querySelector(`input[defaultValue="${email}"]`) as HTMLInputElement)?.value || email)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white h-6 px-2"
                              >
                                <span className="text-xs">Save</span>
                              </Button>
                            </div>
                          ) : (
                            <span 
                              className="text-white text-sm truncate cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => setEditingDeveloper(email)}
                              title={email}
                            >
                              {email}
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleRemoveDeveloper(email)}
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 flex-shrink-0 ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Email Addresses */}
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-green-400" />
                    <h4 className="text-white font-medium text-sm">Direcciones de Email</h4>
                  </div>
                  
                  {/* Add Email Address */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="nombre"
                      value={newEmailAddress}
                      onChange={(e) => setNewEmailAddress(e.target.value)}
                      className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 text-sm"
                    />
                    <Button
                      onClick={handleAddEmailAddress}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Email Addresses List */}
                  <div className="space-y-2">
                    {emailAddresses.map((email) => (
                      <div key={email.id} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between min-w-0">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                            {editingEmail === email.id ? (
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <Input
                                  defaultValue={email.address}
                                  className="flex-1 bg-white/10 border-white/20 text-white text-sm h-6"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleEditEmailAddress(email.id, e.currentTarget.value)
                                    } else if (e.key === 'Escape') {
                                      setEditingEmail(null)
                                    }
                                  }}
                                  autoFocus
                                />
                                <span className="text-white/70 text-sm flex-shrink-0">@{domain.name}</span>
                                <Button
                                  onClick={() => handleEditEmailAddress(email.id, (document.querySelector(`input[defaultValue="${email.address}"]`) as HTMLInputElement)?.value || email.address)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white h-6 px-2"
                                >
                                  <span className="text-xs">Save</span>
                                </Button>
                              </div>
                            ) : (
                              <span 
                                className="text-white text-sm truncate cursor-pointer hover:text-blue-400 transition-colors"
                                onClick={() => setEditingEmail(email.id)}
                                title={email.fullEmail}
                              >
                                {email.fullEmail}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => handleDeleteEmailAddress(email.id)}
                            variant="outline"
                            size="sm"
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 flex-shrink-0 ml-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <p className="text-white/60 text-xs">
                    Haz clic en "Activo" arriba para visitar el sitio web
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
