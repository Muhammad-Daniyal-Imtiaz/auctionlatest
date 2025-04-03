// import ProductDescription from "@/components/product-description"
// // import BiddingTerminal from "@/components/bidding-terminal"
// import { getProduct } from "@/lib/products"

// export default async function ProductPage() {
//   const product = await getProduct("1")

//   return (
//     <main className="min-h-screen py-6 md:py-12 relative overflow-hidden">
//       {/* Digital noise */}
//       <div className="digital-noise"></div>

//       {/* Matrix rain effect */}
//       <div className="matrix-bg">
//         {Array(10)
//           .fill()
//           .map((_, i) => (
//             <div
//               key={i}
//               className="matrix-column"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationName: "matrix-fall",
//                 animationDuration: `${15 + Math.random() * 20}s`,
//                 animationTimingFunction: "linear",
//                 animationIterationCount: "infinite",
//                 animationDelay: `${Math.random() * 5}s`,
//               }}
//             ></div>
//           ))}
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center mb-8">
//           <div className="inline-block cyber-box p-2 mb-4 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50">
//             <h1
//               className="text-3xl md:text-4xl font-bold rainbow-text uppercase tracking-widest glitch"
//               data-text="NEURAL TECH"
//             >
//               NEURAL TECH
//             </h1>
//           </div>
//         </div>

//         <div className="cyber-box neon-border pulse-glow p-1 max-w-5xl mx-auto bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/80">
//           <div className="space-y-6">
//             <ProductDescription product={product} />
//             {/* <BiddingTerminal product={product} /> */}
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

