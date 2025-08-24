/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function AdminNavbar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Project Reach Admin
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Project Reach Admin
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/dashboard")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (isActive("/admin/dashboard")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/our-impacts")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/our-impacts"
                >
                  <i
                    className={
                      "fas fa-heart mr-2 text-sm " +
                      (isActive("/admin/our-impacts")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Our Impacts
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/about-us")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/about-us"
                >
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (isActive("/admin/about-us")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  About Us
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/landing")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/landing"
                >
                  <i
                    className={
                      "fas fa-home mr-2 text-sm " +
                      (isActive("/admin/landing")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/media-upload")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/media-upload"
                >
                  <i
                    className={
                      "fas fa-upload mr-2 text-sm " +
                      (isActive("/admin/media-upload")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Media Upload
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block px-3 rounded-lg transition-all duration-200 " +
                    (isActive("/admin/communities")
                      ? "text-white bg-lightBlue-500 shadow-md"
                      : "text-blueGray-700 hover:text-lightBlue-500 hover:bg-lightBlue-50")
                  }
                  to="/admin/communities"
                >
                  <i
                    className={
                      "fas fa-upload mr-2 text-sm " +
                      (isActive("/admin/communities")
                        ? "text-white"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Communities
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
