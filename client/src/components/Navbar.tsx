import { NavLink } from "react-router";
import { User } from "./User";

const LINKS = [
  { name: "Categories", to: "/categories" },
  { name: "Products", to: "/products" },
];

export const Navbar = () => {
  return (
    <div className="w-full h-16 bg-green-50 shadow flex items-center px-4 text-gray-700">
      <User />
      <div className="flex-1" />
      {LINKS.map((link) => (
        <NavLink to={link.to} key={link.to} className="mx-2 hover:underline">
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};
