import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CzarCar - Premium Car Accessories & Lighting",
  description:
    "Transform your vehicle with cutting-edge LED lighting, professional dash cams, and premium detailing tools. Premium car accessories for automotive enthusiasts.",
  keywords:
    "car accessories, LED lights, dash cam, car detailing, automotive, strobe lights, underglow, car electronics",
  authors: [{ name: "CzarCar" }],
  openGraph: {
    title: "CzarCar - Premium Car Accessories & Lighting",
    description:
      "Transform your vehicle with cutting-edge LED lighting, professional dash cams, and premium detailing tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CzarCar - Premium Car Accessories & Lighting",
    description:
      "Transform your vehicle with cutting-edge LED lighting, professional dash cams, and premium detailing tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#ffffff",
              border: "1px solid #374151",
            },
          }}
        />
      </body>
    </html>
  )
}
