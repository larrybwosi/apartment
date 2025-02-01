import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Home } from 'lucide-react'
import { MotionDiv } from '../motion'
import { AnimatedTestimonials } from '../ui/animated-testimonials'

const projects = [
  {
    id: 1,
    title: 'The Penthouse Collection',
    description: 'Luxurious penthouses with panoramic city views and private terraces',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    features: ['Panoramic Views', 'Private Terrace', 'Smart Home'],
    status: 'Available',
  },
  {
    id: 2,
    title: 'Sky Lofts',
    description: 'Modern loft-style apartments with floor-to-ceiling windows',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    features: ['High Ceilings', 'Open Plan', 'City Views'],
    status: 'Coming Soon',
  },
  {
    id: 3,
    title: 'Garden Residences',
    description: 'Ground-floor units with private gardens and outdoor living spaces',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    features: ['Private Garden', 'Outdoor Space', 'Pet Friendly'],
    status: 'Limited',
  },
  {
    id: 4,
    title: 'Urban Studios',
    description: 'Efficiently designed studios perfect for modern city living',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    features: ['Smart Layout', 'Modern Design', 'Central Location'],
    status: 'Available',
  },
]

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function ProjectsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted" id="projects">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <MotionDiv variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Residences
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our collection of premium living spaces
            </p>
          </MotionDiv>

          <MotionDiv
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {projects.map((project) => (
              <MotionDiv key={project.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <Badge
                        variant={
                          project.status === "Available"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full space-x-2">
                      <Home className="w-4 h-4" />
                      <span>View Details</span>
                    </Button>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv variants={itemVariants} className="text-center mt-12">
            <Button size="lg" variant="outline" className="space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>View All Residences</span>
            </Button>
          </MotionDiv>
        </MotionDiv>
      </div>

      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Resident Experiences
          </h2>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>
    </section>
  );
}