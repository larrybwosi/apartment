import { SearchBar } from "./components/search-bar";
import { FilterOptions } from "./components/filter-options";
import { SortOptions } from "./components/sort-options";
import { Pagination } from "./components/pagination";
import { getApartments, getCategories } from "@/app/actions/apartments";
import { Metadata } from "next";
import { ApartmentGrid } from "@/components/apartment/apartment-grid";


export const metadata: Metadata = {
  title: 'Find Your Perfect Apartment | Search, Filter & View Listings',
  description: 'Explore a wide range of apartments for rent or sale. Filter by price, size, amenities, and more to find the ideal home.',
  keywords: ['apartments for rent', 'apartments for sale', 'find apartments', 'apartment listings', 'apartment search', 'real estate', 'apartments near me'],
  authors: [{ name: 'Larry Bwosi', url: 'https://www.yourwebsite.com' }],
  openGraph: {
    title: 'Find Your Perfect Apartment | Search, Filter & View Listings',
    description: 'Explore a wide range of apartments for rent or sale. Filter by price, size, amenities, and more to find the ideal home.',
    images: [{ url: 'URL_to_image_for_preview' }], // Add an image URL for social preview
    url: 'https://cheapcity.vercel.app/apartments', // URL of the apartments page
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Apartment | Search, Filter & View Listings',
    description: 'Explore a wide range of apartments for rent or sale. Filter by price, size, amenities, and more to find the ideal home.',
    images: ['URL_to_image_for_preview'], // Add an image URL for Twitter preview
  },
  other: {
    // Schema.org structured data
    schemaOrg: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: 'Find Your Perfect Apartment | Search, Filter & View Listings',
      description: 'Explore a wide range of apartments for rent or sale. Filter by price, size, amenities, and more to find the ideal home.',
      url: 'https://www.yourwebsite.com/apartments',
      mainEntityOfPage: {
        "@type": "ApartmentComplex",
        name: 'Apartment Listings',
        description: 'Browse apartments for rent or sale with various sizes, prices, and amenities.',
        offers: {
          "@type": "Offer",
          priceCurrency: "KSH", // Adjust currency if needed
          priceRange: '500-5000', // Adjust price range according to your listings
          eligibleRegion: {
            "@type": "Place",
            name: 'City or Region', // Replace with relevant city or region
          },
          availability: 'InStock',
          validFrom: '2025-01-01', // Adjust to match your available listing dates
        },
      },
    }),
  },
};

type SearchParams = Promise<{
  query?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  page?: string;
  exposure?: string;
  features?: string[];
  petsAllowed?: string;
  furnished?: string;
  status?: string;
  categoryType?: string;
  amenities?: string[];
}>
export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    query,
    sort,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    page,
    exposure,
    // features,
    // petsAllowed,
    // furnished,
    // status,
    //  categoryType, amenities,
  } = await searchParams;

  const apartments = await getApartments({
    query: query as string,
    sort: sort as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
    bathrooms: bathrooms ? Number(bathrooms) : undefined,
    page: page ? Number(page) : 1,
    exposure: exposure as string,
    // amenities: amenities as string[],
    // features: features as string[],
    // categoryType: categoryType as string,
    // furnished: furnished === "true",
    // petsAllowed: petsAllowed === "true",
    // status: status as string,
  });

  const categories = await getCategories();
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Find Your Perfect Apartment
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore a wide range of apartments tailored to your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar defaultValue={query as string} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <FilterOptions
                defaultValues={{
                  minPrice: minPrice as string,
                  maxPrice: maxPrice as string,
                  bedrooms: bedrooms as string,
                  bathrooms: bathrooms as string,
                }}
                categories={categories}
                amenityOptions={[]}
              />
            </div>
          </div>

          {/* Apartment Grid and Sorting */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {apartments?.data.length} of {apartments.total}{" "}
                apartments
              </p>
              <SortOptions defaultValue={sort as string} />
            </div>

            {/* Apartment Grid */}
            <ApartmentGrid apartments={apartments.data} />

            {/* Pagination */}
            {apartments.total > apartments.data.length && (
              <div className="mt-8">
                <Pagination
                  currentPage={page ? Number(page) : 1}
                  totalPages={Math.ceil(apartments.total / 12)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
