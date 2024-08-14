export const BlogCardSkeleton = () => {
  return (
    <div className="border-b py-6 w-1/2 animate-pulse">
      <div>
        <div className="flex justify-normal">
          <div className="flex flex-col justify-center ml-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ml-2 mt-3">
            <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="ml-2 mt-2">
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="ml-2 mt-3">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeletonList = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </>
  );
};
