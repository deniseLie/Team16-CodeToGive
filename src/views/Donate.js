import React, { useState } from "react";


// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Donate() {

    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the donation logic (API call, etc.)
        alert("Thank you for your donation!");
        setAmount("");
        setName("");
        setEmail("");
        setMessage("");
    };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
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
                    Donate Now
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Donation Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-blueGray-700">
                Make a Donation
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-blueGray-600 text-sm font-bold mb-2">
                    Donation Amount (HKD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-blueGray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blueGray-600 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-blueGray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blueGray-600 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-blueGray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blueGray-600 text-sm font-bold mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-blueGray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Leave a message..."
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-lightBlue-500 text-white px-6 py-3 rounded font-bold shadow hover:bg-lightBlue-600 transition"
                  >
                    Donate Now
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center text-blueGray-500 text-sm">
                <p>
                  Your donation will help us support children and families in need.
                  <br />
                  For other donation methods, please contact us at <a href="mailto:info@reach.org.hk" className="text-lightBlue-500 underline">info@reach.org.hk</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
