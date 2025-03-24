# E-commerce UI Components for Next.js

This folder contains ready-to-use e-commerce UI components for your Next.js application. These components are built with shadcn/ui and Tailwind CSS.

## Components Overview

1. **HomePage.jsx** - A user-facing home page with:
   - User profile section
   - Order statistics
   - Purchase history
   - Favorites/Wishlist
   - Rewards program information
   - Special offers/promotions

2. **DashboardPage.jsx** - A dual-mode dashboard with:
   - Toggle between customer and admin views
   - Admin dashboard with sales metrics, product management, order management, and analytics
   - Customer dashboard with order history, recommendations, and account information

## Prerequisites

Before using these components, ensure you have:

1. Next.js 13+ installed
2. Tailwind CSS set up in your project
3. shadcn/ui components installed (see below)
4. Remix Icons (or another icon library)

## Setting Up shadcn/ui

If you haven't already set up shadcn/ui in your Next.js project, follow these steps:

```bash
# Install shadcn/ui CLI
npm install -D @shadcn/ui

# Initialize shadcn/ui in your project
npx shadcn-ui init

# Install required components
npx shadcn-ui add card avatar badge button progress separator tabs table scroll-area switch
```

## Required Components

The UI utilizes the following shadcn/ui components:

- Card (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Avatar
- Badge
- Button
- Progress
- Separator
- Tabs
- Table
- ScrollArea
- Switch

## Icons

The components use Remix Icon (ri-*) classes. You can include them via CDN:

```html
<!-- Add to your layout or _document.js -->
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
```

Alternatively, install the package:

```bash
npm install remixicon
```

Then import the CSS in your app:

```jsx
// In _app.jsx or layout.jsx
import 'remixicon/fonts/remixicon.css'
```

## How to Use

1. Copy the `nextjs-ecommerce-ui` folder to your project
2. Import the components as needed in your Next.js application:

```jsx
// Example usage in a Next.js page
import HomePage from '../path/to/nextjs-ecommerce-ui/HomePage'

export default function Home() {
  return <HomePage />
}
```

```jsx
// Example usage in a Next.js page
import DashboardPage from '../path/to/nextjs-ecommerce-ui/DashboardPage'

export default function Dashboard() {
  return <DashboardPage />
}
```

## Customization

You can customize these components by:

1. Modifying the mock data (user info, products, orders, etc.)
2. Adjusting the color schemes (gradients, backgrounds, text colors)
3. Adding or removing sections as needed
4. Connecting to your actual backend API for real data