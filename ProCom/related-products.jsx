import Image from "next/image"
import { getRelatedProducts } from "@/lib/products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Zap } from "lucide-react"

export default async function RelatedProducts({ categoryId, currentProductId }) {
  const products = await getRelatedProducts(categoryId, currentProductId)

  return (
    <div className="border-t border-border/50 p-4 md:p-6 lg:p-8 cyber-grid">
      <div className="mb-6 cyber-box p-2 inline-block">
        <h2 className="text-xl font-bold neon-text uppercase tracking-wider">SIMILAR_PRODUCTS</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="product-card cyber-box overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <div className="absolute inset-0 cyber-grid z-0"></div>
              <Image
                src={product.mainImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover mix-blend-luminosity transition-transform duration-500 group-hover:scale-110 z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* Product ID tag */}
              <div className="absolute top-2 left-2 text-xs text-primary bg-background/80 px-1 border border-primary/30 z-20">
                ID:{Math.floor(Math.random() * 1000)}
              </div>
            </div>
            <CardContent className="p-3 relative z-10">
              <h3 className="font-mono text-sm text-primary truncate uppercase">{product.name}</h3>

              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-accent text-sm">${product.price.toFixed(2)}</span>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-primary/50">
                  <Plus className="h-4 w-4 text-primary" />
                </Button>
              </div>

              <div className="mt-2 pt-2 border-t border-primary/20 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">STOCK: AVAILABLE</span>
                <Zap className="h-3 w-3 text-neon-yellow" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="cyber-button uppercase tracking-wider">ACCESS_ALL_PRODUCTS</Button>
      </div>
    </div>
  )
}

