import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../assets/profile.jpg";
import { getDecodedJwt } from "../utils/jwt";

interface NavbarRoute {
  path: string;
  label: string;
}

export default function Navbar() {
  const [role, setRole] = useState("user");

  useEffect(() => {
    const tokenPayload = getDecodedJwt();
    if (tokenPayload) {
      setRole(tokenPayload.role);
    }
  }, []);

  const userOption: NavbarRoute[] = [
    {
      path: "/exercise-history",
      label: "History Exercise",
    },
    {
      path: "/",
      label: "Home",
    },
  ];
  const adminOption: NavbarRoute[] = [
    {
      path: "/verification",
      label: "Verification",
    },
    {
      path: "/",
      label: "Home",
    },
  ];

  const generateLinks = (options: NavbarRoute[]) => {
    return options.map((opt: NavbarRoute) => (
      <Link to={opt.path} key={opt.path}>
        <label className="hover:cursor-pointer hover:text-black transition duration-300 ease-in-out">
          {opt.label}
        </label>
      </Link>
    ));
  };
  return (
    <nav className="px-2 sm:px-6 lg:px-8 bg-purpleBg w-full sticky">
      <div className="w-full flex flex-row h-16 items-center justify-end gap-6">
        <div className="flex flex-row justify-center items-center gap-4 text-white">
          {role === "user"
            ? generateLinks(userOption)
            : generateLinks(adminOption)}
        </div>

        <img
          src={profileImage}
          className="w-8 h-8 rounded-full"
          alt="Gambar Profile"
        />
      </div>
    </nav>
  );
}
