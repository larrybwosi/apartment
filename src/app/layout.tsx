import { Inter } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Living at Dealio | Apartments for Rent',
  description: 'Discover modern, spacious apartments for rent at Dealio. Enjoy top-notch amenities like a pool, gym, and 24/7 concierge. Schedule a tour today!',
  keywords: ['luxury apartments', 'apartments for rent', 'Dealio', 'modern apartments', 'apartment amenities'],
  authors: [{ name: '[Your Company Name]', url: 'https://www.yourwebsite.com' }],
  openGraph: {
    title: 'Luxury Living at Dealio | Apartments for Rent',
    description: 'Discover modern, spacious apartments for rent at Dealio. Enjoy top-notch amenities like a pool, gym, and 24/7 concierge. Schedule a tour today!',
    images: [{ url: 'https://www.yourwebsite.com/images/building-main.jpg' }], // Add a main image of the building
    url: 'https://www.yourwebsite.com', // URL of the homepage
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Living at Dealio | Apartments for Rent',
    description: 'Discover modern, spacious apartments for rent at Dealio. Enjoy top-notch amenities like a pool, gym, and 24/7 concierge. Schedule a tour today!',
    images: ['https://www.yourwebsite.com/images/building-main.jpg'], // Add a main image of the building
  },
  other: {
    // Schema.org structured data for the apartment building
    schemaOrg: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: 'Dealio',
      description: 'A luxury apartment building offering modern apartments with top-notch amenities.',
      image: 'https://www.yourwebsite.com/images/building-main.jpg',
      url: 'https://www.yourwebsite.com',
      address: {
        "@type": "PostalAddress",
        streetAddress: '[Street Address]',
        addressLocality: '[City]',
        addressRegion: '[State]',
        postalCode: '[ZIP Code]',
        addressCountry: '[Country]',
      },
      amenities: ['Pool', 'Gym', '24/7 Concierge', 'Parking', 'Fitness Center'],
      numberOfUnits: 50, // Total number of apartments in the building
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: 2000, // Minimum rent
        highPrice: 5000, // Maximum rent
        offerCount: 50, // Number of available units
      },
    }),
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-1 overflow-auto">
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </main>
      </body>
    </html>
  )
}

