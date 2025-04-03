"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Zap,
  ChevronUp,
  ChevronDown,
  Terminal,
  Users,
  Clock,
  DollarSign,
  History,
  Shield,
  Maximize2,
  Minimize2,
} from "lucide-react"

export default function BiddingTerminal({ product }) {
  const [bidAmount, setBidAmount] = useState(product.currentBid + product.bidIncrement)
  const [timeLeft, setTimeLeft] = useState({})
  const [isExpanded, setIsExpanded] = useState(true)
  const [bidHistory, setBidHistory] = useState(product.bidHistory || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  const canvasRef = useRef(null)

  // Neural network animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Set up nodes
    const nodes = []
    const numNodes = 15

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        connected: [],
      })
    }

    // Connect nodes
    for (let i = 0; i < numNodes; i++) {
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * numNodes)
        if (target !== i && !nodes[i].connected.includes(target)) {
          nodes[i].connected.push(target)
        }
      }
    }

    // Animation
    let animationFrameId
    let pulseTime = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update pulse time
      pulseTime += 0.02

      // Draw connections
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i]

        for (const targetIndex of node.connected) {
          const target = nodes[targetIndex]

          // Calculate distance for opacity
          const dx = target.x - node.x
          const dy = target.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = width / 3

          // Only draw if within range
          if (distance < maxDistance) {
            const opacity = 0.2 * (1 - distance / maxDistance)

            // Pulse effect
            const pulse = Math.sin(pulseTime + i * 0.2) * 0.5 + 0.5

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)

            // Gradient line
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
            gradient.addColorStop(0, `rgba(0, 245, 255, ${opacity * pulse})`)
            gradient.addColorStop(1, `rgba(170, 0, 255, ${opacity * pulse})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Pulse effect
        const pulse = Math.sin(pulseTime + i) * 0.5 + 0.5

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          i % 3 === 0
            ? `rgba(0, 245, 255, ${0.5 + pulse * 0.5})`
            : i % 3 === 1
              ? `rgba(170, 0, 255, ${0.5 + pulse * 0.5})`
              : `rgba(0, 255, 65, ${0.5 + pulse * 0.5})`
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 2 + pulse * 3, 0, Math.PI * 2)
        ctx.fillStyle =
          i % 3 === 0
            ? `rgba(0, 245, 255, ${0.1 * pulse})`
            : i % 3 === 1
              ? `rgba(170, 0, 255, ${0.1 * pulse})`
              : `rgba(0, 255, 65, ${0.1 * pulse})`
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      let difference
      const now = new Date()

      // If bidding hasn't started yet
      if (now < new Date(product.bidStartDate)) {
        difference = new Date(product.bidStartDate) - now
        return {
          status: "upcoming",
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      // If bidding has ended
      else if (now > new Date(product.bidEndDate)) {
        return { status: "ended" }
      }
      // Bidding is active
      else {
        difference = new Date(product.bidEndDate) - now
        return {
          status: "active",
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Set up interval for updates
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clean up interval
    return () => clearInterval(intervalId)
  }, [product.bidStartDate, product.bidEndDate])

  const handleBid = () => {
    if (bidAmount <= product.currentBid) return

    // Show loading animation
    setIsLoading(true)

    // Simulate bid processing
    setTimeout(() => {
      // Add new bid to history
      const newBid = {
        id: bidHistory.length + 1,
        amount: bidAmount,
        user: "USER_" + Math.floor(Math.random() * 1000),
        timestamp: new Date(),
        verified: Math.random() > 0.3, // Random verification for demo
      }

      setBidHistory([newBid, ...bidHistory])

      // Set next bid amount
      setBidAmount(bidAmount + product.bidIncrement)

      // Hide loading animation
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const renderCountdown = () => {
    if (timeLeft.status === "ended") {
      return <div className="text-digital-red font-bold">CLOSED</div>
    }

    if (timeLeft.status === "upcoming") {
      return (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="neural-box p-3">
            <div className="text-2xl font-bold text-electric-blue font-space-mono">{timeLeft.days}</div>
            <div className="text-xs text-neutral-400 font-rajdhani">D</div>
          </div>
          <div className="neural-box p-3">
            <div className="text-2xl font-bold text-electric-blue font-space-mono">{timeLeft.hours}</div>
            <div className="text-xs text-neutral-400 font-rajdhani">H</div>
          </div>
          <div className="neural-box p-3">
            <div className="text-2xl font-bold text-electric-blue font-space-mono">{timeLeft.minutes}</div>
            <div className="text-xs text-neutral-400 font-rajdhani">M</div>
          </div>
          <div className="neural-box p-3">
            <div className="text-2xl font-bold text-electric-blue font-space-mono">{timeLeft.seconds}</div>
            <div className="text-xs text-neutral-400 font-rajdhani">S</div>
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="neural-box p-3">
          <div className="text-2xl font-bold text-digital-red font-space-mono">{timeLeft.days}</div>
          <div className="text-xs text-neutral-400 font-rajdhani">D</div>
        </div>
        <div className="neural-box p-3">
          <div className="text-2xl font-bold text-digital-red font-space-mono">{timeLeft.hours}</div>
          <div className="text-xs text-neutral-400 font-rajdhani">H</div>
        </div>
        <div className="neural-box p-3">
          <div className="text-2xl font-bold text-digital-red font-space-mono">{timeLeft.minutes}</div>
          <div className="text-xs text-neutral-400 font-rajdhani">M</div>
        </div>
        <div className="neural-box p-3">
          <div className="text-2xl font-bold text-digital-red font-space-mono">{timeLeft.seconds}</div>
          <div className="text-xs text-neutral-400 font-rajdhani">S</div>
        </div>
      </div>
    )
  }

  return (
    <div className="neural-interface mb-12">
      <div
        className="neural-header flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Terminal className="h-6 w-6 text-electric-blue mr-3" />
          <span className="uppercase tracking-wider text-white font-bold text-xl font-space-mono neural-text-glow">
            NEURAL AUCTION INTERFACE
          </span>
          {timeLeft.status === "active" && (
            <span className="ml-4 inline-flex items-center px-3 py-1 text-xs font-medium bg-digital-red/20 text-digital-red rounded-full animate-pulse">
              <Zap className="h-3 w-3 mr-1" />
              LIVE
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-neutral-400 hover:text-electric-blue transition-colors duration-500" />
        ) : (
          <ChevronDown className="h-6 w-6 text-neutral-400 hover:text-electric-blue transition-colors duration-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left column - 5/12 */}
          <div className="lg:col-span-5 space-y-10">
            {/* Product Image */}
            <div className="neural-card">
              <div className="relative">
                <div
                  className={`relative ${isImageExpanded ? "h-96" : "h-48"} w-full transition-all duration-500 cursor-pointer`}
                  onClick={() => setIsImageExpanded(!isImageExpanded)}
                >
                  <Image
                    src={product.mainImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-[16px]"
                  />
                  <div className="absolute top-3 right-3 bg-matte-black/70 p-1.5 rounded-full">
                    {isImageExpanded ? (
                      <Minimize2 className="h-5 w-5 text-electric-blue" />
                    ) : (
                      <Maximize2 className="h-5 w-5 text-electric-blue" />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-matte-black/70 px-2 py-1 rounded-md text-xs font-space-mono text-electric-blue">
                  ID:{Math.floor(Math.random() * 10000)}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <h3 className="text-white font-space-mono font-bold">{product.name}</h3>
                <span className="text-neon-purple font-space-mono text-lg font-bold">${product.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Bid Status */}
            <div className="neural-card">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-electric-blue mr-3" />
                <h3 className="text-white font-bold uppercase tracking-wider text-xl font-space-mono neural-text-glow">
                  Time Left
                </h3>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-neutral-400 font-rajdhani text-lg">STATUS:</span>
                <span className={`text-sm px-4 py-2 rounded-full ${getBidStatusStyles(timeLeft.status)}`}>
                  {getBidStatusText(timeLeft.status)}
                </span>
              </div>

              {renderCountdown()}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-neon-purple mr-2" />
                  <span className="text-neon-purple font-rajdhani">{product.activeBidders} ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Neural network visualization */}
            <div className="neural-card p-4 h-40 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-sm text-electric-blue font-space-mono">NEURAL MAP</div>
              <canvas ref={canvasRef} width="600" height="150" className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Right column - 7/12 */}
          <div className="lg:col-span-7 space-y-10">
            {/* Current Bid Info */}
            <div className="neural-card">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-neon-purple mr-3" />
                <h3 className="text-white font-bold uppercase tracking-wider text-xl font-space-mono neural-text-glow">
                  Current Bid
                </h3>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-3xl font-bold text-neon-purple font-space-mono">
                  ${product.currentBid.toFixed(2)}
                </span>
                <div className="neural-box px-4 py-2">
                  <span className="text-white font-space-mono">MIN: ${product.bidIncrement.toFixed(2)}</span>
                </div>
              </div>

              {/* Place bid section */}
              {timeLeft.status === "active" && (
                <div className="neural-box p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-space-mono">
                        $
                      </span>
                      <Input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number.parseFloat(e.target.value))}
                        className="pl-8 bg-matte-black border-electric-blue/30 focus:border-electric-blue font-space-mono h-14 text-white text-lg rounded-2xl"
                        step={product.bidIncrement}
                        min={product.currentBid + product.bidIncrement}
                      />
                    </div>
                    <Button
                      className="neural-button h-14 px-8 text-lg font-space-mono"
                      onClick={handleBid}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="neurosync-loader mr-2"></div>
                          <span>SYNCING</span>
                        </div>
                      ) : (
                        <span>PLACE BID</span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Bid history */}
            <div className="neural-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <History className="h-6 w-6 text-neon-purple mr-3" />
                  <h3 className="text-white font-bold uppercase tracking-wider text-xl font-space-mono neural-text-glow">
                    Bid History
                  </h3>
                </div>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 neural-scrollbar">
                {bidHistory.length > 0 ? (
                  bidHistory.map((bid, index) => (
                    <div
                      key={bid.id}
                      className={`neural-box p-4 text-sm flex justify-between items-center ${
                        index === 0 ? "border-matrix-green/30 bg-matrix-green/5" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`font-space-mono ${index === 0 ? "text-matrix-green" : "text-white"}`}>
                          {bid.user}
                        </span>
                        {bid.verified && (
                          <div className="ml-2 verified-badge">
                            <Shield className="h-4 w-4 text-electric-blue" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span
                          className={`font-space-mono ${index === 0 ? "text-matrix-green font-bold" : "text-white"}`}
                        >
                          ${bid.amount.toFixed(2)}
                        </span>
                        <span className="text-neutral-500 ml-3 font-space-mono">{formatTime(bid.timestamp)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-neutral-400 text-sm py-6 font-rajdhani">NO BIDS YET</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Binary code background */}
      <div className="binary-background"></div>
    </div>
  )
}

// Helper functions
function getBidStatusText(status) {
  switch (status) {
    case "upcoming":
      return "SCHEDULED"
    case "active":
      return "ACTIVE"
    case "ended":
      return "CLOSED"
    default:
      return "UNKNOWN"
  }
}

function getBidStatusStyles(status) {
  switch (status) {
    case "upcoming":
      return "bg-electric-blue/20 text-electric-blue border border-electric-blue/50"
    case "active":
      return "bg-matrix-green/20 text-matrix-green border border-matrix-green/50 animate-pulse"
    case "ended":
      return "bg-digital-red/20 text-digital-red border border-digital-red/50"
    default:
      return "bg-neutral-800 text-neutral-400"
  }
}

