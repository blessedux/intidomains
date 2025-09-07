"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PreloaderNarratedProps {
  steps: string[]
  onComplete: () => void
}

export function PreloaderNarrated({ steps, onComplete }: PreloaderNarratedProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 600 // ms per step
    const progressInterval = 50 // ms between progress updates

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / steps.length / (stepDuration / progressInterval)

        if (newProgress >= (currentStep + 1) * (100 / steps.length)) {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
          } else {
            clearInterval(timer)
            setTimeout(onComplete, 300)
          }
        }

        return Math.min(newProgress, 100)
      })
    }, progressInterval)

    return () => clearInterval(timer)
  }, [currentStep, steps.length, onComplete])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="p-8 max-w-md w-full mx-4 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Searching for your domain</h3>
            <p className="text-muted-foreground text-sm">{steps[currentStep]}</p>
          </div>

          <Progress value={progress} className="w-full" />

          <div className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </Card>
    </div>
  )
}
