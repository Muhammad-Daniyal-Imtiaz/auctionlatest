import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Orcish Fullstack Admin",
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
      <body className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}>
        <ClerkProvider>
          <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY}>
            {/* Clerk Header */}
            <header className="p-4 bg-gray-100 shadow-md flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">NeonNexus</h1>
              <div>
                <SignedOut>
                  <SignInButton className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4">
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>
          </CopilotKit>
        </ClerkProvider>
      </body>
    </html>
  );
}