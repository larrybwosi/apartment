import { Archivo } from "next/font/google"
import { Metadata } from "next"
import AdminLayout from "@/components/admin-layout"
import { headers } from "next/headers";

const inter = Archivo({ weight: "400" , subsets: ["latin"] })

function getLastPathSegment(path: string): string {
  // Remove trailing slashes (if any) and split the path into segments
  const segments = path.replace(/\/+$/, '').split('/');

  // Get the last segment
  const lastSegment = segments.pop() || '';

  // Capitalize the first letter (optional, based on your requirement)
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

export const generateMetadata =async(): Promise<Metadata>=>{
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  
  return {
    title: `Admin Panel | ${getLastPathSegment(pathname || "")}`,
    description: "Admin panel for managing the apartment features such as security check-in, guest list, and more.", 
    keywords: ["admin", "apartment", "management"],
    twitter: {
      card: "summary_large_image",
      title: "Admin Panel",
      description: "Admin panel for managing the apartment",
      images: [
        {
          url: "https://www.cheapcity.com/images/cheapcity.png",
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  )
}

