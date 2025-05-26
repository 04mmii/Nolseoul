import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { href: "/events", label: "문화행사" },
  { href: "/spaces", label: "문화공간" },
  { href: "/night-views", label: "야경명소" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 햄버거 버튼 (모바일 전용) */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:flex space-x-10 text-gray-600">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="relative group inline-block px-1 py-1 text-gray-600"
          >
            {item.label}
            <span className="absolute left-1/2 bottom-0 h-[0.5px] w-0 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0 origin-center" />
          </Link>
        ))}
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-10 right-0 z-10 bg-white border shadow-md rounded-md flex flex-col gap-2 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-gray-700 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nav;
