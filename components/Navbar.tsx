"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "../constants";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  const onMenuToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <header className="fixed z-10 top-0 backdrop-blur-[8px] w-full transition-colors duration-500 border-b border-border h-16 bg-background/80">
      <div className="grid items-stretch gap-x-4 grid-cols-[1fr_minmax(auto,880px)_1fr] h-full">
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
            <p className="text-foreground text-[18px] font-bold cursor-pointer hidden md:flex">
              Marco Goedert &nbsp;
            </p>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop nav */}
            <ul className="list-none hidden sm:flex flex-row gap-10">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-foreground" : "text-muted"
                  } hover:text-foreground text-[18px] font-medium cursor-pointer transition-colors`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              ref={menuRef}
              id="menu-btn"
              type="button"
              aria-label={toggle ? "Close menu" : "Open menu"}
              aria-expanded={toggle}
              className="sm:hidden flex flex-col gap-[5px] justify-center items-center w-9 h-9 rounded-lg border border-border"
              onClick={onMenuToggle}
            >
              <span
                className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${toggle ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-opacity duration-300 ${toggle ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-transform duration-300 ${toggle ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {toggle && (
        <div className="sm:hidden absolute top-16 right-0 w-full bg-surface border-b border-border px-6 py-4 z-20">
          <ul className="list-none flex flex-col gap-4">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-foreground" : "text-muted"
                }`}
                onClick={() => {
                  setToggle(false);
                  setActive(nav.title);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
