"use client";

import { useState } from "react";
import { Save, User, CreditCard, Store, Bell, Lock, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and store settings</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-64 h-fit">
          <CardContent className="p-4">
            <div className="space-y-1">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "account" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("account")}
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "billing" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "store" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("store")}
              >
                <Store className="h-4 w-4" />
                <span>Store</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "notifications" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "security" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("security")}
              >
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${activeTab === "help" ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                onClick={() => setActiveTab("help")}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          {activeTab === "account" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                      defaultValue="Store owner and entrepreneur with a passion for customer service and quality products."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "billing" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details and subscription plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Current Plan: Premium</h3>
                        <p className="text-sm text-muted-foreground">$49.99/month, billed monthly</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                          <span className="font-medium">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" defaultValue="United States" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="California" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="1234 Main St" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="San Francisco" />
                        </div>
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" defaultValue="94103" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "store" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>Configure your store details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Store Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" defaultValue="ShopDash" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">Store URL</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">https://</span>
                        <Input id="storeUrl" defaultValue="shopdash.store" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeDescription">Store Description</Label>
                      <Textarea
                        id="storeDescription"
                        className="min-h-[100px]"
                        defaultValue="Premium electronics and accessories for modern living."
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="monday">Monday</Label>
                        <div className="flex gap-2">
                          <Input id="monday-open" defaultValue="9:00 AM" className="w-24" />
                          <span className="flex items-center">to</span>
                          <Input id="monday-close" defaultValue="5:00 PM" className="w-24" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tuesday">Tuesday</Label>
                        <div className="flex gap-2">
                          <Input id="tuesday-open" defaultValue="9:00 AM" className="w-24" />
                          <span className="flex items-center">to</span>
                          <Input id="tuesday-close" defaultValue="5:00 PM" className="w-24" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wednesday">Wednesday</Label>
                        <div className="flex gap-2">
                          <Input id="wednesday-open" defaultValue="9:00 AM" className="w-24" />
                          <span className="flex items-center">to</span>
                          <Input id="wednesday-close" defaultValue="5:00 PM" className="w-24" />
                        </div>
                      </div>
                      {/* Additional days would be added here */}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Currency & Locale</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input id="currency" defaultValue="USD ($)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" defaultValue="English" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-order">New Order</Label>
                          <p className="text-sm text-muted-foreground">Receive an email when a new order is placed</p>
                        </div>
                        <Switch id="new-order" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="order-status">Order Status Updates</Label>
                          <p className="text-sm text-muted-foreground">Receive emails when order status changes</p>
                        </div>
                        <Switch id="order-status" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
                        </div>
                        <Switch id="inventory-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="customer-reviews">Customer Reviews</Label>
                          <p className="text-sm text-muted-foreground">Receive emails for new customer reviews</p>
                        </div>
                        <Switch id="customer-reviews" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing">Marketing Updates</Label>
                          <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
                        </div>
                        <Switch id="marketing" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-new-order">New Order</Label>
                          <p className="text-sm text-muted-foreground">Receive a push notification for new orders</p>
                        </div>
                        <Switch id="push-new-order" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-messages">Customer Messages</Label>
                          <p className="text-sm text-muted-foreground">Get notified when customers send messages</p>
                        </div>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and privacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">San Francisco, CA • Chrome on macOS</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-xs text-muted-foreground">iPhone 13 • iOS 16.5</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Log Out All Other Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "help" && (
            <div
              style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get help with your account and store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">How do I process refunds?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          You can process refunds by navigating to the order details page and clicking the "Refund"
                          button.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">How do I add a new product?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Go to the Products section and click the "Add Product" button to create a new product listing.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">How do I change my subscription plan?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Go to the Billing section in your account settings and click on "Change Plan" to view
                          available options.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Support</h3>
                    <div className="space-y-2">
                      <Label htmlFor="support-subject">Subject</Label>
                      <Input id="support-subject" placeholder="What do you need help with?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-message">Message</Label>
                      <Textarea
                        id="support-message"
                        placeholder="Describe your issue in detail"
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button className="w-full">Submit Support Request</Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Need immediate assistance?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our support team is available Monday through Friday, 9am-5pm PT.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="flex-1">
                        Live Chat
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Call Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
