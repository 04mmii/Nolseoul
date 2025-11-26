const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 이미지 영역 */}
      <div className="h-40 w-full skeleton-shimmer"></div>

      <div className="p-4 space-y-3">
        {/* 제목 */}
        <div className="h-5 w-3/4 rounded-md skeleton-shimmer"></div>

        {/* 부제목 */}
        <div className="h-4 w-1/2 rounded-md skeleton-shimmer"></div>

        {/* 주소/설명 */}
        <div className="h-3 w-full rounded-md skeleton-shimmer"></div>
        <div className="h-3 w-5/6 rounded-md skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
