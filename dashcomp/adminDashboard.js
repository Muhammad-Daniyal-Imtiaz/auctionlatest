'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inventoryStatus, lowStockAlertCount } from './inventoryStatus';
import { productCategories } from './productCategories';
import { statsData, topProducts, recentOrders, customerData } from './data.js';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdmin, setIsAdmin] = useState(true);

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

  return (
    <div className="space-y-6">
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
                  {inventoryStatus.map((status, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{status.label}</span>
                        <span className={`text-sm font-bold text-black`}>{status.value}%</span>
                      </div>
                      <Progress value={status.value} className={`h-2 bg-black`} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-200">
                    <i className="ri-alarm-warning-line mr-1"></i> Low Stock Alert ({lowStockAlertCount})
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
                  {productCategories.map((category, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 text-black`}>
                          <i className={`ri-${category.icon || "computer-line"}`}></i>
                        </div>
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.count} products</p>
                        </div>
                      </div>
                      <Progress value={category.progress} className={`h-1.5 mt-3 bg-black`} />
                    </div>
                  ))}
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
                      <div className="w-3 h-3 rounded-full bg-black-500"></div>
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
}
