import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import TestimonialSection from "./OurImpact/TestimonialSection";
import DonationSection from "./OurImpact/DonationSection";
import DiariesSection from "./OurImpact/Diaries";

export default function OurImpact() {
  const [impacts, setImpacts] = useState([]);

  useEffect(() => {
    // Load impacts from localStorage
    const savedImpacts = localStorage.getItem("projectReachImpacts");
    if (savedImpacts) {
      setImpacts(JSON.parse(savedImpacts));
    } else {
      // Fallback to default impacts
      const defaultImpacts = [
        {
          id: 1,
          title: "Children Supported",
          value: "2,500+",
          description:
            "Children have received educational support and resources through our programs.",
          icon: "fas fa-child",
          color: "bg-yellow-400",
        },
        {
          id: 2,
          title: "Meals Provided",
          value: "50,000+",
          description: "Nutritious meals distributed to families in need.",
          icon: "fas fa-utensils",
          color: "bg-green-400",
        },
        {
          id: 3,
          title: "Volunteers Engaged",
          value: "800+",
          description: "Community volunteers actively making a difference.",
          icon: "fas fa-hands-helping",
          color: "bg-blue-400",
        },
        {
          id: 4,
          title: "Campaigns Completed",
          value: "35",
          description: "Successful charity campaigns run since our founding.",
          icon: "fas fa-bullhorn",
          color: "bg-pink-400",
        },
      ];
      setImpacts(defaultImpacts);
    }
  }, []);

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
                Our Impact
              </h1>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {impacts.map((impact, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-8 flex flex-col items-center"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 text-white text-3xl ${impact.color}`}
                  >
                    <i className={impact.icon}></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">{impact.value}</div>
                  <div className="text-lg font-semibold mb-2">
                    {impact.title}
                  </div>
                  <div className="text-blueGray-500 text-center">
                    {impact.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories */}
        <DiariesSection />

        {/* Testimonials */}
        <TestimonialSection />

        {/* Donation */}
        <DonationSection />
      </main>
      <Footer />
    </>
  );
}
