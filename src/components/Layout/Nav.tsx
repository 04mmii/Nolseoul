const Nav = () => (
  <nav className="space-x-10 text-gray-600">
    {[
      { href: "/events", label: "문화행사" },
      { href: "/spaces", label: "문화공간" },
      { href: "/night-views", label: "야경명소" },
    ].map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="relative group inline-block px-1 py-1 text-gray-600"
      >
        {item.label}
        <span className="absolute left-1/2 bottom-0 h-[0.5px] w-0 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0 origin-center" />
      </a>
    ))}
  </nav>
);

export default Nav;
