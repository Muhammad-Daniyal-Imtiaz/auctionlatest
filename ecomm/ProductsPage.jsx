'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const products = [
    {
      id: "P001",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$129.99",
      stock: 45,
      sales: 254,
      rating: 4.8,
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop&auto=format"
    },
    {
      id: "P006",
      name: "Ceramic Coffee Mug Set",
      category: "Home & Kitchen",
      price: "$24.99",
      stock: 89,
      sales: 78,
      rating: 4.3,
      status: "Active",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=200&h=200&fit=crop&auto=format"
    },
    {
      id: "P007",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "$79.99",
      stock: 53,
      sales: 112,
      rating: 4.4,
      status: "Active",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop&auto=format"
    },
    {
      id: "P008",
      name: "Winter Jacket",
      category: "Fashion",
      price: "$149.99",
      stock: 0,
      sales: 95,
      rating: 4.6,
      status: "Out of Stock",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop&auto=format"
    },
    {
      id: "P009",
      name: "Protein Powder",
      category: "Health & Wellness",
      price: "$39.99",
      stock: 24,
      sales: 67,
      rating: 4.2,
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=200&h=200&fit=crop&auto=format"
    }
  ];
  
  const categories = [
    "Electronics", "Wearables", "Fitness", "Food & Beverages", 
    "Fashion", "Home & Kitchen", "Health & Wellness"
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      case "Low Stock": return "bg-amber-100 text-amber-800";
      case "Draft": return "bg-slate-100 text-slate-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <i className="ri-upload-2-line mr-2"></i>
            Import
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <i className="ri-download-2-line mr-2"></i>
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <i className="ri-add-line mr-2"></i>
            Add Product
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Product Statistics</CardTitle>
                <CardDescription>Overview of your product performance</CardDescription>
              </div>
              <div>
                <select 
                  className="text-sm rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
                >
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                <div className="text-indigo-600 mb-2">
                  <i className="ri-shopping-bag-line text-xl"></i>
                </div>
                <p className="text-sm font-medium text-slate-600">Total Products</p>
                <h4 className="text-2xl font-bold text-slate-900">849</h4>
                <p className="text-xs text-green-600 mt-1">
                  <i className="ri-arrow-up-line"></i> 12% from last month
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-4">
                <div className="text-purple-600 mb-2">
                  <i className="ri-eye-line text-xl"></i>
                </div>
                <p className="text-sm font-medium text-slate-600">Product Views</p>
                <h4 className="text-2xl font-bold text-slate-900">32.5K</h4>
                <p className="text-xs text-green-600 mt-1">
                  <i className="ri-arrow-up-line"></i> 8% from last month
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4">
                <div className="text-green-600 mb-2">
                  <i className="ri-percent-line text-xl"></i>
                </div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <h4 className="text-2xl font-bold text-slate-900">3.8%</h4>
                <p className="text-xs text-green-600 mt-1">
                  <i className="ri-arrow-up-line"></i> 2% from last month
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-lg p-4">
                <div className="text-amber-600 mb-2">
                  <i className="ri-star-line text-xl"></i>
                </div>
                <p className="text-sm font-medium text-slate-600">Avg. Rating</p>
                <h4 className="text-2xl font-bold text-slate-900">4.6</h4>
                <p className="text-xs text-green-600 mt-1">
                  <i className="ri-arrow-up-line"></i> 0.2 from last month
                </p>
              </div>
            </div>
            
            <div className="mt-6 h-[280px] flex items-center justify-center bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-100">
              <div className="text-center">
                <i className="ri-line-chart-line text-5xl text-blue-400 mb-2"></i>
                <p className="text-slate-950">Product performance chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">In Stock</span>
                </div>
                <span className="text-sm font-medium">625</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '73.5%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium">Low Stock</span>
                </div>
                <span className="text-sm font-medium">136</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium">Out of Stock</span>
                </div>
                <span className="text-sm font-medium">88</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '10.5%' }}></div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Top Categories</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Electronics</span>
                  <span className="text-sm font-medium">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fashion</span>
                  <span className="text-sm font-medium">189</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Home & Kitchen</span>
                  <span className="text-sm font-medium">145</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Health & Wellness</span>
                  <span className="text-sm font-medium">112</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Food & Beverages</span>
                  <span className="text-sm font-medium">98</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <i className="ri-alarm-warning-line mr-2"></i>
                View Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-2">
            <CardTitle>Products</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <Input
                  placeholder="Search products..."
                  className="pl-9 w-[250px] bg-white"
                />
              </div>
              <select 
                className="text-sm rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4 mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="low">Low Stock</TabsTrigger>
              <TabsTrigger value="out">Out of Stock</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter(product => {
                  if (activeTab === "all") return true;
                  if (activeTab === "active") return product.status === "Active";
                  if (activeTab === "low") return product.status === "Low Stock";
                  if (activeTab === "out") return product.status === "Out of Stock";
                  return true;
                })
                .map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
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
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
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
                        <i className="ri-eye-line"></i>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <i className="ri-pencil-line"></i>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
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
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" size="sm">Previous</Button>
            <p className="text-sm text-muted-foreground">Page 1 of 3</p>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Recently Added Products</CardTitle>
            <CardDescription>Products added in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.slice(0, 4).map((product, index) => (
                <div key={index} className="flex gap-4 bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-700">{product.price}</span>
                      <div className="flex items-center text-yellow-500 text-sm">
                        <i className="ri-star-fill mr-1"></i>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View All Recently Added
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Product Reviews</CardTitle>
            <CardDescription>Latest customer feedback</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-6 p-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${30 + index}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {["Alex Johnson", "Sarah Miller", "David Chen"][index]}
                        </p>
                        <div className="flex items-center text-yellow-500 text-xs">
                          {Array(5).fill(0).map((_, starIndex) => (
                            <i key={starIndex} className={`${starIndex < (5 - index * 0.5) ? "ri-star-fill" : "ri-star-line"} text-xs`}></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {["2 days ago", "1 week ago", "2 weeks ago"][index]}
                    </span>
                  </div>
                  <p className="text-sm">
                    {[
                      "This product exceeded my expectations! Great quality and fast delivery.",
                      "Pretty good overall, but there's room for improvement on the packaging.",
                      "Works as described, but I expected better quality for the price."
                    ][index]}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {["Wireless Headphones", "Smart Watch Series 7", "Premium Yoga Mat"][index]}
                    </Badge>
                  </div>
                  {index < 2 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View All Reviews
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}