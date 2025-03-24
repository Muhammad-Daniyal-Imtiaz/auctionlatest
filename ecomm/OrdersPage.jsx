'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const orders = [
    {
      id: "#ORD-7931",
      customer: {
        name: "Emma Johnson",
        email: "emma.j@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 23, 2025",
      amount: "$129.99",
      status: "Delivered",
      payment: "Credit Card",
      products: ["Wireless Headphones"],
      address: "123 Main St, San Francisco, CA 94105"
    },
    {
      id: "#ORD-7930",
      customer: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 22, 2025",
      amount: "$349.99",
      status: "Processing",
      payment: "PayPal",
      products: ["Smart Watch Series 7"],
      address: "456 Park Ave, New York, NY 10022"
    },
    {
      id: "#ORD-7929",
      customer: {
        name: "Sophia Lee",
        email: "sophia.lee@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 22, 2025",
      amount: "$72.98",
      status: "Shipped",
      payment: "Credit Card",
      products: ["Premium Yoga Mat", "Organic Green Tea"],
      address: "789 Elm St, Chicago, IL 60611"
    },
    {
      id: "#ORD-7928",
      customer: {
        name: "Michael Garcia",
        email: "m.garcia@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 21, 2025",
      amount: "$212.97",
      status: "Delivered",
      payment: "Apple Pay",
      products: ["Designer Backpack", "Organic Green Tea", "Fitness Tracker"],
      address: "321 Oak Dr, Austin, TX 78701"
    },
    {
      id: "#ORD-7927",
      customer: {
        name: "Olivia Brown",
        email: "olivia.b@example.com",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 21, 2025",
      amount: "$59.99",
      status: "Cancelled",
      payment: "Credit Card",
      products: ["Premium Yoga Mat"],
      address: "654 Pine St, Seattle, WA 98101"
    },
    {
      id: "#ORD-7926",
      customer: {
        name: "William Taylor",
        email: "w.taylor@example.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 20, 2025",
      amount: "$89.99",
      status: "Delivered",
      payment: "Google Pay",
      products: ["Bluetooth Speaker"],
      address: "987 Cedar Ave, Boston, MA 02108"
    },
    {
      id: "#ORD-7925",
      customer: {
        name: "Ava Martinez",
        email: "ava.m@example.com",
        avatar: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 20, 2025",
      amount: "$149.99",
      status: "Refunded",
      payment: "PayPal",
      products: ["Winter Jacket"],
      address: "135 Maple Rd, Miami, FL 33130"
    },
    {
      id: "#ORD-7924",
      customer: {
        name: "Ethan Wilson",
        email: "e.wilson@example.com",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop&auto=format"
      },
      date: "Mar 19, 2025",
      amount: "$39.99",
      status: "Pending",
      payment: "Credit Card",
      products: ["Protein Powder"],
      address: "246 Birch Blvd, Denver, CO 80202"
    },
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "Refunded": return "bg-slate-100 text-slate-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const orderStats = [
    { 
      title: "Total Orders", 
      value: "1,248", 
      change: "+12.5%", 
      isPositive: true,
      icon: "ri-shopping-bag-line",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "text-blue-700"
    },
    { 
      title: "Pending Orders", 
      value: "24", 
      change: "-4.3%", 
      isPositive: true,
      icon: "ri-time-line",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      iconColor: "text-amber-700"
    },
    { 
      title: "Average Order Value", 
      value: "$124.35", 
      change: "+7.2%", 
      isPositive: true,
      icon: "ri-coin-line",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-700"
    },
    { 
      title: "Refund Rate", 
      value: "2.4%", 
      change: "+0.8%", 
      isPositive: false,
      icon: "ri-refund-2-line",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
      iconColor: "text-red-700"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Orders
          </h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <i className="ri-filter-line mr-2"></i>
            Filter
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <i className="ri-download-2-line mr-2"></i>
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <i className="ri-add-line mr-2"></i>
            Create Order
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat, index) => (
          <Card key={index} className={`border shadow-sm ${stat.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className={`rounded-full p-2 bg-white/80 ${stat.iconColor} shadow-sm`}>
                  <i className={`${stat.icon} text-xl`}></i>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {stat.change}
                </span>
                <span className="ml-2 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-2">
            <CardTitle>Order Management</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <Input
                  placeholder="Search orders..."
                  className="pl-9 w-[250px] bg-white"
                />
              </div>
              <select 
                className="text-sm rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-6 mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter(order => {
                  if (activeTab === "all") return true;
                  return order.status.toLowerCase() === activeTab;
                })
                .map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                        <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={order.products.join(", ")}>
                      {order.products.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                        <i className="ri-eye-line mr-1"></i> View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 p-0 px-2 text-blue-600">
                        <i className="ri-pencil-line mr-1"></i> Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" size="sm">Previous</Button>
            <p className="text-sm text-muted-foreground">Page 1 of 5</p>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Select an order to view details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 rounded-lg">
              <div className="text-slate-400 mb-3">
                <i className="ri-shopping-bag-line text-4xl"></i>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No Order Selected</h3>
              <p className="text-sm text-slate-500 mb-4 max-w-md">
                Click on "View" next to any order to see its detailed information here.
              </p>
              <Button variant="outline" size="sm">
                Select an Order
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Order Analytics</CardTitle>
            <CardDescription>Order trends and statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-1">Orders Today</div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <i className="ri-arrow-up-line mr-1"></i> 12% from yesterday
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-1">Revenue Today</div>
                <div className="text-2xl font-bold">$2,850</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <i className="ri-arrow-up-line mr-1"></i> 8% from yesterday
                </div>
              </div>
            </div>
            
            <div className="h-[200px] flex items-center justify-center bg-gradient-to-b from-white to-slate-50 rounded-lg border">
              <div className="text-center">
                <i className="ri-bar-chart-line text-4xl text-blue-400 mb-2"></i>
                <p className="text-slate-950">Daily order volume chart</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Payment Methods</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="ri-bank-card-line text-blue-600"></i>
                    <span className="text-sm">Credit Card</span>
                  </div>
                  <span className="text-sm font-medium">58%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="ri-paypal-line text-blue-600"></i>
                    <span className="text-sm">PayPal</span>
                  </div>
                  <span className="text-sm font-medium">24%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="ri-apple-line text-blue-600"></i>
                    <span className="text-sm">Apple Pay</span>
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="ri-google-line text-blue-600"></i>
                    <span className="text-sm">Google Pay</span>
                  </div>
                  <span className="text-sm font-medium">6%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-purple-900">Recently Shipped Orders</CardTitle>
          <CardDescription>Track shipping status</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {orders
              .filter(order => order.status === "Shipped")
              .slice(0, 3)
              .map((order, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                        <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.customer.name}</p>
                          <Badge variant="outline" className="text-xs">{order.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm mb-3">
                    <p className="font-medium text-slate-700">Ship to:</p>
                    <p className="text-muted-foreground">{order.address}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <i className="ri-shopping-bag-line text-purple-600"></i>
                    <span>{order.products.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-700">{order.amount}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        <i className="ri-truck-line mr-1"></i> Track
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <i className="ri-eye-line mr-1"></i> Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" className="w-full">
            View All Shipped Orders
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}