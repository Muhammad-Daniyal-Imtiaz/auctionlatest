"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: "My Store",
    email: "contact@mystore.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    currency: "USD",
    notifications: {
      email: true,
      push: true,
      orders: true,
      marketing: false,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStoreSettings({
      ...storeSettings,
      [name]: value,
    })
  }

  const handleNotificationChange = (key, value) => {
    setStoreSettings({
      ...storeSettings,
      notifications: {
        ...storeSettings.notifications,
        [key]: value,
      },
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="mb-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input id="name" name="name" value={storeSettings.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={storeSettings.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={storeSettings.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={storeSettings.address} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={storeSettings.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange("email", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={storeSettings.notifications.push}
                onCheckedChange={(checked) => handleNotificationChange("push", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-notifications">Order Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
              </div>
              <Switch
                id="order-notifications"
                checked={storeSettings.notifications.orders}
                onCheckedChange={(checked) => handleNotificationChange("orders", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-notifications">Marketing Updates</Label>
                <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
              </div>
              <Switch
                id="marketing-notifications"
                checked={storeSettings.notifications.marketing}
                onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

