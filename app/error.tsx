"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const onReset = () => {
    reset();
  };

  return (
    <div className="grid grid-cols-[1fr_minmax(auto,880px)_1fr] gap-4 items-stretch h-full">
      <div className="col-start-2 mx-auto my-0 max-w-7xl flex h-screen items-center text-gray-300 ">
        <div className=" block">
          <h1 className="font-semibold leading-relaxed text-gray-300 text-4xl">
            500 - Internal Server Error
          </h1>
          <h3 className="font-semibold leading-relaxed text-gray-300 text-xl">
            Oops, something went wrong 💩!
            <br />
            You can{" "}
            <button
              className="text-blue-600 border-b-2 border-b-primary hover:border-b-blue-600 transition-color duration-300"
              onClick={onReset}
            >
              try again
            </button>{" "}
            or go to the{" "}
            <Link
              href="/"
              className="text-blue-600 border-b-2 border-b-primary hover:border-b-blue-600 transition-color duration-300"
            >
              Home page
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
