"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { navLinks } from "../constants";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => {
    buttonRef.current!.classList.toggle("open");
    setToggle((prev) => !prev);
  }, []);

  return (
    <header className="fixed z-10 top-0 backdrop-blur-[8px] w-full transition-color duration-500 border-b border-primary h-16">
      <div className="grid items-stretch gap-x-4 gap-y-24 grid-cols-[1fr_minmax(auto,880px)_1fr] h-full">
        <div className="col-start-2 flex gap-1 justify-between items-center flex-nowrap">
          <Link
            prefetch={false}
            href="#home"
            className="flex items-center gap-4"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <div className="w-9 h-9 object-contain bg-navbar-logo-dark bg-cover" />
            <p className="text-white text-[18px] font-bold cursor-pointer hidden md:flex">
              Marco Goedert &nbsp;
            </p>
          </Link>
          <div>
            <ul className="list-none hidden sm:flex flex-row gap-10">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
              <button
                ref={buttonRef}
                id="menu-btn"
                type="button"
                className="z-40 block bg-transparent border-0 mt-1 mr-3 hamburger focus:outline-none lg:hidden"
                onClick={onClick}
              >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>

              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(nav.title);
                      }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
