export const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    isPositive: true,
    icon: "ri-money-dollar-circle-line",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-600",
    iconColor: "text-purple-200",
    fontColor: "text-white"
  },
  {
    title: "Total Orders",
    value: "2,350",
    change: "+180",
    isPositive: true,
    icon: "ri-shopping-bag-line",
    bgColor: "bg-gradient-to-br from-blue-600 to-teal-600",
    iconColor: "text-blue-200",
    fontColor: "text-white"
  },
  {
    title: "Active Customers",
    value: "1,235",
    change: "-0.4%",
    isPositive: false,
    icon: "ri-user-heart-line",
    bgColor: "bg-gradient-to-br from-amber-600 to-orange-600",
    iconColor: "text-amber-200",
    fontColor: "text-white"
  },
  {
    title: "Conversion Rate",
    value: "3.75%",
    change: "+12.3%",
    isPositive: true,
    icon: "ri-percent-line",
    bgColor: "bg-gradient-to-br from-green-600 to-emerald-600",
    iconColor: "text-green-200",
    fontColor: "text-white"
  }
];

export const topProducts = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.99",
    stock: 45,
    sales: 254,
    rating: 4.8,
    trend: "up",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format"
  },
  {
    id: "P002",
    name: "Smart Watch Series 7",
    category: "Wearables",
    price: "$349.99",
    stock: 28,
    sales: 189,
    rating: 4.9,
    trend: "up",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&auto=format"
  },
  {
    id: "P003",
    name: "Premium Yoga Mat",
    category: "Fitness",
    price: "$59.99",
    stock: 112,
    sales: 176,
    rating: 4.6,
    trend: "up",
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=200&h=200&fit=crop&auto=format"
  },
  {
    id: "P004",
    name: "Organic Green Tea",
    category: "Food & Beverages",
    price: "$12.99",
    stock: 345,
    sales: 154,
    rating: 4.5,
    trend: "down",
    image: "https://images.unsplash.com/photo-1563822249366-3e466d0b5303?w=200&h=200&fit=crop&auto=format"
  },
  {
    id: "P005",
    name: "Designer Backpack",
    category: "Fashion",
    price: "$89.99",
    stock: 67,
    sales: 132,
    rating: 4.7,
    trend: "up",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop&auto=format"
  }
];

export const recentOrders = [
  {
    id: "#ORD-7931",
    customer: "Emma Johnson",
    date: "Mar 23, 2025",
    amount: "$129.99",
    status: "Delivered",
    products: ["Wireless Headphones"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "#ORD-7930",
    customer: "John Smith",
    date: "Mar 22, 2025",
    amount: "$349.99",
    status: "Processing",
    products: ["Smart Watch Series 7"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "#ORD-7929",
    customer: "Sophia Lee",
    date: "Mar 22, 2025",
    amount: "$72.98",
    status: "Shipped",
    products: ["Premium Yoga Mat", "Organic Green Tea"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "#ORD-7928",
    customer: "Michael Garcia",
    date: "Mar 21, 2025",
    amount: "$212.97",
    status: "Delivered",
    products: ["Designer Backpack", "Organic Green Tea", "Fitness Tracker"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "#ORD-7927",
    customer: "Olivia Brown",
    date: "Mar 21, 2025",
    amount: "$59.99",
    status: "Cancelled",
    products: ["Premium Yoga Mat"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&auto=format"
  }
];

export const customerData = [
  {
    id: "C001",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    spentTotal: "$458.97",
    orderCount: 5,
    lastPurchase: "Mar 23, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "C002",
    name: "John Smith",
    email: "john.smith@example.com",
    spentTotal: "$1,245.50",
    orderCount: 12,
    lastPurchase: "Mar 22, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "C003",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    spentTotal: "$723.45",
    orderCount: 8,
    lastPurchase: "Mar 22, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "C004",
    name: "Michael Garcia",
    email: "m.garcia@example.com",
    spentTotal: "$912.78",
    orderCount: 10,
    lastPurchase: "Mar 21, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format"
  },
  {
    id: "C005",
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    spentTotal: "$59.99",
    orderCount: 1,
    lastPurchase: "Mar 21, 2025",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&auto=format"
  }
];
