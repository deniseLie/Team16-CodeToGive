import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Leaderboard from "views/Leaderboard";
import OurImpact from "views/OurImpact.js";
import Donate from "views/Donate";
import AboutUs from "views/AboutUs";
import Profile from "views/Profile.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/donate" component={Donate} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/ourimpact" component={OurImpact} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Landing} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
