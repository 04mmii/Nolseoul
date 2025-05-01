import { Link } from "react-router-dom";
import logoImage from "/images/nol.gif";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logoImage}
        alt="놀서울 로고"
        className="w-60 h-auto cursor-pointe pr-5"
      />
    </Link>
  );
};

export default Logo;
