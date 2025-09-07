"use client"

import { Check, X, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AvailabilityCardProps {
  domain: string
  available: boolean
  priceYear: number
  suggestions?: string[]
  onAddToCart: (domain: string) => void
}

export function AvailabilityCard({
  domain,
  available,
  priceYear,
  suggestions = [],
  onAddToCart,
}: AvailabilityCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {available ? (
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-foreground">{domain}</h2>
              <p className="text-muted-foreground">{available ? "Available for registration" : "Already registered"}</p>
            </div>
          </div>

          {available && (
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{formatPrice(priceYear)}</div>
              <div className="text-sm text-muted-foreground">per year</div>
            </div>
          )}
        </div>

        {available ? (
          <div className="flex gap-3">
            <Button onClick={() => onAddToCart(domain)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            This domain is not available for registration. Try one of the suggestions below.
          </div>
        )}
      </Card>

      {!available && suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Alternative Suggestions</h3>
          <div className="grid gap-3">
            {suggestions.map((suggestion) => (
              <Card key={suggestion} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{suggestion}</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-foreground">{formatPrice(priceYear)}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onAddToCart(suggestion)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
