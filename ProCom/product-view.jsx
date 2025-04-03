import Image from "next/image"
import { getProduct } from "@/lib/products"
import ProductDetails from "./product-details"
import ColorSelector from "./color-selector"
import ChatWithSeller from "./chat-with-seller"
import BiddingTerminal from "./bidding-terminal"
import RelatedProducts from "./related-products"
import { Heart, Share2, ShoppingCart, Star, ChevronRight, Zap, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function ProductView({ productId }) {
  const product = await getProduct(productId)

  return (
    <div className="w-full cyber-grid">
      {/* Breadcrumb */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <nav className="flex text-sm overflow-x-auto whitespace-nowrap">
          <a href="/" className="text-primary hover:text-primary/80">
            SYS:ROOT
          </a>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
          <a href="/category" className="text-primary hover:text-primary/80">
            AUDIO.DEV
          </a>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">{product.name.toUpperCase().replace(/\s+/g, "_")}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square neon-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 z-0"></div>
            <div className="absolute inset-0 cyber-grid z-0"></div>
            <Image
              src={product.mainImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover mix-blend-luminosity"
              priority
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-none border-primary/50 bg-background/80 z-10"
            >
              <Heart className="h-4 w-4 text-accent" />
            </Button>

            {product.isNew && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary/20 border border-primary text-primary px-3 py-1 rounded-none uppercase text-xs tracking-wider">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  New Release
                </Badge>
              </div>
            )}

            {/* HUD overlay elements */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="text-xs text-primary bg-background/80 px-2 py-1 border border-primary/50">
                ID: NRX-{Math.floor(Math.random() * 10000)}
              </div>
              <div className="text-xs text-primary bg-background/80 px-2 py-1 border border-primary/50">
                SYS: ACTIVE
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden border border-primary/30 hover:border-primary cursor-pointer transition-colors"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover mix-blend-luminosity"
                />
                <div className="absolute inset-0 hover:bg-primary/10 transition-colors"></div>
              </div>
            ))}
          </div>

          {/* Tech specs display */}
          <div className="cyber-box p-3 text-xs font-mono">
            <div className="flex justify-between items-center mb-2">
              <span className="text-primary">SYSTEM.SPECS</span>
              <span className="text-primary/50">[VERIFIED]</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Cpu className="h-3 w-3 mr-1 text-primary" />
                <span>PROCESSOR: {product.specifications.Processor || "40mm"}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-3 w-3 mr-1 text-primary" />
                <span>PROTECTION: {product.specifications.Protection || "IP67"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="cyber-box p-4">
            <h1 className="text-2xl sm:text-3xl font-bold neon-text uppercase tracking-wider">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < product.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">[{product.reviewCount} USER_RATINGS]</span>
            </div>
          </div>

          <div className="cyber-box p-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold neon-text-pink">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="mt-2 text-xs text-primary border-t border-primary/20 pt-2">
              SECURE_TRANSACTION | ENCRYPTED_PAYMENT
            </div>
          </div>

          {/* Add Bidding Terminal */}
          <BiddingTerminal product={product} />

          <div className="cyber-box p-4">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-primary mr-2"></div>
              <span className="text-sm uppercase tracking-wider text-primary">PRODUCT_DESCRIPTION</span>
            </div>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed">{product.description}</p>
          </div>

          <ColorSelector colors={product.colors} />

          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 gap-2 min-w-[140px] cyber-button uppercase tracking-wider">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1 min-w-[140px] cyber-button-pink uppercase tracking-wider">
              Buy Now
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 border-primary/50">
              <Share2 className="h-4 w-4 text-primary" />
            </Button>
          </div>

          <ProductDetails product={product} />

          <ChatWithSeller seller={product.seller} />
        </div>
      </div>

      <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </div>
  )
}

