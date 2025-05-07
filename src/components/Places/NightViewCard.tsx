import { NightViewSpot } from "../../types/NightViewSpot";

interface NightViewCardProps {
  spot: NightViewSpot;
}

const NightViewCard: React.FC<NightViewCardProps> = ({ spot }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <img
        src={spot.MAIN_IMG || "/default-nightview.jpg"}
        alt={spot.TITLE}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{spot.TITLE}</h3>
        <p className="text-gray-500 truncate mb-1">{spot.ADDR}</p>
        {spot.OPERATING_TIME && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">운영시간:</span> {spot.OPERATING_TIME}
          </p>
        )}
        {spot.ENTR_FEE && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">이용요금:</span> {spot.ENTR_FEE}
          </p>
        )}
        {spot.TEL_NO && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">전화번호:</span> {spot.TEL_NO}
          </p>
        )}
        {spot.URL && (
          <p className="text-xs text-blue-600 mb-1">
            <a href={spot.URL} target="_blank" rel="noopener noreferrer">
              홈페이지 바로가기
            </a>
          </p>
        )}
        {spot.SUBWAY && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">지하철:</span> {spot.SUBWAY}
          </p>
        )}
        {spot.BUS && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">버스:</span> {spot.BUS}
          </p>
        )}
        {spot.CONTENT && (
          <p className="text-sm text-gray-600 mt-2">{spot.CONTENT}</p>
        )}
      </div>
    </div>
  );
};

export default NightViewCard;
