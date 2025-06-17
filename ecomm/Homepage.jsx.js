"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Star, ShoppingBag, Edit, Eye, Gift, Settings, Lock, LogOut, Mail, Phone, Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("purchases");
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user data and orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
          setLoading(false);
          return;
        }

        const parsedUserData = JSON.parse(storedUserData);

        // Fetch user details from API
        const userResponse = await fetch(`/api/dashdetails?clerk_id=${parsedUserData.clerk_id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user details');
        const userDetails = await userResponse.json();

        setUserData({
          ...parsedUserData,
          ...userDetails
        });

        setFormData({
          phone: userDetails.phone || '',
          address_street: userDetails.address_street || '',
          address_city: userDetails.address_city || '',
          address_state: userDetails.address_state || '',
          address_zip: userDetails.address_zip || '',
          address_country: userDetails.address_country || ''
        });

        // Fetch orders data
        const ordersResponse = await fetch(`/api/dashorders?clerk_id=${parsedUserData.clerk_id}`);
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
        const ordersData = await ordersResponse.json();
        setRecentPurchases(ordersData);
        setTotalOrders(ordersData.length || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/dashdetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerk_id: userData.clerk_id,
          updates: {
            phone: formData.phone,
            address_street: formData.address_street,
            address_city: formData.address_city,
            address_state: formData.address_state,
            address_zip: formData.address_zip,
            address_country: formData.address_country,
          }
        })
      });
  
      if (!response.ok) throw new Error('Failed to update profile');
  
      const updatedData = await response.json();
  
      setUserData(prev => ({
        ...prev,
        ...updatedData
      }));
  
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  // User profile data - now fully dynamic
  const user = userData ? {
    name: userData.name || "No name provided",
    email: userData.email || "No email provided",
    since: userData.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : "Date not available",
    avatar: userData.profile_image_url,
    rewardPoints: userData.reward_points || 0,
    tier: userData.tier || "No tier",
    phone: userData.phone,
    address: {
      street: userData.address_street,
      city: userData.address_city,
      state: userData.address_state,
      zip: userData.address_zip,
      country: userData.address_country
    }
  } : null;

  // Order summary
  const orderStats = [
    {
      title: "Total Orders",
      value: loading ? "..." : totalOrders.toString(),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">User data not available</h2>
          <p className="text-muted-foreground">Please sign in to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl mb-8">
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
      <div className="grid gap-6 lg:grid-cols-7">
  {/* User Profile */}
  <Card className="lg:col-span-4 hover:shadow-md transition-all">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Manage your account details</CardDescription>
        </div>
        {editMode ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-blue-700 hover:bg-blue-800"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => setEditMode(true)}
          >
            <Edit className="mr-1" /> Edit
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-8">
      <div className="flex flex-col items-center sm:flex-row gap-8">
        <Avatar className="h-32 w-32 border-4 border-blue-100">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-lg font-medium text-muted-foreground mb-4">Contact Information</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="text-blue-700" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-700" />
              {editMode ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              ) : (
                <span>{user.phone || "Not provided"}</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="text-blue-700" />
              <span>Member since {user.since}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-muted-foreground mb-4">Shipping Address</h4>
          {editMode ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="address_street">Street</Label>
                <Input
                  id="address_street"
                  name="address_street"
                  value={formData.address_street}
                  onChange={handleInputChange}
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address_city">City</Label>
                  <Input
                    id="address_city"
                    name="address_city"
                    value={formData.address_city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="address_state">State</Label>
                  <Input
                    id="address_state"
                    name="address_state"
                    value={formData.address_state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address_zip">ZIP Code</Label>
                  <Input
                    id="address_zip"
                    name="address_zip"
                    value={formData.address_zip}
                    onChange={handleInputChange}
                    placeholder="ZIP code"
                  />
                </div>
                <div>
                  <Label htmlFor="address_country">Country</Label>
                  <Input
                    id="address_country"
                    name="address_country"
                    value={formData.address_country}
                    onChange={handleInputChange}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p>{user.address.street || "Not provided"}</p>
              {user.address.street && (
                <>
                  <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                  <p>{user.address.country}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </CardContent>
    <CardFooter className="border-t bg-slate-50 gap-4 flex-wrap">
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
  <Card className="lg:col-span-3 hover:shadow-md transition-all">
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
            {recentPurchases.length > 0 ? (
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
                    <p className="text-sm text-gray-600 mb-3">
                      {purchase.items.length > 0 ? purchase.items.join(", ") : "No items listed"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{purchase.total}</span>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                        <Eye className="mr-1" /> View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h4>
                <p className="mt-1 text-gray-500">Your purchase history will appear here</p>
                <Button className="mt-4 bg-blue-700 hover:bg-blue-800">
                  <ShoppingCart className="mr-2" /> Start Shopping
                </Button>
              </div>
            )}
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