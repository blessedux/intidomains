"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AvailabilityCard } from "@/components/availability-card"
import { BackgroundAnimation } from "@/components/background-animation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface DomainResult {
  domain: string
  available: boolean
  priceYear: number
  suggestions?: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [result, setResult] = useState<DomainResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!query) return

      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock result - randomly available or not
      const available = Math.random() > 0.3
      const suggestions = available
        ? []
        : [query.replace(".cl", "-chile.cl"), query.replace(".cl", "-app.cl"), query.replace(".cl", "2024.cl")]

      setResult({
        domain: query,
        available,
        priceYear: 15000, // CLP
        suggestions,
      })

      setLoading(false)
    }

    fetchAvailability()
  }, [query])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to search
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Search Results</h1>
          <p className="text-muted-foreground">Results for "{query}"</p>
        </div>

        <div className="max-w-2xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Checking availability...</p>
            </div>
          ) : result ? (
            <AvailabilityCard
              domain={result.domain}
              available={result.available}
              priceYear={result.priceYear}
              suggestions={result.suggestions}
              onAddToCart={(domain) => {
                // Navigate to cart with domain
                window.location.href = `/cart?domain=${encodeURIComponent(domain)}`
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
