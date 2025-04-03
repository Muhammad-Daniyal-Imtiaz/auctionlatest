'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info, RotateCwIcon, ShieldHalfIcon, Star, StarHalf, Truck } from "lucide-react";
import { Check, HardDrive, RotateCw } from "lucide-react";

export default function ProductDetails({
  productData,
  activeTab,
  setActiveTab,
  selectedShipping,
  setSelectedShipping
}) {
  // Safely access JSON data with fallbacks
  const highlights = Array.isArray(productData.highlights) ? productData.highlights : [];
  const specs = typeof productData.specs === 'object' ? productData.specs : {};
  const shippingOptions = productData.shipping?.options || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full bg-gray-50 rounded-none border-b">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("overview")}
          >
            <Info className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("specs")}
          >
            <HardDrive className="h-4 w-4 mr-2" /> Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("reviews")}
          >
            <Star className="h-4 w-4 mr-2" /> Reviews ({productData.reviews || 0})
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            onClick={() => setActiveTab("shipping")}
          >
            <Truck className="h-4 w-4 mr-2" /> Shipping & Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
            <p className="text-gray-700">{productData.description || 'No description available'}</p>
            {highlights.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Technical Specifications</h3>
            {Object.keys(specs).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-4">
                    <p className="text-sm text-gray-500 font-medium">{key}</p>
                    <p className="font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl p-4 text-center w-24">
                <p className="text-3xl font-bold">{productData.rating?.toFixed(1) || '0.0'}</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(productData.rating || 0) ? 'fill-current' : ''}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Customer Reviews</p>
                <p className="text-sm text-gray-500">{productData.reviews || 0} verified purchases</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar-review.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">TechEnthusiast42</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarHalf key={i} className={`h-3 w-3 ${i < 5 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">2 weeks ago</p>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Game changing technology!</h4>
              <p className="text-gray-700 text-sm">
                {productData.name || 'This product'} has completely transformed how I interact with my devices.
                The setup was seamless and the latency is truly imperceptible.
                The only minor issue was the initial calibration, but the support team was extremely helpful.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="p-6">
          <div className="space-y-4">
            <details open className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none">
                <Truck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Shipping Options</h3>
              </summary>
              {shippingOptions.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {shippingOptions.map((option, i) => (
                    <div
                      key={i}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedShipping === i
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedShipping(i)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-500">Estimated delivery: {option.time}</p>
                        </div>
                        <p className="font-medium">
                          {option.price === 0 ? 'FREE' : `$${option.price?.toFixed(2) || '0.00'}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No shipping options available</p>
              )}
            </details>

            <details open className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none">
                <RotateCwIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Return Policy</h3>
              </summary>
              <p className="text-gray-700 mt-2">
                {productData.return_policy || '30-day return policy'}. This item must be returned in its original condition.
              </p>
            </details>

            <details open className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none">
                <ShieldHalfIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Warranty</h3>
              </summary>
              <p className="text-gray-700 mt-2">
                {productData.warranty || '1-year limited warranty'} covering manufacturer defects.
                Does not cover damage from improper installation or unauthorized modifications.
              </p>
            </details>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
