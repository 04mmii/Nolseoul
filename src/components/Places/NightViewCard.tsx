import { NightViewSpot } from "./NightViewList";

const NightViewCard = ({ data }: { data: NightViewSpot }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white">
      <img
        src={data.MAIN_IMG}
        alt={data.TITLE}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{data.TITLE}</h3>
        <p className="text-sm text-gray-600">{data.SUBTITLE}</p>
        <p className="text-sm text-gray-500 mt-1">{data.ADDRESS}</p>
      </div>
    </div>
  );
};

export default NightViewCard;
