"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Package, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, color: "from-violet-500 to-indigo-500" },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
  { name: "Products", href: "/dashboard/products", icon: Package, color: "from-emerald-500 to-teal-500" },
  { name: "Customers", href: "/dashboard/customers", icon: Users, color: "from-orange-500 to-amber-500" },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "from-pink-500 to-rose-500" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, color: "from-slate-500 to-gray-500" },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mainRef = useRef(null)

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollTop = mainRef.current.scrollTop
        setScrolled(scrollTop > 20)
      }
    }

    const mainElement = mainRef.current
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll)
      return () => mainElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-slate-900 shadow-xl rounded-r-3xl overflow-hidden">
          <div className="flex items-center h-20 flex-shrink-0 px-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-transform">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShopDash
              </span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden",
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-${item.color.split("-")[1]}/30`
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <div
                      className={cn(
                        "mr-3 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-white/20 text-white"
                          : `text-slate-600 dark:text-slate-300 group-hover:bg-gradient-to-r group-hover:${item.color} group-hover:text-white group-hover:shadow-md`,
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 flex justify-end items-center pr-4">
                        <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></div>
                      </div>
                    )}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 m-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-16 px-4 bg-white dark:bg-slate-900 transition-all duration-300",
          scrolled ? "shadow-md" : "shadow-sm",
        )}
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-lg text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="ml-4 flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopDash
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="relative rounded-lg text-slate-600 dark:text-slate-300"
          >
            <Search className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-lg text-slate-600 dark:text-slate-300">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <DropdownMenuLabel className="text-lg font-bold">Notifications</DropdownMenuLabel>
                <p className="text-sm text-white/80">You have 3 unread notifications</p>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors mb-1">
                  <div className="font-medium">New order received</div>
                  <div className="text-sm text-muted-foreground">Order #ORD-001 from Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
                <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors mb-1">
                  <div className="font-medium">Low stock alert</div>
                  <div className="text-sm text-muted-foreground">Wireless Headphones (5 items left)</div>
                  <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                </div>
              </div>
              <div className="p-3 border-t">
                <Button variant="outline" size="sm" className="w-full rounded-lg">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="h-8 w-8 border-2 border-white shadow-md">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-10 p-2 bg-white dark:bg-slate-900 border-b border-border shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 pr-4 rounded-lg border-slate-200 dark:border-slate-700"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-slate-900 pt-16 shadow-xl transition-all duration-300 ease-in-out animate-in slide-in-from-left">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 relative overflow-hidden",
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-${item.color.split("-")[1]}/30`
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <div
                      className={cn(
                        "mr-3 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-white/20 text-white"
                          : `text-slate-600 dark:text-slate-300 group-hover:bg-gradient-to-r group-hover:${item.color} group-hover:text-white group-hover:shadow-md`,
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 flex justify-end items-center pr-4">
                        <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></div>
                      </div>
                    )}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 m-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Desktop header */}
        <div
          className={cn(
            "hidden md:flex md:h-20 md:border-b md:border-slate-200 dark:md:border-slate-700 md:bg-white dark:md:bg-slate-900 md:items-center md:justify-between md:px-6 transition-all duration-300",
            scrolled ? "md:shadow-md" : "md:shadow-sm",
          )}
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products, customers, orders..."
              className="pl-9 pr-4 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-xl p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <DropdownMenuLabel className="text-lg font-bold">Notifications</DropdownMenuLabel>
                  <p className="text-sm text-white/80">You have 3 unread notifications</p>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2">
                  <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors mb-1">
                    <div className="font-medium">New order received</div>
                    <div className="text-sm text-muted-foreground">Order #ORD-001 from Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                  </div>
                  <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors mb-1">
                    <div className="font-medium">Low stock alert</div>
                    <div className="text-sm text-muted-foreground">Wireless Headphones (5 items left)</div>
                    <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                  </div>
                  <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
                    <div className="font-medium">Payment received</div>
                    <div className="text-sm text-muted-foreground">$245.50 for Order #ORD-003</div>
                    <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                  </div>
                </div>
                <div className="p-3 border-t">
                  <Button variant="outline" size="sm" className="w-full rounded-lg">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Avatar className="h-8 w-8 border-2 border-white shadow-md">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="bg-white/20 text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">John Doe</p>
                      <p className="text-sm text-white/80">Admin</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-lg cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 focus:bg-rose-50 dark:focus:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <main ref={mainRef} className="flex-1 relative overflow-y-auto focus:outline-none pt-16 md:pt-0 scroll-smooth">
          <div className="py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

// Missing icon components
function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

