import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Neon-Nexus",
  description: "Fullstack admin application in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`min-h-screen font-sans ${fontSans.variable} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700`}>
        <ClerkProvider>
          <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY}>
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 bg-gray-900/80 border-b border-gray-700/50 shadow-lg">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    {/* Logo placeholder - can be replaced with an image or other content */}
                  </div>

                  <div className="flex items-center gap-6">
                    <SignedOut>
                      <div>
                        <SignInButton>
                          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Sign In
                          </button>
                        </SignInButton>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div>
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              userButtonAvatarBox: "w-10 h-10",
                              userButtonPopoverCard: "bg-gray-900/90 backdrop-blur-md border border-gray-700/50",
                              userButtonPopoverActionButton: "text-white hover:bg-gray-800/50",
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="relative">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              <div className="relative z-10">
                {children}
              </div>
            </main>
          </CopilotKit>
        </ClerkProvider>
      </body>
    </html>
  );
}