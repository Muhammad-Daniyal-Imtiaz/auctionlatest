'use client';
import { useState, useEffect } from 'react';
import supabase from '../../Supabase/config';
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Info, HardDrive, Star, StarHalf, Truck, RotateCwIcon, ShieldHalfIcon, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductBidding from "../ProductBidding";
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'next/navigation';

// Define ProductImages component within the same file
function ProductImages({ productData, currentImageIndex, setCurrentImageIndex }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const images = productData.images || [productData.image || '/placeholder-product.jpg'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-2xl p-4 relative overflow-hidden group">
      <div
        className="aspect-square w-full flex items-center justify-center relative cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={images[currentImageIndex]}
          alt={productData.name}
          className={`object-contain h-full w-full transition-all duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />

        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.278Z"/>
            </svg>
            3D View
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ModernProductPage() {
  const { proid } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductWithDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/biddetails2?productId=${proid}`);
      const data = await response.json();

      if (response.ok) {
        setProductData(data);
      } else {
        throw new Error(data.error || 'Failed to fetch product details');
      }
    } catch (err) {
      setError(err.message);
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductWithDetails();
  }, [proid]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div className="flex items-center justify-center h-screen">Please sign in to view this product</div>;
  }

  if (loading && !productData) {
    return <div className="p-4 text-center">Loading product data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">{error}</div>
        <button
          onClick={fetchProductWithDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!productData) {
    return <div className="p-4 text-center">Product not found</div>;
  }

  return (
    <ProductContent
      productData={productData}
      loading={loading}
      error={error}
      productId={proid}
      clerkId={user.id}
    />
  );
}

function ProductContent({
  productData,
  loading,
  error,
  productId,
  clerkId
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(0);

  if (loading || !productData) {
    return (
      <div className="bg-background p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background max-w-7xl mx-auto">
      <div className="px-6 bg-gradient-to-r to-purple-500 from-pink-500 py-2 text-white rounded-2xl font-bold flex gap-5 items-center text-md mt-3 text-muted-foreground">
        <span className="hover:text-black cursor-pointer">Home</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="hover:text-black cursor-pointer">{productData.category}</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{productData.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-red-500">
            <ProductImages
              productData={productData}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          </div>
          <ProductDetails
            productData={productData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <ProductHeader
            productData={productData}
            isFavorite={isFavorite}
            setIsFavorite={() => setIsFavorite(!isFavorite)}
            selectedShipping={selectedShipping}
          />

          {/* Always show the bidding interface for demo purposes */}
          <ProductBidding
            productId={productId}
            clerkId={clerkId}
          />

          {/* Removed ProductActions component */}
        </div>
      </div>
    </div>
  );
}

function ProductDetails({
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

function ProductHeader({ productData, isFavorite, setIsFavorite, selectedShipping }) {
  const BadgePercent = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 13a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
    </svg>
  );

  const Heart = ({ className, filled }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const Star = ({ className, filled }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const TrendingUp = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  const Progress = ({ value, className }) => (
    <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-blue-500 h-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  const shippingPrice = productData.shipping?.options?.[selectedShipping]?.price || 0;
  const originalPrice = productData.original_price || productData.price * 1.2;
  const discount = productData.discount || Math.round(((originalPrice - productData.price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" /> Trending
            </span>
            {discount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <BadgePercent className="h-3 w-3 mr-1" /> {discount}% OFF
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{productData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Product ID: {productData.id} | {productData.condition || 'New'}</p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(productData.rating || 0) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">{productData.rating?.toFixed(1) || '0.0'}</span>
        <span className="text-sm text-gray-500">({productData.reviews || 0} reviews)</span>
      </div>

      <div className="mt-6 space-y-1">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-gray-900">${productData.price.toFixed(2)}</span>
          {originalPrice > productData.price && (
            <>
              <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="text-lg font-semibold text-green-600">{discount}% off</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {shippingPrice > 0 ? (
            `+ $${shippingPrice.toFixed(2)} shipping`
          ) : (
            'FREE shipping'
          )}
        </p>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 flex items-center gap-3">
        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17-7.17a2 2 0 0 0-2.83 0L2 16V20h4l10.59-10.59a2 2 0 0 0 0-2.82z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">Special Offer</p>
          <p className="text-xs text-blue-600">
            Save ${(originalPrice - productData.price).toFixed(2)} when you buy now!
          </p>
        </div>
      </div>

      {productData.stock !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-700">Available stock: {productData.stock} units</p>
            <p className="text-xs text-gray-500">12 sold in last 24 hours</p>
          </div>
          <Progress value={(productData.stock / 20) * 100} className="h-2" />
        </div>
      )}
    </div>
  );
}
