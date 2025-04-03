"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Cpu,
  Waves,
  Zap,
  Lock,
  Brain,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Sparkles,
  Wifi,
  Battery,
  Music,
} from "lucide-react"

export default function ProductDescription({ product }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const galleryRef = useRef(null)

  // Close gallery when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (galleryRef.current && !galleryRef.current.contains(event.target)) {
        setIsGalleryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Sample images for the gallery
  const images = [
    product?.mainImage || "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400&text=Side+View",
    "/placeholder.svg?height=400&width=400&text=Top+View",
    "/placeholder.svg?height=400&width=400&text=Detail+View",
  ]

  // Features with icons and colors
  const features = [
    { icon: <Waves className="h-4 w-4" />, text: "Quantum Noise Cancellation", color: "from-cyan-500 to-blue-600" },
    { icon: <Brain className="h-4 w-4" />, text: "Neural Interface", color: "from-purple-500 to-pink-600" },
    { icon: <Lock className="h-4 w-4" />, text: "Military-grade Encryption", color: "from-red-500 to-orange-600" },
    { icon: <Cpu className="h-4 w-4" />, text: "Adaptive Processing", color: "from-green-500 to-emerald-600" },
    { icon: <Wifi className="h-4 w-4" />, text: "Quantum Link 3.0", color: "from-blue-500 to-indigo-600" },
    { icon: <Battery className="h-4 w-4" />, text: "500mAh Fusion Cell", color: "from-yellow-500 to-amber-600" },
  ]

  return (
    <div className="neural-card p-6 relative overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-electric-blue to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-neon-purple to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image Gallery */}
        <div className="relative" ref={galleryRef}>
          <div
            className={`relative ${isImageExpanded ? "h-96" : "h-64"} w-full transition-all duration-500 cursor-pointer overflow-hidden rounded-2xl`}
            onClick={() => setIsImageExpanded(!isImageExpanded)}
          >
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt="NeuroSonic X7 Headphones"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/10 to-neon-purple/10 mix-blend-overlay holographic"></div>

            {/* Tech scan lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-px bg-electric-blue/20"
                  style={{
                    top: `${i * 10 + 5}%`,
                    animationName: "scan-line",
                    animationDuration: "2s",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Expand/collapse button */}
            <div className="absolute top-3 right-3 bg-matte-black/70 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {isImageExpanded ? (
                <Minimize2 className="h-5 w-5 text-electric-blue" />
              ) : (
                <Maximize2 className="h-5 w-5 text-electric-blue" />
              )}
            </div>

            {/* Product ID tag */}
            <div className="absolute bottom-3 left-3 bg-matte-black/70 px-2 py-1 rounded-md text-xs font-space-mono text-electric-blue">
              NRX-{Math.floor(Math.random() * 10000)}
            </div>

            {/* Sparkle effect */}
            <div className="absolute top-2 left-2">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Gallery dropdown button */}
          <div
            className="mt-3 neural-box p-2 flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-900/50 to-purple-900/50 hover:from-blue-800/50 hover:to-purple-800/50 transition-colors"
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
          >
            <span className="text-white font-space-mono text-sm">VIEW GALLERY</span>
            {isGalleryOpen ? (
              <ChevronUp className="h-4 w-4 text-electric-blue" />
            ) : (
              <ChevronDown className="h-4 w-4 text-electric-blue" />
            )}
          </div>

          {/* Gallery dropdown */}
          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-matte-black border border-electric-blue/30 rounded-2xl overflow-hidden shadow-lg shadow-electric-blue/20"
              >
                <div className="grid grid-cols-2 gap-2 p-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-24 cursor-pointer overflow-hidden rounded-lg ${selectedImage === index ? "ring-2 ring-electric-blue" : "opacity-70 hover:opacity-100"}`}
                      onClick={() => {
                        setSelectedImage(index)
                        setIsGalleryOpen(false)
                      }}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Description */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full mr-2"></div>
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple font-space-mono tracking-wider">
              NEUROSONIC X7
            </h3>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-neutral-300 font-rajdhani leading-relaxed"
          >
            Advanced neural-interface headphones with quantum noise cancellation. Features direct neural input, adaptive
            sound processing, and military-grade encryption for your audio data.
          </motion.p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`neural-box p-3 flex items-center gap-2 group/feature hover:border-electric-blue/50 transition-all duration-300 bg-gradient-to-br ${feature.color} bg-opacity-10 hover:bg-opacity-20`}
              >
                <div className="text-white group-hover/feature:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <span className="text-sm text-white font-rajdhani">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech specs */}
          <div
            className="mt-4 cursor-pointer neural-box p-3 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 hover:from-indigo-900/50 hover:to-purple-900/50 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm text-yellow-400 font-space-mono">TECH_DETAILS</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-yellow-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pl-6 space-y-2 overflow-hidden"
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">PROCESSOR</span>
                    <span className="text-cyan-400 font-space-mono">NeuraTech X2</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">FREQUENCY</span>
                    <span className="text-green-400 font-space-mono">5Hz - 40kHz</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">BATTERY</span>
                    <span className="text-amber-400 font-space-mono">500mAh Fusion Cell</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">PROTECTION</span>
                    <span className="text-red-400 font-space-mono">EMP Shielded</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Audio spectrum visualization */}
          <div className="neural-box p-3 mt-4 bg-gradient-to-r from-green-900/30 to-teal-900/30">
            <div className="flex items-center mb-2">
              <Music className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm text-green-400 font-space-mono">AUDIO_SPECTRUM</span>
            </div>
            <div className="h-8 flex items-end justify-between gap-0.5">
              {[...Array(24)].map((_, i) => {
                const height = Math.sin((i + 1) * 0.3) * 100
                return (
                  <div
                    key={i}
                    className="w-full bg-gradient-to-t from-green-500 to-cyan-400"
                    style={{
                      height: `${Math.abs(height) + 20}%`,
                      animationName: "equalizer",
                      animationDuration: `${1 + Math.random() * 2}s`,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationDirection: "alternate",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                )
              })}
            </div>
          </div>

          {/* Security badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="neural-box p-2 inline-flex items-center bg-gradient-to-r from-green-900/30 to-emerald-900/30">
              <Shield className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-xs text-green-400 font-space-mono">SECURE</span>
            </div>
            <div className="neural-box p-2 inline-flex items-center bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
              <Wifi className="h-4 w-4 text-cyan-400 mr-2" />
              <span className="text-xs text-cyan-400 font-space-mono">QUANTUM_LINK</span>
            </div>
            <div className="neural-box p-2 inline-flex items-center bg-gradient-to-r from-purple-900/30 to-pink-900/30">
              <Brain className="h-4 w-4 text-pink-400 mr-2" />
              <span className="text-xs text-pink-400 font-space-mono">NEURAL_SYNC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Binary code background */}
      <div className="absolute bottom-0 right-0 text-[6px] text-electric-blue/5 font-mono leading-tight opacity-30 pointer-events-none">
        {Array(5)
          .fill()
          .map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              {Array(20)
                .fill()
                .map((_, j) => (
                  <span key={j}>{Math.round(Math.random())}</span>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

