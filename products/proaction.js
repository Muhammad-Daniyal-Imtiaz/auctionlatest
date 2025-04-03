'use client'
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, ShoppingCart, Zap } from 'lucide-react';

export default function ProductActions({
  productData,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  isAddingToCart,
  addToCart
}) {
  const colors = productData.colors || [];
  const sizes = productData.sizes || [];
  const stock = productData.stock || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      {colors.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Color</h3>
          <div className="flex gap-3">
            {colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-primary' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Color option ${i + 1}`}
              >
                {selectedColor === color && (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Size</h3>
          <div className="flex gap-3">
            {sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-10 rounded-lg border flex items-center justify-center transition-all ${
                  selectedSize === size
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            disabled={quantity <= 1}
          >
            <span className="text-xl">-</span>
          </button>
          <div className="w-16 h-10 rounded-lg border border-gray-200 flex items-center justify-center font-medium">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            disabled={quantity >= stock}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={addToCart}
          disabled={isAddingToCart || stock <= 0}
        >
          {isAddingToCart ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" /> Adding...
            </>
          ) : stock > 0 ? (
            <>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full gap-2"
          disabled={stock <= 0}
        >
          <Zap className="h-5 w-5" /> Buy Now
        </Button>
      </div>
    </div>
  );
}
