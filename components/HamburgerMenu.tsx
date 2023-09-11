import { useCallback, useRef } from "react";

export const HamburgerMenu = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => {
    buttonRef.current!.classList.toggle("open");
  }, []);

  return (
    <>
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
    </>
  );
};
