import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { FaUniversity, FaQrcode, FaCreditCard, FaProjectDiagram } from "react-icons/fa";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import CommunitiesSection from "./CommunitiesSection"
import DonateGeneral from "./DonateGeneral";
import { getAll } from "utils/communitiesDB";

export default function Donate() {

  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);

  const MySwal = withReactContent(Swal);

  const header = "Donate to Reach";
  const supportingText = "Your support helps us make a difference in the lives of children and families in need.";
  const accountName = "Race for Education Accessibilities for Every Child Limited";
  const bankAddress = "ICBC Tower, 3 Garden Road, Central, Hong Kong";
  const bankCode = "072";
  const accountNumber = "701-502-029066";

  const additionalInfo = "根據 《香港稅務條例》 第 88 條本香港註冊有限公司是已獲豁免的慈善機構。捐款港幣 $100 元或以上可申請免稅。Race for Education Accessibilities for Every Child Limited is a registered charity institution in Hong Kong which is exempt from tax under section 88 of the Hong Kong inland revenue ordinance. Donations of HK$100 or above are tax deductible.";

  const partitions = [
    { 
      title : "Kindergarten",
      name  : schools.map(s => s.name),
      images: schools.map(s => s.image),
    },
    {
      title : "District",
      name  : districts.map(d => d.name),
      images : districts.map(d => d.image),
    }
  ]

  // UseEffect
  useEffect(() => {
    const loadCommunities = async () => {
      setDistricts(await getAll("districts"));
      setSchools(await getAll("schools"));
    };
    loadCommunities();
  }, []);

  // Function : Donate button click handler 
  const handleButtonClick = (type) => {
    const title =
      type === 'general'
        ? 'Donate to General Fund'
        : 'Donate to a Specific Project';
    const text =
      type === 'general'
        ? 'Your donation supports all our programs.'
        : 'Select a project and make a targeted impact.';
    
    MySwal.fire({
      title,
      text, 
      html: <DonateGeneral type={type == 'general' ? 'general' : 'specific'} isPopup />,
      width: "80%",
      showConfirmButton: false,
      showCloseButton: true,
    })
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
                "url('https://reach.org.hk/_assets/media/33ff5d5a08a9618e399d026217415484.jpg",
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
                    {header}
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    {supportingText}
                  </p>
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Ways to Donate */}
        <section className="py-16">
          <div className="mx-auto px-4">
            <div className="bg-white rounded-xl p-10">
              <h2 className="text-center text-3xl font-bold mb-12 text-blueGray-800">Ways to Donate</h2>
              <div className="flex flex-col md:flex-row justify-between gap-8">
                {/* Donate by Bank Transfer */}
                <div className="flex-1 bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FaUniversity className="text-blue-500 text-2xl" />
                    <h2 className="text-xl font-semibold">Bank Transfer</h2>
                  </div>
                  <p className="mb-4 text-blueGray-700">
                    <span className="font-bold">Account Name:</span> {accountName}<br />
                    <span className="font-bold">Bank Address:</span> {bankAddress}<br />
                    <span className="font-bold">Bank Code:</span> {bankCode}<br />
                    <span className="font-bold">Account Number:</span> {accountNumber}
                  </p>
                </div>

                {/* Donate by FPS */}
                <div className="flex-1 bg-green-50 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FaQrcode className="text-green-500 text-2xl" />
                    <h2 className="text-xl font-semibold">FPS</h2>
                  </div>
                  <p className="mb-4 text-blueGray-700">
                    <span className="font-bold">FPS ID:</span> 12345678<br />
                    <span className="font-bold">FPS QR Code:</span>
                  </p>
                </div>

                {/* Donate by Alipay / Credit Card */}
                <div className="flex-1 bg-yellow-50 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FaCreditCard className="text-yellow-500 text-2xl" />
                    <h2 className="text-xl font-semibold">Alipay / Credit Card</h2>
                  </div>
                  <p className="mb-4 text-blueGray-700">
                    Donate securely via Alipay, Visa, or MasterCard.<br />
                    <span className="font-bold">FPS ID:</span> 12345678<br />
                  </p>
                </div>
              </div>

              {/* Buttons to donate */}
              <div className="flex justify-center space-x-4 mt-8 gap-20">
                <button className="bg-lightBlue-500 hover:bg-lightBlue-600 px-8 py-4 rounded rounded-lg shadow-lg flex items-center gap-2 transition-all duration-200"
                  onClick={(e) => handleButtonClick('general')}  
                >
                  <FaUniversity className="text-white text-xl" />
                  <p className="text-xl font-bold text-white">
                    Donate General
                  </p>
                </button>
                <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-200"
                  onClick={(e) => handleButtonClick('specific')}
                >
                  <FaProjectDiagram className="text-white text-xl" />
                  <p className="text-xl font-bold text-white">
                    Donate Specific Project
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mx-auto px-4 mt-8">
            <div className="bg-gray-100 rounded-lg p-6 shadow">
              <p className="text-sm text-blueGray-600">{additionalInfo}</p>
            </div>
          </div>
        </section>

        {/* Donation Type */}
        <CommunitiesSection partitions={partitions} />
      </main>
      <Footer />
    </>
  );
}
