import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Home, Eye, Shield, Utensils, Dumbbell, Wifi, Star } from 'lucide-react';
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function LuxuryResidences() {
  const amenities = [
    { icon: <Utensils className="w-8 h-8" />, title: "Gourmet Kitchen", description: "Professional-grade appliances and custom cabinetry" },
    { icon: <Dumbbell className="w-8 h-8" />, title: "Fitness Center", description: "24/7 access to state-of-the-art equipment" },
    { icon: <Wifi className="w-8 h-8" />, title: "High-Speed Internet", description: "Fiber-optic connectivity throughout the building" },
  ];

  const testimonials = [
    { name: "Sarah J.", role: "Resident", text: "Living here has been an absolute dream. The attention to detail is unmatched.", stars: 5 },
    { name: "Michael R.", role: "Investor", text: "Premium quality with exceptional management services.", stars: 5 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            LUX<span className="text-primary">RESIDENCES</span>
          </h1>
          <div className="hidden md:flex space-x-8">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Amenities</Button>
            <Button variant="ghost">Contact</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
        <img
          src="/luxury-lobby.jpg"
          alt="Luxury Lobby"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Modern Urban Living
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Experience sophisticated city living in our architecturally
              significant residential tower
            </p>
            <Button size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              Schedule Tour
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Premium Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Eye className="w-12 h-12 text-primary" />
                <CardTitle>Panoramic Views</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Floor-to-ceiling windows offering breathtaking cityscapes</p>
              </CardContent>
            </Card>
            {/* Add more feature cards */}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            World-Class Amenities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="border rounded-xl p-6 text-center"
              >
                <div className="text-primary mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Resident Experiences
          </h2>
          {/* <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedTestimonials key={index} testimonials={testimonials} />
            ))}
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">Contact Our Team</CardTitle>
              <CardDescription>
                Schedule a private showing or request information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" type="email" />
                <Textarea placeholder="Message" rows={5} />
                <Button type="submit" className="w-full">
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 LuxResidences. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}