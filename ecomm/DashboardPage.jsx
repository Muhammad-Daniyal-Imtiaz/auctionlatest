'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdmin, setIsAdmin] = useState(true);

  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      isPositive: true,
      icon: "ri-money-dollar-circle-line",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-700"
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+180",
      isPositive: true,
      icon: "ri-shopping-bag-line",
      bgColor: "bg-gradient-to-br from-blue-100 to-teal-100",
      iconColor: "text-blue-700"
    },
    {
      title: "Active Customers",
      value: "1,235",
      change: "-0.4%",
      isPositive: false,
      icon: "ri-user-heart-line",
      bgColor: "bg-gradient-to-br from-amber-100 to-orange-100",
      iconColor: "text-amber-700"
    },
    {
      title: "Conversion Rate",
      value: "3.75%",
      change: "+12.3%",
      isPositive: true,
      icon: "ri-percent-line",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-700"
    }
  ];

  const topProducts = [
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

  const recentOrders = [
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

  const customerData = [
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

  const getStatusColorForOrder = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColorForCustomer = (status) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "VIP": return "bg-purple-100 text-purple-800";
      case "New": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderUserDashboard = () => (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your Shopcove store account
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">My Orders</Button>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
            <i className="ri-shopping-cart-line mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Recent Orders</p>
              <h3 className="text-2xl font-bold text-purple-900">3</h3>
              <p className="text-xs text-purple-600 mt-1">Last 30 days</p>
            </div>
            <div className="rounded-full p-3 bg-white/80 text-pink-600 shadow-sm">
              <i className="ri-shopping-bag-line text-xl"></i>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Wishlist Items</p>
              <h3 className="text-2xl font-bold text-blue-900">7</h3>
              <p className="text-xs text-blue-600 mt-1">2 new additions</p>
            </div>
            <div className="rounded-full p-3 bg-white/80 text-blue-600 shadow-sm">
              <i className="ri-heart-line text-xl"></i>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Reward Points</p>
              <h3 className="text-2xl font-bold text-amber-900">250</h3>
              <p className="text-xs text-amber-600 mt-1">$25 value</p>
            </div>
            <div className="rounded-full p-3 bg-white/80 text-amber-600 shadow-sm">
              <i className="ri-star-line text-xl"></i>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-purple-900">My Recent Orders</CardTitle>
          <CardDescription>Track your recent purchases</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.slice(0, 3).map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {order.products.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColorForOrder(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      Track Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" className="w-full">
            View All Orders
          </Button>
        </CardFooter>
      </Card>

      {/* Recommendations */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-purple-900">Recommended For You</CardTitle>
            <CardDescription>Based on your purchase history</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topProducts.map((product, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 text-pink-600 hover:bg-white hover:text-pink-700 shadow-sm">
                        <i className="ri-heart-line"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-semibold text-purple-700">{product.price}</p>
                      <div className="flex items-center text-yellow-500 text-xs">
                        <i className="ri-star-fill mr-1"></i>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <i className="ri-shopping-cart-line mr-1"></i> Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your e-commerce store performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Reports</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <i className="ri-add-line mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index} className={`border-none shadow-md ${stat.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-slate-700">{stat.title}</span>
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                </div>
                <div className={`rounded-full p-2 bg-white/80 ${stat.iconColor} shadow-sm`}>
                  <i className={`${stat.icon} text-xl`}></i>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {stat.change}
                </span>
                <span className="ml-2 text-slate-600">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="bg-gradient-to-r from-blue-100 to-indigo-100 p-1">
          <TabsTrigger value="products" className="data-[state=active]:bg-white">Products</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-white">Orders</TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-white">Customers</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Products with highest sales volume</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                  <i className="ri-add-line mr-1"></i> Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{product.sales}</span>
                          {product.trend === "up" ? (
                            <i className="ri-arrow-up-line text-green-600"></i>
                          ) : (
                            <i className="ri-arrow-down-line text-red-600"></i>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-yellow-500">
                          <i className="ri-star-fill mr-1"></i>
                          <span>{product.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <i className="ri-pencil-line"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <Button variant="outline" className="w-full">
                View All Products
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-blue-900">Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">In Stock</span>
                      <span className="text-sm font-medium text-blue-700">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-blue-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Low Stock</span>
                      <span className="text-sm font-medium text-amber-700">18%</span>
                    </div>
                    <Progress value={18} className="h-2 bg-amber-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Out of Stock</span>
                      <span className="text-sm font-medium text-red-700">7%</span>
                    </div>
                    <Progress value={7} className="h-2 bg-red-100" />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-200">
                    <i className="ri-alarm-warning-line mr-1"></i> Low Stock Alert (23)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-200">
                    <i className="ri-refresh-line mr-1"></i> Restock Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-purple-900">Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                        <i className="ri-computer-line"></i>
                      </div>
                      <div>
                        <p className="font-medium">Electronics</p>
                        <p className="text-sm text-muted-foreground">146 products</p>
                      </div>
                    </div>
                    <Progress value={85} className="h-1.5 mt-3 bg-blue-100" />
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-green-100 text-green-600">
                        <i className="ri-shirt-line"></i>
                      </div>
                      <div>
                        <p className="font-medium">Fashion</p>
                        <p className="text-sm text-muted-foreground">249 products</p>
                      </div>
                    </div>
                    <Progress value={75} className="h-1.5 mt-3 bg-green-100" />
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-amber-100 text-amber-600">
                        <i className="ri-home-line"></i>
                      </div>
                      <div>
                        <p className="font-medium">Home & Living</p>
                        <p className="text-sm text-muted-foreground">118 products</p>
                      </div>
                    </div>
                    <Progress value={62} className="h-1.5 mt-3 bg-amber-100" />
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                        <i className="ri-hearts-line"></i>
                      </div>
                      <div>
                        <p className="font-medium">Health & Beauty</p>
                        <p className="text-sm text-muted-foreground">95 products</p>
                      </div>
                    </div>
                    <Progress value={45} className="h-1.5 mt-3 bg-purple-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage your store orders</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                    <i className="ri-filter-line mr-1"></i> Filter
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <i className="ri-download-line mr-1"></i> Export
                  </Button>
                </div>
              </div>
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
                  {recentOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={order.avatar} alt={order.customer} />
                            <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{order.customer}</span>
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
                        <Badge className={getStatusColorForOrder(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                            <i className="ri-eye-line mr-1"></i> View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-0 px-2 text-blue-600">
                            <i className="ri-pencil-line mr-1"></i> Update
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
                <p className="text-sm text-muted-foreground">Page 1 of 10</p>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>Manage your store customers</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                    <i className="ri-filter-line mr-1"></i> Filter
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <i className="ri-user-add-line mr-1"></i> New Customer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerData.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.spentTotal}</TableCell>
                      <TableCell>{customer.orderCount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColorForCustomer(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                            <i className="ri-eye-line mr-1"></i> View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 p-0 px-2 text-blue-600">
                            <i className="ri-mail-line mr-1"></i> Contact
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
                <p className="text-sm text-muted-foreground">Page 1 of 8</p>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-b from-white to-blue-50 rounded-lg border border-blue-100">
                  <div className="text-center">
                    <i className="ri-bar-chart-grouped-line text-5xl text-blue-400 mb-2"></i>
                    <p className="text-blue-950">Sales analytics data visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100">
              <CardHeader>
                <CardTitle className="text-pink-900">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-white/50 rounded-lg">
                  <div className="text-center">
                    <i className="ri-pie-chart-line text-4xl text-pink-400 mb-2"></i>
                    <p className="text-pink-950">Revenue by product category</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Electronics</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Fashion</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Home & Living</span>
                    </div>
                    <span className="text-sm font-medium">18%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
              <CardHeader>
                <CardTitle className="text-violet-900">Sales Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-white/50 rounded-lg">
                  <div className="text-center">
                    <i className="ri-line-chart-line text-4xl text-violet-400 mb-2"></i>
                    <p className="text-violet-950">Sales by channel</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span className="text-sm">Website</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">Mobile App</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                      <span className="text-sm">Marketplace</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {isAdmin ? "Admin View" : "Customer View"}
          </span>
          <Switch
            checked={isAdmin}
            onCheckedChange={setIsAdmin}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {isAdmin ? renderAdminDashboard() : renderUserDashboard()}
      </div>
    </div>
  );
}
