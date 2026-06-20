import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// 🔧 After your first deploy, set this to your live URL (e.g. https://adamya-portfolio.vercel.app
// or your custom domain). Everything below — canonical, OG, Twitter, JSON-LD — derives from it.
const siteUrl = "https://your-domain.com";

// Load Inter font for non-Apple devices
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adamya Varshney - Product Manager | AI & Agentic Products | Portfolio",
    template: "%s | Adamya Varshney"
  },
  description: "Portfolio of Adamya Varshney - Product Manager with 3.5+ years across 0-to-N product development, GTM strategy, and product analytics for B2B & D2C e-commerce. Shipping AI and Agentic AI products with quantifiable impact. Open to senior PM opportunities.",
  keywords: [
    "Adamya Varshney",
    "Product Manager",
    "AI Product Manager",
    "Agentic AI",
    "GTM Strategy",
    "Product Analytics",
    "B2B Product Manager",
    "D2C",
    "E-commerce Product Manager",
    "Product Management",
    "Product Lifecycle Management",
    "Roadmap Planning",
    "A/B Testing",
    "User Research",
    "RAG",
    "LangGraph",
    "LangChain",
    "Power BI",
    "SQL",
    "Python",
    "IndiaMART",
    "IIM Kashipur",
    "MBA",
    "Product Strategy",
    "AI Products",
    "Portfolio",
    "Professional Portfolio"
  ],
  authors: [
    {
      name: "Adamya Varshney",
      url: siteUrl,
    },
  ],
  creator: "Adamya Varshney",
  publisher: "Adamya Varshney",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Adamya Varshney - Product Manager | AI & Agentic Products",
    description: "Product Manager with 3.5+ years in 0-to-N product development, GTM strategy, and product analytics. Building AI & Agentic AI products with measurable impact. Chat with my AI-powered portfolio.",
    siteName: "Adamya Varshney Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Adamya Varshney - Product Manager | AI & Agentic Products",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamya Varshney - Product Manager | AI & Agentic Products",
    description: "Product Manager building AI & Agentic AI products. 0-to-N, GTM strategy, and product analytics. Chat with my AI-powered portfolio.",
    images: [{
      url: "/portfolio.png",
      alt: "Adamya Varshney - Product Manager Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Adamya Varshney",
              "jobTitle": "Product Manager - AI & Agentic Products",
              "url": siteUrl,
              "image": `${siteUrl}/profile.png`,
              "sameAs": [
                "https://github.com/Adamya-Varshney",
                "https://www.linkedin.com/in/adamya-varshney15/"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "IndiaMART InterMESH"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "Indian Institute of Management (IIM), Kashipur"
              },
              "knowsAbout": [
                "Product Management",
                "AI Product Management",
                "Agentic AI",
                "GTM Strategy",
                "Product Analytics",
                "Product Lifecycle Management",
                "User Research",
                "B2B & D2C E-commerce"
              ],
              "description": "Product Manager with 3.5+ years across 0-to-N product development, GTM strategy, and product analytics, building AI and Agentic AI products with quantifiable impact on B2B and D2C e-commerce."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
