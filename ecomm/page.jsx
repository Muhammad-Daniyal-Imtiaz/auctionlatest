"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import HomePage from "./Homepage.jsx"; // Ensure the correct path
import DashboardPage from "./DashboardPage.jsx"; // Ensure the correct path
import UserManagement from "./User/page.js";
import OrderManagement from "./orders/page.js";
import ProductStatsDashboard from "./Analytics/page.js";

const navItems = [
  { title: "Home", icon: "ri-home-line" },
  { title: "Dashboard", icon: "ri-dashboard-line" },
  { title: "Products", icon: "ri-shopping-bag-line", badge: "New" },
  { title: "Orders", icon: "ri-file-list-line" },
  { title: "Customers", icon: "ri-user-line" },
  { title: "Analytics", icon: "ri-line-chart-line" },
  { title: "Marketing", icon: "ri-megaphone-line" },
  { title: "Settings", icon: "ri-settings-line" },
];

export default function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <HomePage />;
      case "Dashboard":
        return <DashboardPage />;

        case "Customers":
        return <UserManagement/>

        case "Orders":
          return <OrderManagement/>

          case "Analytics":
          return <ProductStatsDashboard/>
          

      // Add cases for other components as needed
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-900 to-blue-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-blue-800/50">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-2">
                <i className="ri-shopping-cart-2-line text-lg"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Shopcove</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-800/50 rounded-full"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <i className="ri-close-line text-lg"></i>
            </Button>
          </div>

          <div className="p-4 border-b border-blue-800/50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-blue-500">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">Jessica Wilson</p>
                <p className="text-xs text-gray-300">Premium Member</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="px-3 space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveComponent(item.title)}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer relative ${
                    activeComponent === item.title
                      ? "bg-blue-800/70 text-white"
                      : "text-gray-300 hover:bg-blue-800/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} text-lg mr-3`}></i>
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-blue-800/50">
            <div className="bg-blue-800/70 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-gray-300 mb-3">
                <i className="ri-customer-service-line text-lg"></i>
                <span className="font-medium">Need help?</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Our support team is ready to assist you with any questions.
              </p>
              <Button size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-100">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar for desktop */}
      <aside
        className={`hidden lg:block h-screen bg-gradient-to-b from-indigo-900 to-blue-900 text-white transition-all duration-300 flex-shrink-0 shadow-xl ${
          isSidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center p-4 border-b border-blue-800/50 ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}>
            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "space-x-2"}`}>
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-2">
                <i className="ri-shopping-cart-2-line text-lg"></i>
              </div>
              {!isSidebarCollapsed && (
                <span className="text-xl font-bold tracking-tight text-white">Shopcove</span>
              )}
            </div>
            {!isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-800/50 rounded-full"
                onClick={() => setIsSidebarCollapsed(true)}
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </Button>
            )}
            {isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-20 text-white bg-blue-700 hover:bg-blue-800 rounded-full shadow-md"
                onClick={() => setIsSidebarCollapsed(false)}
              >
                <i className="ri-arrow-right-s-line text-lg"></i>
              </Button>
            )}
          </div>

          {!isSidebarCollapsed && (
            <div className="p-4 border-b border-blue-800/50">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-blue-500">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">Jessica Wilson</p>
                  <p className="text-xs text-gray-300">Premium Member</p>
                </div>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 py-4">
            <nav className={`space-y-1 ${isSidebarCollapsed ? "px-2" : "px-3"}`}>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveComponent(item.title)}
                  className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer relative ${
                    activeComponent === item.title
                      ? "bg-blue-800/70 text-white"
                      : "text-gray-300 hover:bg-blue-800/50 hover:text-white"
                  } ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
                  title={isSidebarCollapsed ? item.title : ""}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? "flex-col" : ""}`}>
                    <i className={`${item.icon} text-lg ${isSidebarCollapsed ? "mb-1" : "mr-3"}`}></i>
                    {!isSidebarCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isSidebarCollapsed && item.badge && (
                    <Badge className="absolute -top-1 -right-1 text-xs h-5 min-w-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-1 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {!isSidebarCollapsed && (
            <div className="p-4 border-t border-blue-800/50">
              <div className="bg-blue-800/70 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-gray-300 mb-3">
                  <i className="ri-customer-service-line text-lg"></i>
                  <span className="font-medium">Need help?</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Our support team is ready to assist you with any questions.
                </p>
                <Button size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-100">
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 w-full">
          <div className="flex h-16 items-center px-4 sm:px-6 w-full">
            <div className="flex items-center flex-1 w-full">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 lg:hidden text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <i className="ri-menu-line text-lg"></i>
              </Button>

              <nav className="hidden md:flex space-x-4 w-full">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`text-slate-600 hover:bg-slate-100 hover:text-slate-900 ${
                      activeComponent === item.title ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveComponent(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative">
                <i className="ri-notification-3-line text-lg"></i>
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">3</span>
              </Button>

              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative">
                <i className="ri-mail-line text-lg"></i>
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center px-1">2</span>
              </Button>

              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <i className="ri-apps-line text-lg"></i>
              </Button>

              <div className="border-l border-slate-200 h-8 mx-2"></div>

              <div className="flex items-center">
                <Avatar className="h-8 w-8 border border-slate-200">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-slate-50 w-full">
          <div className="mx-auto max-w-7xl w-full">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}
