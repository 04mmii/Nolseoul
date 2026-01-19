import { NightViewSpot } from "../../types/NightViewSpot";
import { useTranslation } from "react-i18next";

interface NightViewCardProps {
  spot: NightViewSpot;
}

const NightViewCard: React.FC<NightViewCardProps> = ({ spot }) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white h-full flex flex-col justify-between">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-base sm:text-lg mb-2">{spot.TITLE}</h3>
        <p className="text-gray-500 text-sm truncate mb-1">{spot.ADDR}</p>
        {spot.OPERATING_TIME && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">{t("nightViewCard.operatingHours")}:</span> {spot.OPERATING_TIME}
          </p>
        )}
        {spot.ENTR_FEE && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">{t("nightViewCard.entranceFee")}:</span> {spot.ENTR_FEE}
          </p>
        )}
        {spot.TEL_NO && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">{t("nightViewCard.phone")}:</span> {spot.TEL_NO}
          </p>
        )}
        {spot.URL && (
          <p className="text-xs text-blue-600 mb-1">
            <a href={spot.URL} target="_blank" rel="noopener noreferrer">
              {t("nightViewCard.homepage")}
            </a>
          </p>
        )}
        {spot.SUBWAY && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">{t("nightViewCard.subway")}:</span> {spot.SUBWAY}
          </p>
        )}
        {spot.BUS && (
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-medium">{t("nightViewCard.bus")}:</span> {spot.BUS}
          </p>
        )}
        {spot.CONTENT && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {spot.CONTENT}
          </p>
        )}
      </div>
    </div>
  );
};

export default NightViewCard;
