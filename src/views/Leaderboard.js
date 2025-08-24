import Navbar from "components/Navbars/AuthNavbar";
import React, { useState } from "react";

// Sample data for different districts and schools with growth percentages
const leaderboardData = {
  districts: {
    "Central & Western": {
      growthPercentage: 12.4,
      donors: [
        { name: "Alice Johnson", donations: 12, amount: 1200 },
        { name: "Michael Chen", donations: 10, amount: 1100 },
        { name: "Sarah Wong", donations: 8, amount: 950 },
        { name: "David Lee", donations: 7, amount: 800 },
        { name: "Emma Tang", donations: 6, amount: 750 },
        { name: "Jason Liu", donations: 5, amount: 650 },
        { name: "Rachel Ho", donations: 4, amount: 580 },
        { name: "Kevin Ng", donations: 4, amount: 520 },
      ],
    },
    Eastern: {
      growthPercentage: 15.8,
      donors: [
        { name: "Bob Smith", donations: 15, amount: 1500 },
        { name: "Lisa Chan", donations: 11, amount: 1200 },
        { name: "James Liu", donations: 9, amount: 980 },
        { name: "Rachel Kim", donations: 8, amount: 850 },
        { name: "Peter Wu", donations: 7, amount: 720 },
        { name: "Amy Chen", donations: 6, amount: 680 },
        { name: "Tom Zhang", donations: 5, amount: 620 },
        { name: "Sophie Lin", donations: 4, amount: 550 },
      ],
    },
    Southern: {
      growthPercentage: 13.7,
      donors: [
        { name: "Charlie Lee", donations: 13, amount: 1350 },
        { name: "Anna Lam", donations: 10, amount: 1050 },
        { name: "Kevin Zhang", donations: 9, amount: 920 },
        { name: "Sophie Chen", donations: 8, amount: 800 },
        { name: "Tony Ng", donations: 6, amount: 650 },
        { name: "Helen Wang", donations: 5, amount: 590 },
        { name: "Mark Tsui", donations: 4, amount: 510 },
        { name: "Grace Yu", donations: 3, amount: 450 },
      ],
    },
    "Wan Chai": {
      growthPercentage: 14.2,
      donors: [
        { name: "Denise Kim", donations: 14, amount: 1400 },
        { name: "Robert Chu", donations: 9, amount: 980 },
        { name: "Helen Yu", donations: 8, amount: 850 },
        { name: "Mark Tsang", donations: 7, amount: 780 },
        { name: "Grace Ho", donations: 6, amount: 680 },
        { name: "Daniel Wong", donations: 5, amount: 600 },
        { name: "Cindy Li", donations: 4, amount: 540 },
        { name: "Alex Tam", donations: 3, amount: 480 },
      ],
    },
  },
  schools: {
    "Happy Kids Kindergarten": {
      growthPercentage: 18.5,
      donors: [
        { name: "Ethan Brown", donations: 18, amount: 1800 },
        { name: "Olivia Davis", donations: 12, amount: 1250 },
        { name: "Lucas Miller", donations: 10, amount: 1050 },
        { name: "Ava Wilson", donations: 9, amount: 920 },
        { name: "Mason Taylor", donations: 7, amount: 750 },
        { name: "Emma Johnson", donations: 6, amount: 680 },
        { name: "Noah Garcia", donations: 5, amount: 620 },
        { name: "Sophia Lee", donations: 4, amount: 560 },
      ],
    },
    "Sunshine Kindergarten": {
      growthPercentage: 16.9,
      donors: [
        { name: "Isabella Garcia", donations: 16, amount: 1600 },
        { name: "William Johnson", donations: 11, amount: 1150 },
        { name: "Sophia Martinez", donations: 10, amount: 1000 },
        { name: "Alexander Brown", donations: 8, amount: 850 },
        { name: "Mia Jones", donations: 7, amount: 720 },
        { name: "James Wilson", donations: 6, amount: 660 },
        { name: "Charlotte Davis", donations: 5, amount: 580 },
        { name: "Benjamin Miller", donations: 4, amount: 520 },
      ],
    },
    "Little Stars Learning Center": {
      growthPercentage: 15.3,
      donors: [
        { name: "Benjamin Davis", donations: 14, amount: 1450 },
        { name: "Charlotte Wilson", donations: 12, amount: 1200 },
        { name: "Henry Moore", donations: 9, amount: 950 },
        { name: "Amelia Taylor", donations: 8, amount: 800 },
        { name: "Daniel Anderson", donations: 6, amount: 650 },
        { name: "Lily Thomas", donations: 5, amount: 590 },
        { name: "Jackson White", donations: 4, amount: 530 },
        { name: "Chloe Harris", donations: 3, amount: 470 },
      ],
    },
    "Rainbow Academy": {
      growthPercentage: 14.8,
      donors: [
        { name: "Victoria Thomas", donations: 13, amount: 1300 },
        { name: "Andrew Jackson", donations: 10, amount: 1050 },
        { name: "Abigail White", donations: 9, amount: 900 },
        { name: "Matthew Harris", donations: 8, amount: 820 },
        { name: "Emily Martin", donations: 7, amount: 700 },
        { name: "Ryan Thompson", donations: 6, amount: 640 },
        { name: "Zoe Garcia", donations: 5, amount: 580 },
        { name: "Lucas Robinson", donations: 4, amount: 520 },
      ],
    },
  },
};

