"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Star, ShoppingBag, Edit, Eye, Gift, Settings, Lock, LogOut, Mail, Phone, Calendar } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("purchases");

  // User profile data
  const user = {
    name: "Jessica Wilson",
    email: "jessica.wilson@example.com",
    since: "March 2023",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format",
    rewardPoints: 750,
    tier: "Gold",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States"
    }
  };

  // Order summary
  const orderStats = [
    {
      title: "Total Orders",
      value: "24",
      icon: <ShoppingBag />,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "text-blue-700",
      borderColor: "border-blue-100",
      textColor: "text-blue-800"
    },
    {
      title: "Wishlist Items",
      value: "12",
      icon: <Heart />,
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      iconColor: "text-pink-700",
      borderColor: "border-pink-100",
      textColor: "text-pink-800"
    },
    {
      title: "Cart Items",
      value: "3",
      icon: <ShoppingCart />,
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-700",
      borderColor: "border-green-100",
      textColor: "text-green-800"
    },
    {
      title: "Reviews",
      value: "16",
      icon: <Star />,
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      iconColor: "text-amber-700",
      borderColor: "border-amber-100",
      textColor: "text-amber-800"
    },
  ];

  // Favorite products
  const favoriteProducts = [
    {
      id: "P1254",
      name: "Wireless Noise-Cancelling Headphones",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&auto=format",
      lastPurchased: "2 months ago"
    },
    {
      id: "P1547",
      name: "Smart Watch Ultra",
      price: "$349.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop&auto=format",
      lastPurchased: "3 weeks ago"
    },
    {
      id: "P2376",
      name: "Organic Green Tea (50 bags)",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1563822249366-3e466d0b5303?w=150&h=150&fit=crop&auto=format",
      lastPurchased: "1 week ago"
    }
  ];

  // Recent purchases
  const recentPurchases = [
    {
      id: "#ORD-7931",
      date: "Mar 23, 2025",
      items: ["Premium Yoga Mat", "Fitness Tracker Band"],
      total: "$129.98",
      status: "Delivered"
    },
    {
      id: "#ORD-7845",
      date: "Mar 15, 2025",
      items: ["Organic Green Tea", "Herbal Supplements"],
      total: "$45.97",
      status: "Delivered"
    },
    {
      id: "#ORD-7762",
      date: "Mar 02, 2025",
      items: ["Smart Watch Ultra", "Watch Straps (2)"],
      total: "$387.95",
      status: "Delivered"
    }
  ];

  // Reward program details
  const rewardTiers = [
    { name: "Bronze", points: 0, perks: ["Free shipping on orders over $50", "Birthday gift"] },
    { name: "Silver", points: 500, perks: ["Free shipping on all orders", "Birthday gift", "Early access to sales"] },
    { name: "Gold", points: 750, perks: ["Free shipping on all orders", "Birthday gift", "Early access to sales", "Exclusive discounts", "Dedicated support"] },
    { name: "Platinum", points: 1000, perks: ["Free shipping on all orders", "Birthday gift", "Early access to sales", "Exclusive discounts", "Dedicated support", "Free returns", "VIP events"] }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full h-full min-w-0 space-y-6 text-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-700 p-8 md:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-200 md:text-lg mb-6">
              Shop the latest products and enjoy your {user.tier} membership benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-800 hover:bg-blue-50">
                <ShoppingCart className="mr-2" />
                Continue Shopping
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Gift className="mr-2" />
                Redeem Rewards
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-30"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-3xl opacity-30"></div>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat, index) => (
          <Card key={index} className={`border ${stat.borderColor} ${stat.bgColor} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                  <span className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</span>
                </div>
                <div className={`rounded-full p-3 bg-white/80 ${stat.iconColor} shadow-sm`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-7 w-full min-w-0">
        {/* User Profile */}
        <Card className="lg:col-span-3 hover:shadow-md transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                <Edit className="mr-1" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-blue-100">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600">
                    {user.tier} Member
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    <Star className="mr-1" /> {user.rewardPoints} Points
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="text-blue-700" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-blue-700" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-700" />
                    <span>Member since {user.since}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Default Shipping Address</h4>
                <div className="space-y-1">
                  <p>{user.name}</p>
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                  <p>{user.address.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="flex-1 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
              <Settings className="mr-1" /> Account Settings
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
              <Lock className="mr-1" /> Privacy
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
              <LogOut className="mr-1" /> Sign Out
            </Button>
          </CardFooter>
        </Card>

        {/* Tab content */}
        <Card className="lg:col-span-4 hover:shadow-md transition-all">
          <CardHeader className="pb-3">
            <Tabs defaultValue="purchases" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100">
                <TabsTrigger value="purchases" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                  <ShoppingBag className="mr-2" />
                  Purchases
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                  <Heart className="mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="rewards" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                  <Gift className="mr-2" />
                  Rewards
                </TabsTrigger>
              </TabsList>

              <CardContent className="pt-6">
                <TabsContent value="purchases" className="mt-0">
                  <h3 className="text-lg font-semibold mb-4">Recent Purchases</h3>
                  <div className="space-y-4">
                    {recentPurchases.map((purchase, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors hover:border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-blue-700">{purchase.id}</h4>
                            <p className="text-sm text-muted-foreground">{purchase.date}</p>
                          </div>
                          <Badge className={getStatusColor(purchase.status)}>
                            {purchase.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{purchase.items.join(", ")}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{purchase.total}</span>
                          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                            <Eye className="mr-1" /> View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="mt-0">
                  <h3 className="text-lg font-semibold mb-4">Favorite Products</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {favoriteProducts.map((product, index) => (
                      <Card key={index} className="border hover:shadow-md transition-all">
                        <CardContent className="p-4 flex flex-col items-center">
                          <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded-md mb-4" />
                          <h4 className="font-medium text-center">{product.name}</h4>
                          <p className="text-sm text-muted-foreground text-center mb-2">{product.price}</p>
                          <p className="text-xs text-muted-foreground mb-4">Last purchased {product.lastPurchased}</p>
                          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                            <ShoppingCart className="mr-1" /> Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rewards" className="mt-0">
                  <h3 className="text-lg font-semibold mb-4">Rewards Program</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-700">Your Points</h4>
                        <p className="text-sm text-muted-foreground">{user.rewardPoints} Points</p>
                      </div>
                      <Progress value={(user.rewardPoints / rewardTiers[rewardTiers.length - 1].points) * 100} className="w-1/2" />
                    </div>
                    <div className="space-y-2">
                      {rewardTiers.map((tier, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-blue-700">{tier.name} Tier</h4>
                            <p className="text-sm text-muted-foreground">{tier.points} Points</p>
                          </div>
                          <ul className="text-sm text-muted-foreground">
                            {tier.perks.map((perk, idx) => (
                              <li key={idx}>{perk}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}