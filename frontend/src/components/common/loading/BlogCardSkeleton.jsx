// BlogCardSkeleton.jsx
const BlogCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Image skeleton */}
      <div className="h-36 w-full bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-4 w-20 bg-gray-300 rounded-full" />

        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-5 bg-gray-300 rounded w-full" />

        {/* Snippet */}
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />

        {/* Footer: author & date */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-4 w-14 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
