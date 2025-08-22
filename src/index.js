import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Leaderboard from "views/Leaderboard";
import OurImpact from "views/OurImpact.js";
import Donate from "views/donate/Donate.js";
import AboutUs from "views/AboutUs";
import Profile from "views/Profile.js";
import DonateGeneral from "views/donate/DonateGeneral";
import DonateSpecific from "views/donate/DonateSpecific";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />

      {/* add routes without layouts */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/donate/general" element={<DonateGeneral />} />
      <Route path="/donate/specific" element={<DonateSpecific />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/ourimpact" element={<OurImpact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Landing />} />
      <Route path="/" element={<Landing />} />

      {/* add redirect for first page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
