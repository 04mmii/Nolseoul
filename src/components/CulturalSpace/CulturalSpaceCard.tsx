type CulturalSpace = {
  FAC_NAME: string;
  ADDR: string;
  MAIN_IMG: string;
  SUBJCODE: string;
};

const CulturalSpaceCard = ({ space }: { space: CulturalSpace }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-3">
      <img
        src={space.MAIN_IMG}
        alt={space.FAC_NAME}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <h3 className="font-bold text-lg">{space.FAC_NAME}</h3>
        <p className="text-sm text-gray-600">{space.ADDR}</p>
        <p className="text-xs mt-1 text-gray-400">{space.SUBJCODE}</p>
      </div>
    </div>
  );
};

export default CulturalSpaceCard;
