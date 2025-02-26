'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Briefcase,
  ChevronRight,
  Menu,
  X,
  Clock,
  Shield,
  Home,
  Heart
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">LuxeHaven Residences</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Residences</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink href="/apartments">Available Units</NavigationMenuLink>
                      <NavigationMenuLink href="/virtual-tours">Virtual Tours</NavigationMenuLink>
                      <NavigationMenuLink href="/amenities">Amenities</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink href="/events">Events</NavigationMenuLink>
                      <NavigationMenuLink href="/gallery">Gallery</NavigationMenuLink>
                      <NavigationMenuLink href="/residents">Residents Portal</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/careers">Careers</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <Button className="hidden md:flex">Schedule a Tour</Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/apartments" className="flex items-center justify-between py-2">
                Available Units <ChevronRight className="h-4 w-4" />
              </Link>
              <a href="/virtual-tours" className="flex items-center justify-between py-2">
                Virtual Tours <ChevronRight className="h-4 w-4" />
              </a>
              <a href="/amenities" className="flex items-center justify-between py-2">
                Amenities <ChevronRight className="h-4 w-4" />
              </a>
              <a href="/careers" className="flex items-center justify-between py-2">
                Careers <ChevronRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="flex items-center justify-between py-2">
                Contact <ChevronRight className="h-4 w-4" />
              </a>
              <Button className="w-full">Schedule a Tour</Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25 z-10" />
    <img
      src="/api/placeholder/1920/1080"
      alt="Luxury Apartment Building"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="container mx-auto px-4 relative z-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Elevate Your Living Experience
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Discover luxury living in the heart of the city. Premium amenities, stunning views, and exceptional service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View Available Units
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
            Schedule a Tour
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Premium Amenities</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Home,
            title: "Luxury Units",
            description: "Spacious floor plans with premium finishes and stunning city views"
          },
          {
            icon: Heart,
            title: "Wellness Center",
            description: "State-of-the-art fitness center and yoga studio"
          },
          {
            icon: Users,
            title: "Community Spaces",
            description: "Rooftop lounge, co-working space, and entertainment areas"
          },
          {
            icon: Shield,
            title: "24/7 Security",
            description: "Round-the-clock security and controlled access"
          },
          {
            icon: Clock,
            title: "Concierge Service",
            description: "Professional staff available to assist you"
          },
          {
            icon: Calendar,
            title: "Regular Events",
            description: "Community gatherings and social events"
          }
        ].map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Careers = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-600">
          Be part of a dynamic team dedicated to providing exceptional living experiences
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Property Manager",
            type: "Full-time",
            location: "On-site",
            description: "Lead our property management team and ensure resident satisfaction"
          },
          {
            title: "Maintenance Technician",
            type: "Full-time",
            location: "On-site",
            description: "Maintain and repair building systems and resident units"
          }
        ].map((job, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>
              <p className="text-gray-600">{job.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant="outline">View All Positions</Button>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p>123 Luxury Lane, Metropolitan City</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p>info@luxehaven.com</p>
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <h3 className="text-xl font-semibold mb-4">Leasing Office Hours</h3>
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 5:00 PM</p>
                <p>Sunday: 12:00 PM - 4:00 PM</p>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Your message"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-8 w-8" />
            <span className="text-xl font-bold">LuxeHaven</span>
          </div>
          <p className="text-gray-400">
            Luxury living redefined in the heart of the city
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link href="/apartments" className="block text-gray-400 hover:text-white">Available Units</Link>
            <a href="/amenities" className="block text-gray-400 hover:text-white">Amenities</a>
            <a href="/gallery" className="block text-gray-400 hover:text-white">Gallery</a>
            <a href="/contact" className="block text-gray-400 hover:text-white">Contact</a>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Residents</h4>
          <nav className="space-y-2">
            <a href="/resident-portal" className="block text-gray-400 hover:text-white">Resident Portal</a>
            <a href="/maintenance" className="block text-gray-400 hover:text-white">Maintenance</a>
            <a href="/events" className="block text-gray-400 hover:text-white">Events</a>
            <a href="/policies" className="block text-gray-400 hover:text-white">Policies</a>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <nav className="space-y-2">
            <a href="/careers" className="block text-gray-400 hover:text-white">Careers</a>
            <a href="/news" className="block text-gray-400 hover:text-white">News</a>
            <a href="/instagram" className="block text-gray-400 hover:text-white">Instagram</a>
            <a href="/facebook" className="block text-gray-400 hover:text-white">Facebook</a>
          </nav>
        </div>
      </div>
      <Separator className="my-8 bg-gray-800" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © 2025 LuxeHaven Residences. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
          <a href="/accessibility" className="text-gray-400 hover:text-white text-sm">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component
const ApartmentBuilding = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16"> {/* Add padding to account for fixed header */}
        <Hero />
        <Features />
        
        {/* Virtual Tours Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Experience Your Future Home</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take a virtual tour of our stunning apartments and amenities from the comfort of your current home
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/api/placeholder/800/450"
                    alt="Virtual Tour - One Bedroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <Button size="lg" className="bg-white/90 hover:bg-white text-black">
                      Tour One Bedroom
                    </Button>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src="/api/placeholder/800/450"
                    alt="Virtual Tour - Two Bedroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <Button size="lg" className="bg-white/90 hover:bg-white text-black">
                      Tour Two Bedroom
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Residents Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "Living at LuxeHaven has exceeded all my expectations. The amenities and staff are incredible!",
                  author: "Sarah M.",
                  role: "Resident since 2024"
                },
                {
                  text: "The perfect balance of luxury and comfort. The community events make it feel like home.",
                  author: "James P.",
                  role: "Resident since 2023"
                },
                {
                  text: "Exceptional service and beautiful apartments. Couldn't ask for a better place to live.",
                  author: "Emily R.",
                  role: "Resident since 2024"
                }
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">&ldquo;{testimonial.text}&ldquo;</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ApartmentBuilding;