import Link from 'next/link'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold text-lg">Urban Heights</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Luxury living redefined in the heart of the city.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apartments" className="text-sm hover:text-primary transition-colors">
                  Available Units
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="text-sm hover:text-primary transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/virtual-tour" className="text-sm hover:text-primary transition-colors">
                  Virtual Tour
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Urban Street, Cityville</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@urbanheights.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Office Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Monday - Friday: 9AM - 6PM</li>
              <li>Saturday: 10AM - 4PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Urban Heights. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}