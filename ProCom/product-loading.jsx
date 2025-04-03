import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="w-full">
      {/* Breadcrumb Skeleton */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <Skeleton className="h-5 w-64 bg-secondary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8">
        {/* Product Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-none bg-secondary" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-none bg-secondary" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div className="cyber-box p-4">
            <Skeleton className="h-8 w-3/4 bg-secondary mb-2" />
            <Skeleton className="h-4 w-32 bg-secondary" />
          </div>

          <div className="cyber-box p-4">
            <Skeleton className="h-8 w-32 bg-secondary" />
          </div>

          <div className="cyber-box p-4">
            <Skeleton className="h-4 w-full bg-secondary mb-2" />
            <Skeleton className="h-4 w-full bg-secondary mb-2" />
            <Skeleton className="h-4 w-3/4 bg-secondary" />
          </div>

          <div className="cyber-box p-4">
            <Skeleton className="h-5 w-32 bg-secondary mb-3" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 bg-secondary" />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1 bg-secondary" />
            <Skeleton className="h-10 flex-1 bg-secondary" />
            <Skeleton className="h-10 w-10 bg-secondary" />
          </div>

          <Skeleton className="h-40 w-full bg-secondary" />

          <Skeleton className="h-12 w-full bg-secondary" />
        </div>
      </div>

      <div className="border-t border-border/50 p-4 md:p-6 lg:p-8">
        <Skeleton className="h-8 w-48 bg-secondary mb-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="cyber-box">
              <Skeleton className="aspect-square w-full bg-secondary" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-5 w-full bg-secondary" />
                <Skeleton className="h-5 w-24 bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

