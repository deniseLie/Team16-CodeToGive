import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const impacts = [
  {
    title: "Children Supported",
    value: "2,500+",
    description:
      "Children have received educational support and resources through our programs.",
    icon: "fas fa-child",
    color: "bg-yellow-400",
  },
  {
    title: "Meals Provided",
    value: "50,000+",
    description: "Nutritious meals distributed to families in need.",
    icon: "fas fa-utensils",
    color: "bg-green-400",
  },
  {
    title: "Volunteers Engaged",
    value: "800+",
    description: "Community volunteers actively making a difference.",
    icon: "fas fa-hands-helping",
    color: "bg-blue-400",
  },
  {
    title: "Campaigns Completed",
    value: "35",
    description: "Successful charity campaigns run since our founding.",
    icon: "fas fa-bullhorn",
    color: "bg-pink-400",
  },
];

export default function OurImpact() {
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
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                Together, We Make a Difference
              </h2>
              <p className="text-blueGray-600 mb-6">
                Every donation, every volunteer hour, and every campaign helps us
                reach more children and families in need. Thank you for being part
                of our journey!
              </p>
              <a
                href="/donate"
                className="bg-lightBlue-500 text-white px-6 py-3 rounded font-bold shadow hover:bg-lightBlue-600 transition"
              >
                Donate Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
