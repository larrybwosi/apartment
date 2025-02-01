import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Home,
  Eye,
  Shield,
  Utensils,
  Dumbbell,
  Wifi,
  Star,
} from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { MotionDiv } from "@/components/motion";

export default function LuxuryResidences() {
  const amenities = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Gourmet Kitchen",
      description: "Professional-grade appliances and custom cabinetry",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Fitness Center",
      description: "24/7 access to state-of-the-art equipment",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "High-Speed Internet",
      description: "Fiber-optic connectivity throughout the building",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "24/7 Security",
      description: "Advanced security systems and concierge service",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Concierge",
      description: "Personalized assistance available around the clock",
    },
  ];

  const testimonials = [
    {
      quote:
        "Living here has exceeded all my expectations. The amenities and staff are absolutely world-class.",
      name: "Sarah Chen",
      designation: "Resident since 2024",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
    },
    {
      quote:
        "The attention to detail in every corner of this building is remarkable. It truly feels like a luxury hotel.",
      name: "Michael Rodriguez",
      designation: "Resident since 2023",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    },
    {
      quote:
        "From the stunning views to the impeccable service, this is urban living at its finest.",
      name: "Emily Watson",
      designation: "Resident since 2024",
      src: "https://images.unsplash.com/photo-1619344083978-b9e8603b54a4?q=80&w=2787&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            LUX<span className="text-primary">RESIDENCES</span>
          </h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Amenities</Button>
              <Button variant="ghost">Contact</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50" />
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2775&auto=format&fit=crop"
          alt="Luxury Lobby"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="container mx-auto px-4 relative">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Elevate Your <span className="text-primary">Lifestyle</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Experience sophisticated city living in our architecturally
              significant residential tower
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <Home className="w-5 h-5" />
                Schedule Tour
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              Premium Features
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Discover a new standard of luxury living with our carefully
              curated amenities
            </p>
          </MotionDiv>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <Eye className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Panoramic Views</CardTitle>
                <CardDescription>
                  Floor-to-ceiling windows offering breathtaking cityscapes
                </CardDescription>
              </CardHeader>
            </Card>
            {/* Add similar cards for other features */}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            World-Class Amenities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="border rounded-xl p-8 text-center bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="text-primary mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Resident Experiences
          </h2>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
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
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone" type="tel" />
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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Our Story</li>
                <li>Location</li>
                <li>Team</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Amenities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Features</li>
                <li>Services</li>
                <li>Floor Plans</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email Us</li>
                <li>Schedule Tour</li>
                <li>Leasing Office</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>© 2025 LuxResidences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
