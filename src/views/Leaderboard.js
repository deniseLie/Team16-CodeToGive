import Navbar from "components/Navbars/AuthNavbar";
import React from "react";

const leaderboardData = [
  { name: "Alice Johnson", donations: 12, amount: 1200 },
  { name: "Bob Smith", donations: 9, amount: 950 },
  { name: "Charlie Lee", donations: 8, amount: 850 },
  { name: "Denise Kim", donations: 8, amount: 800 },
  { name: "Ethan Brown", donations: 7, amount: 750 },
];

export default function Leaderboard() {
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
                <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
                  Top Donors Leaderboard
                </h1>
              </div>
            </div>
          </section>

          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
              <table className="w-full table-auto">
                  <thead>
                  <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Rank</th>
                      <th className="px-4 py-2 text-left">Donor Name</th>
                      <th className="px-4 py-2 text-left">Donations</th>
                      <th className="px-4 py-2 text-left">Total Amount ($)</th>
                  </tr>
                  </thead>
                  <tbody>
                  {leaderboardData.map((donor, idx) => (
                      <tr key={donor.name} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{donor.name}</td>
                      <td className="px-4 py-2">{donor.donations}</td>
                      <td className="px-4 py-2">{donor.amount}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
        </main>
    </>
  );
}