// Component for individual leaderboard card
const LeaderboardCard = ({
  title,
  data,
  type,
  icon,
  onViewMore,
  growthPercentage,
}) => {
  const getTopThreeColors = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case 1:
        return "bg-blue-50 border-blue-400 text-blue-800";
      case 2:
        return "bg-orange-100 border-orange-400 text-orange-800";
      default:
        return "bg-white border-gray-200 text-gray-700";
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full shadow-md">
            <i className="fas fa-crown text-sm"></i>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md">
            <i className="fas fa-medal text-sm"></i>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full shadow-md">
            <i className="fas fa-award text-sm"></i>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full shadow-md">
            <span className="text-sm font-bold">{index + 1}</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div
        className={`px-6 py-4 ${
          type === "district" ? "bg-blue-500" : "bg-green-500"
        } text-white`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className={`${icon} text-2xl mr-3`}></i>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm opacity-90">
                {type === "district"
                  ? "District Leaderboard"
                  : "School Leaderboard"}
              </p>
            </div>
          </div>
          {/* <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <div className="text-sm opacity-90">Growth Rate</div>
              <div className="text-lg font-bold">+{growthPercentage}%</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="p-6">
        <div className="space-y-4">
          {data.slice(0, 3).map((donor, index) => (
            <div
              key={donor.name}
              className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${getTopThreeColors(
                index
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getRankIcon(index)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-base truncate">
                      {donor.name}
                    </p>
                    <p className="text-sm opacity-75 mt-1">
                      {donor.donations} donations
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg">${donor.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Growth Rate Display */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <i className="fas fa-chart-line text-green-600 text-lg mr-2"></i>
                <span className="text-sm font-semibold text-gray-700">
                  Overall Growth Through Results
                </span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                +{growthPercentage}%
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Positive impact achieved
              </div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onViewMore(title, data, type, growthPercentage)}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
              type === "district"
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Full Leaderboard Modal Component
const FullLeaderboardModal = ({
  isOpen,
  onClose,
  title,
  data,
  type,
  growthPercentage,
}) => {
  if (!isOpen) return null;

  const getRowColor = (index) => {
    if (index < 3) {
      return index === 0
        ? "bg-yellow-50"
        : index === 1
        ? "bg-blue-50"
        : "bg-orange-50";
    }
    return index % 2 === 0 ? "bg-white" : "bg-gray-50";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Close modal if clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div
          className={`px-6 py-4 ${
            type === "district" ? "bg-blue-500" : "bg-green-500"
          } text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i
                className={`${
                  type === "district"
                    ? "fas fa-map-marker-alt"
                    : "fas fa-school"
                } text-2xl mr-3`}
              ></i>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm opacity-90">
                  Complete {type === "district" ? "District" : "School"}{" "}
                  Leaderboard
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                title="Close modal"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Donor Name
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Amount Donated
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Donations
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((donor, index) => (
                  <tr
                    key={donor.name}
                    className={`border-b border-gray-100 hover:bg-gray-100 transition-colors duration-150 ${getRowColor(
                      index
                    )}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800">
                        {donor.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-bold text-lg text-gray-800">
                        ${donor.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {donor.donations}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Statistics */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-0 bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {data.reduce((sum, donor) => sum + donor.donations, 0)}
              </div>
              <div className="text-sm text-blue-800">Total Donations</div>
            </div>
            <div className="flex-1 min-w-0 bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                $
                {data
                  .reduce((sum, donor) => sum + donor.amount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-green-800">Total Amount</div>
            </div>
            <div className="flex-1 min-w-0 bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {data.length}
              </div>
              <div className="text-sm text-purple-800">Contributors</div>
            </div>
            <div className="flex-1 min-w-0 bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                +{growthPercentage}%
              </div>
              <div className="text-sm text-orange-800">Growth Rate</div>
            </div>
          </div>

          {/* Additional Close Button in Content Area */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className={`p-3 rounded-lg font-bold text-white transition-colors duration-200 ${
                type === "district"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Close Leaderboard
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Press ESC to close or click outside the modal
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
              >
                <i className="fas fa-times mr-2"></i>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("districts");
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    data: [],
    type: "",
    growthPercentage: 0,
  });

  const handleViewMore = (title, data, type, growthPercentage) => {
    setModalData({
      isOpen: true,
      title,
      data,
      type,
      growthPercentage,
    });
  };

  const closeModal = () => {
    setModalData({
      isOpen: false,
      title: "",
      data: [],
      type: "",
      growthPercentage: 0,
    });
  };

  // Add keyboard event listener for ESC key
  React.useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && modalData.isOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalData.isOpen]);

  return (
    <>
      <Navbar transparent />
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-60 bg-black"
            ></span>
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-4 drop-shadow-lg">
                  Donation Leaderboards
                </h1>
                <p className="text-white text-xl drop-shadow-lg">
                  Celebrating our top contributors across districts and schools
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboards Section */}
        <section className="pb-20 bg-blueGray-100 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Top Contributors</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Recognizing our most generous donors who are making a real
                      difference in education.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h6 className="text-xl font-semibold">District Impact</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      See how different districts are contributing to our
                      education initiatives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-school"></i>
                    </div>
                    <h6 className="text-xl font-semibold">School Support</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Track which schools are receiving the most community
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-center mb-8">
              <div className="w-full lg:w-6/12 px-4">
                <div className="bg-white rounded-lg shadow-lg p-2">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("districts")}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === "districts"
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      Districts
                    </button>
                    <button
                      onClick={() => setActiveTab("schools")}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === "schools"
                          ? "bg-green-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-school mr-2"></i>
                      Schools
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboards Grid */}
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                  {activeTab === "districts" &&
                    Object.entries(leaderboardData.districts).map(
                      ([district, { donors, growthPercentage }]) => (
                        <LeaderboardCard
                          key={district}
                          title={district}
                          data={donors}
                          type="district"
                          icon="fas fa-map-marker-alt"
                          onViewMore={handleViewMore}
                          growthPercentage={growthPercentage}
                        />
                      )
                    )}

                  {activeTab === "schools" &&
                    Object.entries(leaderboardData.schools).map(
                      ([school, { donors, growthPercentage }]) => (
                        <LeaderboardCard
                          key={school}
                          title={school}
                          data={donors}
                          type="school"
                          icon="fas fa-school"
                          onViewMore={handleViewMore}
                          growthPercentage={growthPercentage}
                        />
                      )
                    )}
                </div>
              </div>
            </div>

            {/* Overall Statistics */}
            <div className="flex flex-wrap mt-12">
              <div className="w-full px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Overall Impact Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Object.values(leaderboardData.districts)
                          .map(({ donors }) => donors)
                          .flat()
                          .reduce((sum, donor) => sum + donor.amount, 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-gray-600">
                        Total District Donations ($)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {Object.values(leaderboardData.schools)
                          .map(({ donors }) => donors)
                          .flat()
                          .reduce((sum, donor) => sum + donor.amount, 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-gray-600">
                        Total School Donations ($)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {Object.values(leaderboardData.districts)
                          .map(({ donors }) => donors)
                          .flat()
                          .reduce((sum, donor) => sum + donor.donations, 0) +
                          Object.values(leaderboardData.schools)
                            .map(({ donors }) => donors)
                            .flat()
                            .reduce((sum, donor) => sum + donor.donations, 0)}
                      </div>
                      <div className="text-gray-600">Total Donations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Full Leaderboard Modal */}
      <FullLeaderboardModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        data={modalData.data}
        type={modalData.type}
        growthPercentage={modalData.growthPercentage}
      />
    </>
  );
}
