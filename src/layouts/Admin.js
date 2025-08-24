import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import AdminDashboard from "views/admin/AdminDashboard.js";
import AdminOurImpacts from "views/admin/AdminOurImpacts.js";
import AdminAboutUs from "views/admin/AdminAboutUs.js";
import AdminLanding from "views/admin/AdminLanding.js";
import AdminMedia from "views/admin/AdminMedia.js";
import AdminCommunities from "views/admin/AdminCommunities.js"

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <div className="relative pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="text-center">
              <h1 className="text-black text-3xl font-semibold">
                Admin Dashboard
              </h1>
              <p className="text-lightBlue-200 text-lg mt-2">
                Manage your Project Reach content
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="our-impacts" element={<AdminOurImpacts />} />
            <Route path="about-us" element={<AdminAboutUs />} />
            <Route path="landing" element={<AdminLanding />} />
            <Route path="media-upload" element={<AdminMedia />}/>
            <Route path="communities" element={<AdminCommunities />}/>
            <Route path="" element={<Navigate to="dashboard" replace />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
