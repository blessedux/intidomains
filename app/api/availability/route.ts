import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter required" }, { status: 400 })
  }

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))

  // Mock availability check - randomly available
  const available = Math.random() > 0.3
  const priceYear = 15000 // CLP

  return NextResponse.json({
    domain,
    available,
    priceYear,
  })
}
