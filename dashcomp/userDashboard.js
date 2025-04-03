'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { topProducts, recentOrders } from './data.js';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <div className="space-y-6">
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
}
