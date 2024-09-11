export const BlogCardSkeleton = () => {
  return (
    <div className="border-b py-4 sm:py-6 w-full sm:w-1/2 animate-pulse">
      <div>
        <div className="flex flex-col sm:flex-row justify-normal">
          <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex justify-center sm:justify-start sm:ml-2 mb-2 sm:mb-0">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-center sm:justify-start sm:ml-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className="px-2 sm:px-0">
            <div className="w-full sm:w-3/4 h-6 sm:h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-2 px-2 sm:px-0">
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-3 px-2 sm:px-0">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeletonList = ({ count = 3 }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap">
      {[...Array(count)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};
