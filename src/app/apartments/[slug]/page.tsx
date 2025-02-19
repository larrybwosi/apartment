import { getApartment, getSimilarApartments } from '@/app/actions/apartments';
import { ApartmentDetails } from '@/components/apartment-details'
import { SimilarApartments } from '@/components/similar-apartments'
import { urlFor } from '@/sanity/lib/image';
import { Metadata } from 'next';

type Params = Promise<{ slug: string }>;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
 

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch the apartment details using the slug
  const slug = (await params).slug;
  const apartment = await getApartment(slug);

  if (!apartment) {
    return {
      title: 'Apartment Not Found',
      description: 'The requested apartment could not be found.',
    };
  }

  // Construct the metadata dynamically
  return {
    title: `${apartment.title} | ${apartment.location}`,
    description: apartment.description,
    openGraph: {
      title: `${apartment.title} | ${apartment.location}`,
      description: apartment.description,
      images: [
        {
          url: urlFor(apartment.mainImage).width(800).height(600).url(), // Use the main image for the social preview
          alt: apartment.title,
        },
      ],
      url: `https://www.cheapcity.vercel.app/apartments/${apartment.slug.current}`, // Dynamic URL for the apartment
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${apartment.title} | ${apartment.location}`,
      description: apartment.description,
      images: [apartment.mainImage], // Use the main image for Twitter preview
    },
    other: {
      // Schema.org structured data for the apartment
      schemaOrg: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Apartment",
        name: apartment.title,
        description: apartment.description,
        image: apartment.mainImage,
        url: `https://www.cheapcity.vercel.app/apartments/${apartment.slug.current}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: apartment.location,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD", // Adjust currency if needed
          price: apartment.rental.price,
          availability: apartment.rental.availableDate
            ? new Date(apartment.rental.availableDate) > new Date()
              ? 'InStock'
              : 'OutOfStock'
            : 'InStock',
          validFrom: apartment.rental.availableDate,
        },
        numberOfRooms: apartment.specifications.bedrooms,
        floorSize: {
          "@type": "QuantitativeValue",
          value: apartment.specifications.squareFootage,
          unitText: "sqft",
        },
      }),
    },
  };
}


export default async function ApartmentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const apartment = await getApartment(slug);
  const similarApartments = await getSimilarApartments(
    slug,
    apartment?.category?.slug.current as string
  );

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <ApartmentDetails apartment={apartment} />
        <SimilarApartments apartments={similarApartments} />
      </div>
    </main>
  );
}

