import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CornerLeftDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ReviewReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: {
    name: string;
    avatar: string;
    totalSpent: number;
    rating: number;
    text: string;
    date: string;
  };
}

const ReviewReplyDialog: React.FC<ReviewReplyDialogProps> = ({
  open,
  onOpenChange,
  review
}) => {
  const [replyText, setReplyText] = useState<string>('');
  
  if (!open) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-end z-50"
      onClick={() => onOpenChange(false)} // Close sidebar when clicking outside
    >
      <div 
        className="bg-white h-full w-full max-w-[600px] flex flex-col relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b">
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer info section */}
          <div className="flex items-center mb-4">
            <div className="mr-4">
              {review.avatar ? (
                <Avatar className='w-20 h-20'>
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  {review.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm">{review.rating.toFixed(1)} out of 5</span>
              </div>
            </div>
            <div className="ml-auto">
              <div className="text-right font-semibold text-lg">${review.totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div className="text-xs text-gray-500">Total Spent</div>
            </div>
          </div>

          {/* Review text */}
          <div className="mb-6 text-gray-800">
            <p className="mb-4 text-lg">{review.text}</p>
            {review.text.includes("air conditioning") && (
              <p className="mb-4">The air conditioning barely did its job, so it was pretty uncomfortable, and the noise from the other rooms and outside kept me awake most of the night.</p>
            )}
          </div>

          {/* Reply section */}
          <div className="mb-4">
            <h4 className="text-sm text-gray-500 mb-2">Reply Review</h4>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 min-h-24 text-sm"
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
          </div>

          {/* AI reply button */}
          <CornerLeftDown className='text-gray-400' />
          <div className="flex justify-between items-center mb-4">
            <button className="flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <span>Reply by AI generated</span>
              <span className="ml-1 bg-yellow-400 text-xs px-1 rounded">AI</span>
            </button>
          </div>
        </div>

        {/* Footer with navigation and submit button */}
        <div className="border-t p-4 flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <button className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={16} />
              <span className="ml-1">Previous</span>
            </button>
            <div className="mx-2 flex items-center">
              <span className="mx-1">1</span>
              <span>/</span>
              <span className="mx-1">3</span>
            </div>
            <button className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
              <span className="mr-1">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewReplyDialog;