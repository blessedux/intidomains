"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSubmit: (domain: string) => void
  disabled?: boolean
}

export function SearchBar({ onSubmit, disabled = false }: SearchBarProps) {
  const [domain, setDomain] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain.trim()) {
      const cleanDomain = domain.trim().toLowerCase().replace(/\.cl$/, "")
      onSubmit(`${cleanDomain}.cl`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="busca tu dominio"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          disabled={disabled}
          className="text-lg h-14 pr-12 bg-card border-border focus:ring-primary"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">.cl</span>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={disabled || !domain.trim()}
        className="h-14 px-8 bg-primary hover:bg-primary/90"
      >
        <Search className="w-5 h-5 mr-2" />
        Registrar
      </Button>
    </form>
  )
}
