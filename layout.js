import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ScreenSize } from "@/components/ui/screen-size";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClerkProvider>
          <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <header className="p-4 bg-gray-100">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
              <main className="container mx-auto p-4">
                <NuqsAdapter>{children}</NuqsAdapter>
                {process.env.ENVIRONMENT === "development" && <ScreenSize />}
              </main>
            </ThemeProvider>
          </CopilotKit>
        </ClerkProvider>
      </body>
    </html>
  );
}
