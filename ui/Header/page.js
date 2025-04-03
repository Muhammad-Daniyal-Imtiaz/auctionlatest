"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, ShoppingCart, Gavel, Users, X, Palette, Type, Settings } from "lucide-react";

const fonts = [
  { name: "Sans", value: "sans-serif" },
  { name: "Serif", value: "serif" },
  { name: "Mono", value: "monospace" },
  { name: "Geometric", value: "'Agency FB', sans-serif" },
  { name: "Futuristic", value: "'Orbitron', sans-serif" },
  { name: "Elegant", value: "'Playfair Display', serif" },
];

const themes = {
  cyber: {
    class: "bg-gray-950/95 text-cyan-300 border-cyan-400/20",
    glow: "shadow-[0_0_30px_8px_rgba(34,211,238,0.4)]",
    accent: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-500",
    buttonClass: "bg-gradient-to-r from-cyan-400 to-blue-500"
  },
  luxury: {
    class: "bg-zinc-900/95 text-amber-200 border-amber-400/20",
    glow: "shadow-[0_0_30px_8px_rgba(245,158,11,0.4)]",
    accent: "from-amber-400 to-orange-500",
    borderColor: "border-amber-500",
    buttonClass: "bg-gradient-to-r from-amber-400 to-orange-500"
  },
  matrix: {
    class: "bg-black/95 text-emerald-300 border-emerald-400/20",
    glow: "shadow-[0_0_30px_8px_rgba(74,222,128,0.4)]",
    accent: "from-emerald-400 to-green-500",
    borderColor: "border-emerald-500",
    buttonClass: "bg-gradient-to-r from-emerald-400 to-green-500"
  },
  neon: {
    class: "bg-purple-950/95 text-pink-300 border-pink-400/20",
    glow: "shadow-[0_0_30px_8px_rgba(236,72,153,0.4)]",
    accent: "from-purple-400 to-pink-500",
    borderColor: "border-pink-500",
    buttonClass: "bg-gradient-to-r from-purple-400 to-pink-500"
  },
  synth: {
    class: "bg-indigo-950/95 text-violet-300 border-violet-400/20",
    glow: "shadow-[0_0_30px_8px_rgba(139,92,246,0.4)]",
    accent: "from-indigo-400 to-violet-500",
    borderColor: "border-violet-500",
    buttonClass: "bg-gradient-to-r from-indigo-400 to-violet-500"
  }
};

const letterColors = [
  "text-red-400",
  "text-orange-400",
  "text-yellow-400",
  "text-green-400",
  "text-blue-400",
  "text-indigo-400",
  "text-violet-400",
  "text-pink-400"
];

