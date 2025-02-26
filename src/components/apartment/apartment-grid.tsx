import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Expand, Calendar, Building2, Heart, LucideIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Apartment } from "@/types";
import { MotionDiv } from "../motion";
import { SanityAssetDocument } from "next-sanity";

// Property Feature Badge Component
const FeatureBadge = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
    <Icon className="h-3.5 w-3.5" />
    <span className="text-sm">{label}</span>
  </Badge>
);

// Property Image Component
const PropertyImage = ({
  image,
  title,
  isFeatured,
}: {
  image: SanityAssetDocument;
  title: string;
  isFeatured?: boolean;
}) => (
  <div className="group relative overflow-hidden rounded-t-lg">
    <Image
      src={urlFor(image.asset).width(400).format("webp").url()}
      alt={title}
      fill
      className="object-cover transition-all duration-300 group-hover:scale-110"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
    {isFeatured && (
      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground z-10">
        Featured
      </Badge>
    )}
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-3 left-3 bg-white/80 hover:bg-white/90 z-10"
    >
      <Heart className="h-5 w-5 text-primary" />
    </Button>
  </div>
);

// Property Card Component
const PropertyCard = ({ apartment }: { apartment: Apartment }) => {
  const { title, mainImage, featured, rental, specifications, court, slug } =
    apartment;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
        <PropertyImage image={mainImage} title={title} isFeatured={featured} />

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
              <p className="mt-2 text-2xl font-bold text-primary">
                ${rental?.price?.toLocaleString()}/mo
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <FeatureBadge
                icon={Bed}
                label={`${specifications?.bedrooms} ${
                  specifications?.bedrooms === 1 ? "Bed" : "Beds"
                }`}
              />
              <FeatureBadge
                icon={Bath}
                label={`${specifications?.bathrooms} ${
                  specifications?.bathrooms === 1 ? "Bath" : "Baths"
                }`}
              />
              <FeatureBadge
                icon={Expand}
                label={`${specifications?.squareFootage} sqft`}
              />
              <FeatureBadge icon={Building2} label={court?.name} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Available {new Date(rental?.availableDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href={`/apartments/${slug.current}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

// Main Grid Component
export function ApartmentGrid({ apartments }: { apartments: Apartment[] }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment) => (
            <PropertyCard key={apartment._id} apartment={apartment} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ApartmentGrid;
