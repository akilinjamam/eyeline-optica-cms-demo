const TableSkeleton = ({ numberOfRow = 10 }: { numberOfRow?: number }) => {
  return (
    <div>
      {/* Desktop Skeleton (Table rows) */}
      <div className="hidden md:block space-y-4">
        {[...Array(numberOfRow)].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse flex items-center space-x-4 p-2 border rounded-lg bg-white"
          >
            <div className="h-6 w-12 bg-gray-300 rounded"></div>
            <div className="h-6 flex-1 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Mobile Skeleton (Cards) */}
      <div className="md:hidden space-y-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg border bg-white p-4 animate-pulse"
          >
            <div className="flex flex-col gap-3">
              {/* Simulated text rows */}
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>

              {/* Simulated action buttons */}
              <div className="flex gap-2 mt-3">
                <div className="h-8 w-12 bg-gray-300 rounded"></div>
                <div className="h-8 w-12 bg-gray-300 rounded"></div>
                <div className="h-8 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
