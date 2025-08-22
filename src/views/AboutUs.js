import React from "react";
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer";

export default function AboutUs() {
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
                    "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')",
                }}
            >
                <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-75 bg-black"
                ></span>
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                    <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                        About Us
                    </h1>
                    </div>
                </div>
                </div>
            </div>
        </section>

        {/* About Us Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-blueGray-700">
                Who We Are
              </h2>
              <p className="text-blueGray-600 mb-6 text-lg text-center">
                REACH is a charity dedicated to empowering children and families in need through education, nutrition, and community support. Our mission is to create lasting change by providing resources, opportunities, and hope to those who need it most.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-blueGray-700">Our Mission</h3>
              <p className="text-blueGray-600 mb-6">
                We strive to break the cycle of poverty by supporting children’s education, providing nutritious meals, and engaging volunteers in meaningful campaigns. Every effort is aimed at building a brighter future for our community.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-blueGray-700">Our Values</h3>
              <ul className="list-disc list-inside text-blueGray-600 mb-6">
                <li>Empowerment</li>
                <li>Compassion</li>
                <li>Transparency</li>
                <li>Community Engagement</li>
                <li>Lasting Impact</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2 text-blueGray-700">Get Involved</h3>
              <p className="text-blueGray-600 mb-6">
                Join us as a donor, volunteer, or partner. Together, we can make a difference in the lives of children and families in need.
              </p>
              <div className="text-center">
                <a
                  href="/donate"
                  className="bg-lightBlue-500 text-white px-6 py-3 rounded font-bold shadow hover:bg-lightBlue-600 transition"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}