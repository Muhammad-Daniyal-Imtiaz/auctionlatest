'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Toaster as Sonner } from "sonner";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Import the additional components
import AnalyticsPage from "../analytics/page";
import CustomersPage from "../customers/page";
import OrdersPage from "../orders/page";
import Dashboard from "../dash/page";
import SettingsPage from "../settings/page";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

const navigation = [
  { name: "Dashboard", href: "/comm/dashboard/dash", icon: Home, color: "from-violet-500 to-indigo-500" },
  { name: "Orders", href: "/comm/dashboard/orders", icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
  { name: "Customers", href: "/comm/dashboard/customers", icon: Users, color: "from-orange-500 to-amber-500" },
  { name: "Analytics", href: "/comm/dashboard/analytics", icon: BarChart3, color: "from-pink-500 to-rose-500" },
  { name: "Settings", href: "/comm/dashboard/settings", icon: Settings, color: "from-slate-500 to-gray-500" },
];

export default function ClientLayout() {
  const pathname = usePathname();
  const { theme = "system" } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollTop = mainRef.current.scrollTop;
        setScrolled(scrollTop > 20);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLogout = () => {
    toast.success("Logging out", {
      description: "You have been logged out successfully",
    });
  };

  // Render the appropriate component based on the route
  const renderComponent = () => {
    switch (pathname) {
      case "/comm/dashboard/dash":
        return <Dashboard />;
      case "/comm/dashboard/orders":
        return <OrdersPage />;
      case "/comm/dashboard/customers":
        return <CustomersPage />;
      case "/comm/dashboard/analytics":
        return <AnalyticsPage />;
      case "/comm/dashboard/settings":
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <Toaster />
          <div className="flex flex-col w-72 flex-shrink-0 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-20">
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
                  const isActive = pathname === item.href;
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
                  );
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

          <div className="flex flex-col flex-1 overflow-hidden">
            <div
              className={cn(
                "flex md:hidden h-20 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 items-center justify-between px-6 transition-all duration-300",
                scrolled ? "shadow-md" : "shadow-sm",
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
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end" className="w-80 rounded-xl p-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                      <DropdownMenu.Label className="text-lg font-bold">Notifications</DropdownMenu.Label>
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
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
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
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end" className="w-56 rounded-xl p-0 overflow-hidden">
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
                      <DropdownMenu.Item className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                        <CreditCardIcon className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        className="rounded-lg cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 focus:bg-rose-50 dark:focus:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenu.Item>
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </div>
            <main
              ref={mainRef}
              className="flex-1 relative overflow-y-auto focus:outline-none pt-16 md:pt-0 scroll-smooth"
            >
              <div className="py-6 px-4 md:px-6">{renderComponent()}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
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
  );
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
  );
}
