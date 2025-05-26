import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/images/nol.gif"
        alt="놀서울 로고"
        className="w-60 h-auto cursor-pointe pr-5"
      />
    </Link>
  );
};

export default Logo;
