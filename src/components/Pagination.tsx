import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 pb-6">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:border-purple-600 hover:bg-purple-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </Button>

      <span className="text-lg font-semibold text-gray-800 px-6 py-2 rounded-full bg-gradient-to-r from-purple-200 to-purple-400 shadow-md">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:border-purple-600 hover:bg-purple-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </Button>
    </div>
  );
};

export default Pagination;
