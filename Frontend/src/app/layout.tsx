
import type React from "react"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "next-themes"
import Providers from "@/components/Providers"
import { Toaster } from "@/components/ui/sonner"
import { MobileNavbar } from "@/components/Mobile-navBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FoodExpress - Local Food Delivery",
  description: "Order food from your favorite local restaurants",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FoodExpress",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
             <MobileNavbar />
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

