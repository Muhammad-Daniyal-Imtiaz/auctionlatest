# Next.js Implementation Guide

Here's how to implement these components in a Next.js application using the App Router.

## Directory Structure Example

```
app/
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── avatar.jsx
│       ├── ...other shadcn components
├── layout.jsx
├── page.jsx
├── dashboard/
│   └── page.jsx
├── products/
│   └── page.jsx
├── orders/
│   └── page.jsx
├── ...other routes
```

## Implementation Steps

### 1. Set up the root layout (app/layout.jsx)

```jsx
import './globals.css'
import RootLayout from '../path/to/nextjs-ecommerce-ui/RootLayout'
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopcove - E-commerce Dashboard',
  description: 'Modern e-commerce platform dashboard',
}
 
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  )
}
```

### 2. Create the home page (app/page.jsx)

```jsx
import HomePage from '../path/to/nextjs-ecommerce-ui/HomePage'
 
export default function Home() {
  return <HomePage />
}
```

### 3. Create the dashboard page (app/dashboard/page.jsx)

```jsx
import DashboardPage from '../../path/to/nextjs-ecommerce-ui/DashboardPage'
 
export default function Dashboard() {
  return <DashboardPage />
}
```

### 4. Set up Tailwind CSS (tailwind.config.js)

Make sure your Tailwind configuration includes the necessary paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './path/to/nextjs-ecommerce-ui/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 5. globals.css

Ensure your globals.css includes the necessary variables for shadcn/ui:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Creating Additional Pages

For other routes defined in your sidebar, create corresponding pages:

### Products Page (app/products/page.jsx)

```jsx
export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Products
        </h1>
        <p className="text-muted-foreground">
          Manage your product inventory
        </p>
      </div>
      
      {/* Add your product management components here */}
      <div className="bg-white rounded-lg shadow p-6">
        <p>Product management content goes here</p>
      </div>
    </div>
  )
}
```

### Orders Page (app/orders/page.jsx)

```jsx
export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Orders
        </h1>
        <p className="text-muted-foreground">
          Track and manage customer orders
        </p>
      </div>
      
      {/* Add your order management components here */}
      <div className="bg-white rounded-lg shadow p-6">
        <p>Order management content goes here</p>
      </div>
    </div>
  )
}
```

## Making It Dynamic

To connect these UI components to real data, you'd typically:

1. Use React's `useState` and `useEffect` to manage component state
2. Create API routes in Next.js (pages/api/* or app/api/*)
3. Use `fetch` or a library like Axios to retrieve data in your page components
4. Replace the mock data with real data from your API calls

Example of fetching real data:

```jsx
"use client"

import { useState, useEffect } from 'react'
import HomePage from '../path/to/nextjs-ecommerce-ui/HomePage'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/user-dashboard')
        const data = await res.json()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (isLoading) return <LoadingSpinner />
  
  return <HomePage userData={userData} />
}
```

Then modify the HomePage component to accept props:

```jsx
export default function HomePage({ userData }) {
  // Use userData instead of the mock data
  // ...
}
```