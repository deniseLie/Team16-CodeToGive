/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const [navbarPages, setNavbarPages] = React.useState([
    { name: "Home", path: "/" },
    { name: "Donate", path: "/donate" },
    { name: "Our Impacts", path: "/ourimpact" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Admin", path: "/admin/dashboard" },
    { name: "About us", path: "/aboutus" },
  ]);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          {/* Logo Left */}
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Project Reach
            </Link>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* Right Navbar */}
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* Render Navbars */}
              {navbarPages.map((page, index) => (
                <li className="flex items-center" key={index}>
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to={page.path}
                  >
                    <span className="inline-block ml-2">{page.name}</span>
                  </Link>
                </li>
              ))}

              {/* Profile */}
              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/profile"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-user-circle text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
