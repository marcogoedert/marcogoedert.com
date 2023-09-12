/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

const NotFoundPage = () => (
  <div className="grid grid-cols-[1fr_minmax(auto,880px)_1fr] gap-4 items-stretch h-full">
    <div className="col-start-2 mx-auto my-0 max-w-7xl flex h-screen items-center text-gray-300 ">
      <div className=" block">
        <h1 className="font-semibold leading-relaxed text-gray-300 text-4xl">
          404 Not Found
        </h1>
        <h3 className="font-semibold leading-relaxed text-gray-300 text-xl">
          Oh no! You just got lost 😱! <br />
          Don't worry I got you!{" "}
          <Link
            href="/"
            className="text-blue-600 border-b-2 border-b-primary hover:border-b-blue-600 transition-color duration-300"
          >
            Click here
          </Link>{" "}
          to go back home.
        </h3>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
