import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useQueryState } from 'nuqs';

interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  // Use nuqs to manage the current page state in the URL
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: '1', // Default to page 1
    parse: (value) => Math.max(1, Math.min(Number(value), totalPages)), // Ensure the page is within valid range
    serialize: (value) => value.toString(), // Convert the page number to a string for the URL
  });

  // Function to generate the range of pages to display
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (Number(currentPage) <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (Number(currentPage) >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = Number(currentPage) - 1; i <= Number(currentPage) + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = generatePageNumbers();

  // Handle page change
  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page.toString()); // Update the URL query parameter
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="outline"
        className="w-[100px] bg-white hover:bg-gray-50 cursor-pointer"
        onClick={() => handlePageChange(Math.max(1, Number(currentPage) - 1))}
        disabled={Number(currentPage) === 1}
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((page, i) => (
          <Button
            key={i}
            variant="outline"
            size="icon"
            className={cn(
              "w-8 h-8 cursor-pointer",
              page === Number(currentPage) ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-white hover:bg-gray-50",
            )}
            onClick={() => handlePageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-[100px] bg-white hover:bg-gray-50 cursor-pointer"
        onClick={() => handlePageChange(Math.min(totalPages, Number(currentPage) + 1))}
        disabled={Number(currentPage) === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;