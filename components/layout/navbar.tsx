"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthentBtn } from "../clientComponents/auth/authentBtn";

export const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const links = [
    {
      name: "thèmes coraniques",
      url: "/themes_coran",
    },
    {
      name: "thèmes hadith",
      url: "/themes_hadith",
    },
    {
      name: "mes ayats",
      url: "/mes_ayats",
    },
    {
      name: "mes thèmes",
      url: "/mes_themes",
    },
  ];

  return (
    <nav className="h-20 bg-background border-b-[1px] border-border p-5 flex justify-end tracking-widest">
      <div className="hidden md:flex items-center gap-5">
        {links.map((l) => (
          <Link key={l.name} href={l.url} className="cursor-pointer uppercase">
            {l.name}
          </Link>
        ))}
        <AuthentBtn />
      </div>
      <div></div>
      <div className="flex items-center md:hidden">
        {showMobileMenu ? (
          <X
            onClick={() => setShowMobileMenu(false)}
            className="cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setShowMobileMenu(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      <ul
        id="mobileMenu"
        className={
          showMobileMenu
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900  ease-in-out duration-500 bg-blue-950 flex flex-col text-white"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] flex flex-col "
        }
      >
        {links.map((l) => (
          <Link
            key={l.name}
            href={l.url}
            className="p-4 border-b rounded-xl duration-300  cursor-pointer border-gray-600   hover:bg-blue-900 uppercase"
          >
            {l.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
