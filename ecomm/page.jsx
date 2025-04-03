"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import HomePage from "./Homepage.jsx.js";
import DashboardPage from "./DashboardPage.jsx";


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
      // Add cases for other components as needed
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'none',
          }}
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <aside
        style={{
          position: 'fixed',
          inset: '0 auto 0 0',
          width: '18rem',
          background: 'linear-gradient(to bottom, #6366f1, #4361ee)',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transform: isMobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'linear-gradient(to right, #805ad5, #6b72ef)', padding: '0.5rem', borderRadius: '50%' }}>
                <i className="ri-shopping-cart-2-line" style={{ fontSize: '1.25rem' }}></i>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Shopcove</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              style={{ color: 'white', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <i className="ri-close-line" style={{ fontSize: '1.25rem' }}></i>
            </Button>
          </div>

          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Avatar style={{ height: '2.5rem', width: '2.5rem', border: '2px solid #805ad5' }}>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <div>
                <p style={{ fontWeight: 'bold' }}>Jessica Wilson</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Premium Member</p>
              </div>
            </div>
          </div>

          <ScrollArea style={{ flex: 1, padding: '1rem' }}>
            <nav style={{ space: '1rem 0' }}>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveComponent(item.title)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    cursor: 'pointer',
                    background: activeComponent === item.title ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: activeComponent === item.title ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '0.5rem',
                    transition: 'background 0.3s, color 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className={item.icon} style={{ fontSize: '1.25rem' }}></i>
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge style={{ background: '#805ad5', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ background: 'rgba(128, 90, 213, 0.7)', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.75rem' }}>
                <i className="ri-customer-service-line" style={{ fontSize: '1.25rem' }}></i>
                <span style={{ fontWeight: 'bold' }}>Need help?</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.75rem' }}>
                Our support team is ready to assist you with any questions.
              </p>
              <Button size="sm" style={{ width: '100%', background: 'white', color: '#4361ee', borderRadius: '0.5rem' }}>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar for desktop */}
      <aside
        style={{
          display: 'none',
          position: 'fixed',
          inset: '0 auto 0 0',
          background: 'linear-gradient(to bottom, #6366f1, #4361ee)',
          color: 'white',
          transition: 'width 0.3s ease-in-out',
          width: isSidebarCollapsed ? '5rem' : '18rem',
          zIndex: 50,
          height: '100%',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'linear-gradient(to right, #805ad5, #6b72ef)', padding: '0.5rem', borderRadius: '50%' }}>
                <i className="ri-shopping-cart-2-line" style={{ fontSize: '1.25rem' }}></i>
              </div>
              {!isSidebarCollapsed && <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Shopcove</span>}
            </div>
            {!isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                style={{ color: 'white', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={() => setIsSidebarCollapsed(true)}
              >
                <i className="ri-arrow-left-s-line" style={{ fontSize: '1.25rem' }}></i>
              </Button>
            )}
            {isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                style={{ position: 'absolute', right: '-0.75rem', top: '3rem', color: 'white', background: '#4361ee', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                onClick={() => setIsSidebarCollapsed(false)}
              >
                <i className="ri-arrow-right-s-line" style={{ fontSize: '1.25rem' }}></i>
              </Button>
            )}
          </div>

          {!isSidebarCollapsed && (
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Avatar style={{ height: '2.5rem', width: '2.5rem', border: '2px solid #805ad5' }}>
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Jessica Wilson</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Premium Member</p>
                </div>
              </div>
            </div>
          )}

          <ScrollArea style={{ flex: 1, padding: '1rem' }}>
            <nav style={{ space: '1rem 0' }}>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveComponent(item.title)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    cursor: 'pointer',
                    background: activeComponent === item.title ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: activeComponent === item.title ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '0.5rem',
                    transition: 'background 0.3s, color 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className={item.icon} style={{ fontSize: '1.25rem' }}></i>
                    {!isSidebarCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <Badge style={{ background: '#805ad5', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                      {item.badge}
                    </Badge>
                  )}
                  {isSidebarCollapsed && item.badge && (
                    <Badge style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', background: '#805ad5', color: 'white', fontSize: '0.75rem', padding: '0.25rem', borderRadius: '50%' }}>
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {!isSidebarCollapsed && (
            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ background: 'rgba(128, 90, 213, 0.7)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.75rem' }}>
                  <i className="ri-customer-service-line" style={{ fontSize: '1.25rem' }}></i>
                  <span style={{ fontWeight: 'bold' }}>Need help?</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.75rem' }}>
                  Our support team is ready to assist you with any questions.
                </p>
                <Button size="sm" style={{ width: '100%', background: 'white', color: '#4361ee', borderRadius: '0.5rem' }}>
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', position: 'sticky', top: 0, zIndex: 10, padding: '0.5rem 1rem' }}>
          <div style={{ display: 'flex', height: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Button
                variant="ghost"
                size="icon"
                style={{ display: 'none', color: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.05)' }}
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <i className="ri-menu-line" style={{ fontSize: '1.5rem' }}></i>
              </Button>

              <div style={{ display: 'flex', alignItems: 'center', borderRadius: '0.5rem', background: 'rgba(0, 0, 0, 0.05)', padding: '0.5rem', gap: '0.5rem' }}>
                <i className="ri-search-line" style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }}></i>
                <input
                  type="text"
                  placeholder="Search..."
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.8)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Button variant="ghost" size="icon" style={{ color: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.05)', position: 'relative' }}>
                <i className="ri-notification-3-line" style={{ fontSize: '1.5rem' }}></i>
                <span style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', background: 'red', color: 'white', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '50%' }}>3</span>
              </Button>

              <Button variant="ghost" size="icon" style={{ color: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.05)', position: 'relative' }}>
                <i className="ri-mail-line" style={{ fontSize: '1.5rem' }}></i>
                <span style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', background: 'blue', color: 'white', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '50%' }}>2</span>
              </Button>

              <Button variant="ghost" size="icon" style={{ color: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.05)' }}>
                <i className="ri-apps-line" style={{ fontSize: '1.5rem' }}></i>
              </Button>

              <div style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.1)', height: '2rem', margin: '0 1rem' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Avatar style={{ height: '2rem', width: '2rem', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: 'auto', width: '100%' }}>
          <div style={{ maxWidth: '100%', width: '100%', padding: '1rem 2rem' }}>
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}
