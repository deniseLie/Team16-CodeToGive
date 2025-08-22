import React, { useState, useEffect } from "react";

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    impactReach: 0,
    activeProjects: 0,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "donation",
      message: "New donation of $500 received",
      time: "2 hours ago",
      icon: "fas fa-dollar-sign",
      color: "text-emerald-500",
    },
    {
      id: 2,
      type: "project",
      message: "New project 'EdTech' added",
      time: "4 hours ago",
      icon: "fas fa-project-diagram",
      color: "text-lightBlue-500",
    },
    {
      id: 3,
      type: "impact",
      message: "Impact report updated for Q3",
      time: "6 hours ago",
      icon: "fas fa-chart-line",
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "user",
      message: "New volunteer registered",
      time: "8 hours ago",
      icon: "fas fa-user-plus",
      color: "text-orange-500",
    },
  ]);

  const [quickActions, setQuickActions] = useState([
    {
      name: "Add New Project",
      icon: "fas fa-plus",
      color: "bg-emerald-500",
      path: "/admin/projects/new",
    },
    {
      name: "View Donations",
      icon: "fas fa-hand-holding-usd",
      color: "bg-lightBlue-500",
      path: "/admin/donations",
    },
    {
      name: "Generate Report",
      icon: "fas fa-file-alt",
      color: "bg-orange-500",
      path: "/admin/reports",
    },
  ]);

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalDonations: 125000,
      totalDonors: 1250,
      impactReach: 15000,
      activeProjects: 12,
    });
  }, []);

  const handleQuickAction = (path) => {
    console.log(`Navigating to: ${path}`);
    // Add navigation logic here
  };

  const refreshData = () => {
    console.log("Refreshing dashboard data...");
    // Add data refresh logic here
  };

  return (
    <>
      <div className="flex flex-wrap">
        {/* Stats Cards Row */}
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="flex flex-wrap">
            {/* Total Donations Card */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        Total Donations
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        ${stats.totalDonations.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span className="text-emerald-500 mr-2">
                      <i className="fas fa-arrow-up"></i> 12%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Total Donors Card */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        Total Donors
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        {stats.totalDonors.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                        <i className="fas fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span className="text-emerald-500 mr-2">
                      <i className="fas fa-arrow-up"></i> 8%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Reach Card */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        Students Reached
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        {stats.impactReach.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-purple-500">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span className="text-emerald-500 mr-2">
                      <i className="fas fa-arrow-up"></i> 15%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Active Projects Card */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        Active Projects
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        {stats.activeProjects}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                        <i className="fas fa-project-diagram"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span className="text-emerald-500 mr-2">
                      <i className="fas fa-arrow-up"></i> 3%
                    </span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="w-full xl:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                    Quick Actions
                  </h6>
                  <h2 className="text-blueGray-700 text-xl font-semibold">
                    Admin Tools
                  </h2>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <button
                    onClick={refreshData}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    <i className="fas fa-sync mr-1"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 flex-auto">
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.path)}
                    className={`${action.color} text-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-150 flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <i className={`${action.icon} mr-3 text-lg`}></i>
                      <span className="font-semibold">{action.name}</span>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>

      {/* Recent Activities and Tables Row */}
      <div className="flex flex-wrap mt-4">
        {/* Recent Activities */}
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Recent Activities
                  </h3>
                </div>
                <div className="relative w-auto px-4 flex-initial">
                  <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150">
                    View All
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <div className="px-4 py-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center py-3 border-b border-blueGray-200"
                  >
                    <div className={`${activity.color} p-2 rounded-full mr-4`}>
                      <i className={`${activity.icon} text-sm`}></i>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-blueGray-700 font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-blueGray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="w-full xl:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    System Status
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto px-4 py-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-emerald-500 mr-3"></i>
                    <span className="text-sm font-medium text-blueGray-700">
                      Website Status
                    </span>
                  </div>
                  <span className="text-sm text-emerald-500 font-semibold">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-database text-emerald-500 mr-3"></i>
                    <span className="text-sm font-medium text-blueGray-700">
                      Database
                    </span>
                  </div>
                  <span className="text-sm text-emerald-500 font-semibold">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-server text-yellow-500 mr-3"></i>
                    <span className="text-sm font-medium text-blueGray-700">
                      Server Load
                    </span>
                  </div>
                  <span className="text-sm text-yellow-500 font-semibold">
                    Moderate
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-emerald-500 mr-3"></i>
                    <span className="text-sm font-medium text-blueGray-700">
                      Security
                    </span>
                  </div>
                  <span className="text-sm text-emerald-500 font-semibold">
                    Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
