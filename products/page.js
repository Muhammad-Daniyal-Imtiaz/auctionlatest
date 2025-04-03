'use client'
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import ProductImages from "./proimage";
import ProductHeader from "./proheader";
import ProductDetails from "./prodetails";
import ProductActions from "./proaction";
import ProductFetcher from "./ProductFetcher";
import ProductBidding from "./ProductBidding";
import { useUser } from '@clerk/clerk-react';

export default function ModernProductPage({ params }) {
  const productId = params.id || '05fb98be-f982-42d5-b9c9-bcf0f3b9cf30';
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div className="flex items-center justify-center h-screen">Please sign in to view this product</div>;
  }

  return (
    <ProductFetcher productId={productId}>
      {({ productData, loading, error, placeBid, updateProduct }) => (
        <ProductContent
          productData={productData}
          loading={loading}
          error={error}
          onPlaceBid={placeBid}
          onUpdateProduct={updateProduct}
          productId={productId}
          clerkId={user.id}
        />
      )}
    </ProductFetcher>
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
      <div className="px-6 pt-6 flex items-center text-sm text-muted-foreground">
        <span className="hover:text-primary cursor-pointer">Home</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="hover:text-primary cursor-pointer">{productData.category}</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{productData.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        <div className="lg:col-span-7 space-y-6">
          <ProductImages
            productData={productData}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <ProductDetails
            productData={productData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <ProductHeader
            productData={productData}
            isFavorite={isFavorite}
            setIsFavorite={() => setIsFavorite(!isFavorite)}
          />
          
          {/* Always show the bidding interface for demo purposes */}
          <ProductBidding 
            productId={productId} 
            clerkId={clerkId} 
          />

          {productData.sale_type === 'fixed' && (
            <ProductActions productData={productData} />
          )}
        </div>
      </div>
    </div>
  );
}