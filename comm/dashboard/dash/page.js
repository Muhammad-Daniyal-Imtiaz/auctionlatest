"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Star,
  Package,
  ArrowUpRight,
  Clock,
  Calendar,
  CreditCard,
  Activity,
  ShoppingCart,
  Sparkles,
  BarChart,
  PieChart,
  LineChart,
  Gift,
  Award,
  Flame,
  Smartphone,
  Headphones,
  Tv,
  Camera,
  Gamepad,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample data
const stats = [
  {
    name: "Total Revenue",
    value: "\$45,231.89",
    icon: DollarSign,
    change: "+20.1%",
    trend: "up",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
  },
  {
    name: "Orders",
    value: "356",
    icon: ShoppingBag,
    change: "+12.2%",
    trend: "up",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
  },
  {
    name: "Customers",
    value: "2,345",
    icon: Users,
    change: "+5.4%",
    trend: "up",
    color: "from-violet-500 to-indigo-500",
    bgColor: "from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40",
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    icon: TrendingUp,
    change: "+1.2%",
    trend: "up",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    date: "2 hours ago",
    amount: "\$125.00",
    status: "Completed",
    items: 3,
    paymentMethod: "Credit Card",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    date: "5 hours ago",
    amount: "\$89.99",
    status: "Processing",
    items: 1,
    paymentMethod: "PayPal",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    date: "Yesterday",
    amount: "\$245.50",
    status: "Completed",
    items: 4,
    paymentMethod: "Credit Card",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "ORD-004",
    customer: "James Rodriguez",
    date: "Yesterday",
    amount: "\$32.99",
    status: "Shipped",
    items: 1,
    paymentMethod: "Credit Card",
    color: "from-blue-500 to-indigo-500",
  },
]

const recommendedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "\$129.99",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    sales: 245,
    stock: 45,
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40",
    icon: Headphones,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "\$199.99",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    sales: 187,
    stock: 32,
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40",
    icon: Smartphone,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "\$79.99",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    sales: 156,
    stock: 18,
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40",
    icon: Tv,
  },
  {
    id: 4,
    name: "Gaming Console",
    price: "\$499.99",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    sales: 98,
    stock: 7,
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40",
    icon: Gamepad,
  },
  {
    id: 5,
    name: "Digital Camera",
    price: "\$349.99",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    sales: 112,
    stock: 23,
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40",
    icon: Camera,
  },
]

const salesData = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2500 },
  { month: "Apr", value: 4000 },
  { month: "May", value: 3500 },
  { month: "Jun", value: 5000 },
  { month: "Jul", value: 4500 },
  { month: "Aug", value: 5500 },
  { month: "Sep", value: 6000 },
  { month: "Oct", value: 5000 },
  { month: "Nov", value: 7000 },
  { month: "Dec", value: 8000 },
]

const maxSalesValue = Math.max(...salesData.map((item) => item.value))

const featuredItems = [
  {
    title: "Summer Sale",
    description: "Up to 50% off on summer essentials",
    icon: Flame,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "New Arrivals",
    description: "Check out our latest products",
    icon: Sparkles,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Limited Edition",
    description: "Exclusive items available now",
    icon: Award,
    color: "from-purple-500 to-pink-500",
  },
  { title: "Gift Cards", description: "Perfect for any occasion", icon: Gift, color: "from-emerald-500 to-teal-500" },
]

const quickStats = [
  { label: "Daily Active Users", value: "1,245", icon: Users, color: "text-blue-500" },
  { label: "New Signups", value: "34", icon: UserPlus, color: "text-green-500" },
  { label: "Bounce Rate", value: "24%", icon: Activity, color: "text-amber-500" },
  { label: "Total Sessions", value: "9,345", icon: LineChart, color: "text-purple-500" },
]