export default function Header() {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedTheme, setSelectedTheme] = useState("cyber");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGlowing, setIsGlowing] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  // Auto-cycling theme colors
  useEffect(() => {
    const themeKeys = Object.keys(themes);
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * themeKeys.length);
      setSelectedTheme(themeKeys[randomIndex]);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Blinking effect for gold outline
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 800);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extreme geometric patterns
  const headerClipPath = "polygon(0 0, 85% 0, 100% 25%, 100% 100%, 15% 100%, 0% 75%)";
  const panelClipPath = "polygon(0 15%, 100% 0, 100% 85%, 0 100%)";
  const buttonClipPath = "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)";

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/market", icon: ShoppingCart, label: "Market" },
    { href: "/auctions", icon: Gavel, label: "Auctions" },
    { href: "/community", icon: Users, label: "Community" }
  ];

  // Render multi-colored letters with more extreme animation
  const renderColoredLetters = (word) => {
    return word.split('').map((letter, index) => (
      <motion.span
        key={index}
        className={`${letterColors[index % letterColors.length]} inline-block`}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 15, -15, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: Math.random() * 3,
          ease: "easeInOut"
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ));
  };

  return (
    <div className="relative">
      {/* Extreme Edged Header with Pulsing Effects */}
      <motion.header
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 ${themes[selectedTheme].class} border-b-4 backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'} ${isGlowing ? 'shadow-[0_0_35px_10px_rgba(255,215,0,0.8)]' : 'shadow-[0_0_15px_3px_rgba(255,215,0,0.4)]'} border-amber-400`}
        style={{
          clipPath: headerClipPath,
          fontFamily: selectedFont.value,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <motion.div
          animate={{
            scale: isPulsing ? [1, 1.03, 1] : 1
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          className="container mx-auto px-6 flex justify-between items-center"
        >
          {/* Extreme Multi-colored Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-1"
          >
            <Link href="/">
              <h1 className="text-5xl font-black tracking-tighter text-center">
                {renderColoredLetters("NEO NEXUS")}
              </h1>
            </Link>
          </motion.div>

          {/* Navigation with extreme effects */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-5 py-3"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-6"
                  >
                    <item.icon className="w-full h-full" />
                  </motion.div>
                  <span className="text-lg font-extrabold">
                    {item.label}
                  </span>
                </Link>
                <div className={`absolute bottom-0 left-0 h-1.5 w-0 ${themes[selectedTheme].buttonClass} transition-all duration-700 group-hover:w-full`} />
              </motion.div>
            ))}
          </nav>

          {/* Extreme Control Button */}
          <motion.button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={`p-4 ${themes[selectedTheme].buttonClass} text-white shadow-xl relative overflow-hidden`}
            style={{ clipPath: buttonClipPath }}
            whileHover={{ scale: 1.15, rotate: [0, 15, -15, 0] }}
            whileTap={{ scale: 0.85 }}
            animate={{
              boxShadow: isMenuOpen
                ? `0 0 25px 5px ${themes[selectedTheme].glow}`
                : `0 0 15px 3px ${themes[selectedTheme].glow}`
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Settings size={24} />}
            <motion.span
              className="absolute inset-0 bg-white/30"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Extreme Vertical Control Panels */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black cursor-pointer"
            />

            {/* Left Panel - Themes */}
            <motion.div
              initial={{ x: -600 }}
              animate={{ x: 0 }}
              exit={{ x: -600 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`fixed left-0 top-24 w-96 h-[85vh] ${themes[selectedTheme].class} border-r-4 backdrop-blur-2xl z-50`}
              style={{
                clipPath: panelClipPath,
                borderColor: themes[selectedTheme].borderColor
              }}
            >
              <div className={`absolute inset-0 border-r-4 ${themes[selectedTheme].glow} transition-all`} />

              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                  >
                    <Palette size={28} />
                  </motion.div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    THEME CYCLER
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto pr-4">
                  {Object.entries(themes).map(([key, theme]) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        setSelectedTheme(key);
                        setIsPulsing(true);
                        setTimeout(() => setIsPulsing(false), 1000);
                      }}
                      className={`p-5 rounded-2xl border-4 ${selectedTheme === key ?
                        `border-[6px] ${themes[key].borderColor}` : 'border-transparent'}
                        hover:border-white/40 transition-all relative overflow-hidden group`}
                      whileHover={{ scale: 1.08, y: -8 }}
                      whileTap={{ scale: 0.92 }}
                      animate={{
                        boxShadow: selectedTheme === key
                          ? `0 0 25px 5px ${themes[key].glow}`
                          : 'none'
                      }}
                    >
                      <div className={`h-24 rounded-xl bg-gradient-to-br ${theme.accent} mb-3`} />
                      <span className="block text-center font-extrabold text-lg">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className={`absolute inset-0 ${themes[key].buttonClass} opacity-0 group-hover:opacity-30 transition-opacity`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Fonts */}
            <motion.div
              initial={{ x: 600 }}
              animate={{ x: 0 }}
              exit={{ x: 600 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`fixed right-0 top-24 w-96 h-[85vh] ${themes[selectedTheme].class} border-l-4 backdrop-blur-2xl z-50`}
              style={{
                clipPath: panelClipPath,
                borderColor: themes[selectedTheme].borderColor
              }}
            >
              <div className={`absolute inset-0 border-l-4 ${themes[selectedTheme].glow} transition-all`} />

              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Type size={28} />
                  </motion.div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    TYPOGRAPHY
                  </h3>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto pr-4">
                  {fonts.map((font) => (
                    <motion.button
                      key={font.value}
                      onClick={() => setSelectedFont(font)}
                      className={`w-full p-5 rounded-xl border-4 ${selectedFont.value === font.value ?
                        `bg-gradient-to-r ${themes[selectedTheme].accent}/30 border-[6px] ${themes[selectedTheme].borderColor}` :
                        'hover:bg-white/10 border-transparent'} transition-all relative overflow-hidden group`}
                      style={{ fontFamily: font.value }}
                      whileHover={{ x: 15, scale: 1.05 }}
                      animate={{
                        boxShadow: selectedFont.value === font.value
                          ? `0 0 15px 3px ${themes[selectedTheme].glow}`
                          : 'none'
                      }}
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-xl font-extrabold">{font.name}</span>
                        <motion.span
                          className="text-sm opacity-80"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Aa
                        </motion.span>
                      </div>
                      <div className={`absolute inset-0 ${themes[selectedTheme].buttonClass} opacity-0 group-hover:opacity-15 transition-opacity`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}