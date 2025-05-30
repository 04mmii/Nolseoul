import { Link } from "react-router-dom";
import { CulturalSpace } from "../../types/CulturalSpace";

interface Props {
  space: CulturalSpace;
}

const CulturalSpaceCard = ({ space }: Props) => {
  return (
    <Link to={`/spaces/${space.NUM}`}>
      <div className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition h-full">
        <img
          src={space.MAIN_IMG}
          alt={space.FAC_NAME}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-2 leading-snug ">
          <h3 className="font-bold text-lg truncate">{space.FAC_NAME}</h3>
          <p className="text-sm text-gray-600 truncate">{space.ADDR}</p>
          <p className="text-xs mt-1 text-gray-400 truncate">
            {space.SUBJCODE}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CulturalSpaceCard;
