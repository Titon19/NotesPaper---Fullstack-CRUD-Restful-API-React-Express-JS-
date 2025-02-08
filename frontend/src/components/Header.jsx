import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="flex items-center p-4">
        <div className="flex justify-between items-center p-2 px-8 bg-neutral-950 text-white w-full rounded-full shadow-2xl">
          <h1 className="text-md md:text-xl font-bold">
            <Link to={"/"}>NotesPaper</Link>
          </h1>

          <ul className="flex space-x-4 font-semibold">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/notes"}>Notes</Link>
            </li>
            <li>
              <Link to={"/categories"}>Categories</Link>
            </li>
            <li className="flex gap-5 pl-7">
              <Link to={"/auth/login"}>Login</Link>
              <Link to={"/auth/register"}>Register</Link>
              <Link to={"/logout"}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