export default function Dashboard() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")
  const [animateStats, setAnimateStats] = useState(false)
  const [animateChart, setAnimateChart] = useState(false)
  const [animateProducts, setAnimateProducts] = useState(false)
  const [animateOrders, setAnimateOrders] = useState(false)
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null)
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const statsRef = useRef(null)
  const chartRef = useRef(null)
  const productsRef = useRef(null)
  const ordersRef = useRef(null)
  const containerRef = useRef(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimateStats(true)
        statsObserver.disconnect()
      }
    }, observerOptions)

    const chartObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimateChart(true)
        chartObserver.disconnect()
      }
    }, observerOptions)

    const productsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimateProducts(true)
        productsObserver.disconnect()
      }
    }, observerOptions)

    const ordersObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimateOrders(true)
        ordersObserver.disconnect()
      }
    }, observerOptions)

    if (statsRef.current) statsObserver.observe(statsRef.current)
    if (chartRef.current) chartObserver.observe(chartRef.current)
    if (productsRef.current) productsObserver.observe(productsRef.current)
    if (ordersRef.current) ordersObserver.observe(ordersRef.current)

    return () => {
      statsObserver.disconnect()
      chartObserver.disconnect()
      productsObserver.disconnect()
      ordersObserver.disconnect()
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".parallax-element")
      elements.forEach((element) => {
        const position = element.getBoundingClientRect()
        const speed = element.getAttribute("data-speed") || 0.1

        // Only apply effect when element is in viewport
        if (position.top < window.innerHeight && position.bottom > 0) {
          const yPos = window.scrollY * speed
          element.style.transform = `translateY(${yPos}px)`
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse move 3D effect
  useEffect(() => {
    const cards = document.querySelectorAll(".card-3d")

    const handleMouseMove = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
    }

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Confetti effect
  const triggerConfetti = () => {
    const confettiContainer = document.getElementById("confetti-container")
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.animationDelay = `${Math.random() * 3}s`
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
      confettiContainer.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-10 w-64 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-80 md:col-span-2 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>

        <Skeleton className="h-96 rounded-xl mt-6" />
      </div>
    )
  }

  return (
    <div className="container mx-auto" ref={containerRef}>
      {/* Confetti container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50"></div>

      {/* Floating 3D elements */}
      <div className="fixed -z-10 top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-blob"></div>
      <div className="fixed -z-10 top-40 right-10 w-72 h-72 bg-gradient-to-br from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="fixed -z-10 bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-300/10 to-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Welcome section with quick stats */}
      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
          </motion.div>
          <motion.div
            className="mt-4 md:mt-0 flex space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-indigo-500/30 rounded-xl transform transition-transform hover:scale-105"
                    onClick={triggerConfetti}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    View Store
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit your online store</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transform transition-transform hover:scale-105 gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Select Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </motion.div>
        </div>

        {/* Featured Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card className="card-3d border-none shadow-xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}></div>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 shadow-lg`}
                        >
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-center text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>

        <div ref={statsRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={animateStats ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`card-3d overflow-hidden border-none shadow-xl rounded-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br ${stat.bgColor}`}
                style={{ perspective: "1000px" }}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${stat.color}`}></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg transform hover:scale-110 transition-transform hover:rotate-3 relative`}
                    style={{
                      boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 2px rgba(255, 255, 255, 0.2) inset`,
                    }}
                  >
                    <stat.icon className="h-6 w-6" />
                    {/* 3D effect elements */}
                    <div className="absolute inset-0 rounded-xl bg-black opacity-20 blur-sm -bottom-1 -right-1 z-[-1]"></div>
                    <div className="absolute inset-0 rounded-xl bg-white opacity-30 top-0.5 left-0.5 z-[-1]"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="flex items-center pt-1 text-xs">
                    <span
                      className={
                        stat.trend === "up" ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"
                      }
                    >
                      {stat.change} <ArrowUpRight className="ml-1 h-3 w-3" />
                    </span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main dashboard content */}
      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-300 data-[state=active]:scale-105"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-300 data-[state=active]:scale-105"
          >
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-300 data-[state=active]:scale-105"
          >
            <FileTextIcon className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-300 data-[state=active]:scale-105"
          >
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Sales chart and top products */}
          <div ref={chartRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales chart */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={animateChart ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="card-3d border-none shadow-xl rounded-xl transform transition-all duration-700 hover:shadow-2xl"
                style={{ perspective: "1000px" }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Sales Overview
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs rounded-lg px-3 py-1 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        This Year
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="flex items-end justify-between h-[250px] gap-2">
                      {salesData.map((item, index) => (
                        <div
                          key={item.month}
                          className="flex flex-col items-center flex-1"
                          onMouseEnter={() => setHoveredBarIndex(index)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                          <motion.div
                            className="w-full relative cursor-pointer group"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: animateChart ? 1 : 0 }}
                            transition={{
                              duration: 1,
                              delay: index * 0.05,
                              ease: "easeOut",
                            }}
                            style={{
                              height: `${(item.value / maxSalesValue) * 100}%`,
                              transformOrigin: "bottom",
                            }}
                          >
                            {/* 3D Bar with gradient and glow effect */}
                            <motion.div
                              className={`absolute inset-0 rounded-t-lg transition-all duration-300 ${
                                hoveredBarIndex === index
                                  ? "bg-gradient-to-t from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/50"
                                  : "bg-gradient-to-t from-indigo-500/80 to-purple-500/80"
                              }`}
                              whileHover={{
                                scaleY: 1.05,
                                y: -2,
                              }}
                              style={{
                                transformOrigin: "bottom",
                              }}
                            >
                              {/* 3D effect elements */}
                              <div className="absolute inset-0 rounded-t-lg bg-white opacity-20 top-0.5 left-0.5"></div>
                              <div className="absolute inset-0 rounded-t-lg bg-black opacity-20 bottom-0.5 right-0.5"></div>
                            </motion.div>

                            {/* Value tooltip */}
                            <motion.div
                              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl z-10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{
                                opacity: hoveredBarIndex === index ? 1 : 0,
                                y: hoveredBarIndex === index ? 0 : 10,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="font-bold">${item.value.toLocaleString()}</div>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-slate-800"></div>
                            </motion.div>
                          </motion.div>
                          <div className="text-xs mt-2 text-muted-foreground font-medium">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateChart ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card
                className="card-3d border-none shadow-xl rounded-xl transform transition-all duration-700 hover:shadow-2xl"
                style={{ perspective: "1000px" }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                      Top Products
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 rounded-lg group">
                      View all <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <CardDescription>Best selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-5">
                      {recommendedProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          className="flex items-start gap-3 transform transition-all duration-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl cursor-pointer group"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: animateChart ? 1 : 0,
                            x: animateChart ? 0 : 20,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.3,
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div
                            className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg transform group-hover:scale-105 transition-transform relative"
                            style={{ perspective: "1000px" }}
                          >
                            {/* 3D product image with gradient overlay */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-30 mix-blend-overlay`}
                            ></div>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                            {/* 3D effect elements */}
                            <div className="absolute inset-0 bg-black opacity-20 blur-sm -bottom-1 -right-1 z-[-1]"></div>
                            <div className="absolute inset-0 bg-white opacity-30 top-0.5 left-0.5 z-[-1]"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm font-semibold">{product.price}</span>
                              <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                              <div className="flex items-center text-amber-500">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="text-xs ml-1">{product.rating}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <CustomProgress
                                value={product.stock}
                                max={100}
                                className="h-1.5 bg-slate-200 dark:bg-slate-700"
                                indicatorClassName={`bg-gradient-to-r ${product.color}`}
                              />
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                                <span className="text-xs text-muted-foreground">{product.sales} sold</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent orders */}
          <div ref={ordersRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateOrders ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="card-3d border-none shadow-xl rounded-xl transform transition-all duration-700 hover:shadow-2xl"
                style={{ perspective: "1000px" }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Recent Orders
                    </CardTitle>
                    <Link href="/dashboard/orders">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 rounded-lg border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 group"
                      >
                        View all <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>You have {recentOrders.length} orders today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: animateOrders ? 1 : 0,
                          y: animateOrders ? 0 : 20,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow:
                            theme === "dark"
                              ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-lg transform hover:scale-110 transition-transform">
                              <AvatarFallback className={`bg-gradient-to-br ${order.color} text-white`}>
                                {order.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {/* 3D effect elements */}
                            <div className="absolute inset-0 rounded-full bg-black opacity-20 blur-sm -bottom-1 -right-1 z-[-1]"></div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{order.customer}</p>
                              <Badge
                                variant={
                                  order.status === "Completed"
                                    ? "default"
                                    : order.status === "Processing"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={`text-xs ${
                                  order.status === "Completed"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                                    : order.status === "Processing"
                                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                                      : order.status === "Shipped"
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                        : ""
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Package className="mr-1 h-3 w-3" />
                                {order.items} {order.items === 1 ? "item" : "items"}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {order.date}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <CreditCard className="mr-1 h-3 w-3" />
                                {order.paymentMethod}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-14 sm:ml-0">
                          <div className="text-base font-bold">{order.amount}</div>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-lg border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transform transition-transform hover:scale-105"
                              >
                                Details
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="flex justify-between space-x-4">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">Order #{order.id}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Placed on {new Date().toLocaleDateString()}
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <span
                                      className={`w-2 h-2 rounded-full mr-2 ${
                                        order.status === "Completed"
                                          ? "bg-emerald-500"
                                          : order.status === "Processing"
                                            ? "bg-amber-500"
                                            : order.status === "Shipped"
                                              ? "bg-blue-500"
                                              : "bg-red-500"
                                      }`}
                                    ></span>
                                    <span className="text-xs font-medium">{order.status}</span>
                                  </div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-none shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Analytics
              </CardTitle>
              <CardDescription>View detailed analytics of your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <BarChart className="h-12 w-12 text-white" />
                  </motion.div>
                  <p className="text-muted-foreground">Analytics charts will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="border-none shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Reports
              </CardTitle>
              <CardDescription>Download and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <PieChart className="h-12 w-12 text-white" />
                  </motion.div>
                  <p className="text-muted-foreground">Reports will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Notifications
              </CardTitle>
              <CardDescription>Manage your notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-orders">New Orders</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                  </div>
                  <Switch id="new-orders" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="low-stock">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                  </div>
                  <Switch id="low-stock" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="customer-messages">Customer Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new customer messages</p>
                  </div>
                  <Switch id="customer-messages" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-updates">Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about marketing campaigns</p>
                  </div>
                  <Switch id="marketing-updates" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Custom Progress Component
const CustomProgress = ({ value, max, className, indicatorClassName }) => {
  const progressPercentage = (value / max) * 100;

  return (
    <div className={className}>
      <div
        className={`h-full ${indicatorClassName}`}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

// Missing icon components
function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function UserPlus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}
