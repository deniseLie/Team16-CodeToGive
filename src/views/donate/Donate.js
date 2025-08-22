import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Donate() {

  const navigate = useNavigate();

  const [expandedPartitions, setExpandedPartitions] = useState({});

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
      images : [
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
      ]
    },
    {
      title : "District",
      images : [
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
        "https://www.parents.com/thmb/TtV-9meq6KmSEDsW7ohEMDxDVCM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_172261862-2--d36510500ca044e1bd9bb51f798b3141.jpg",
      ]
    }
  ]

  // Function : Donate button click handler 
  const handleButtonClick = (type) => {

    
      // Handle general donation logic
      if (type === 'general') {
        navigate('/donate/general'); // Redirect to general donation page or show modal
      } else if (type === 'specific') {
        navigate('/donate/specific'); // Redirect to specific project donation page or show modal
      }
  };

  // Function : View More button
  const handleViewMoreLess = (partitionTitle, showMore) => {
    setExpandedPartitions((prev) => ({
      ...prev,
      [partitionTitle]: showMore,
    }));
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
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Ways to Donate */}
        <section className="py-16">
          <div className="mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-8">
              
              {/* Donate by Ban transfer */}
              <h2 className="text-2xl font-semibold mb-4">Donate by Bank Transfer</h2>
              <p className="mb-4">
                Account Name: {accountName}<br />
                Bank Address: {bankAddress}<br />
                Bank Code: {bankCode}<br />
                Account Number: {accountNumber}
              </p>

              {/* Donate by FPS */}
              <h2 className="text-2xl font-semibold mb-4">Donate by FPS</h2>
              <p className="mb-4">
                Please use the following details for FPS donations:<br />
                <strong>FPS ID:</strong> 12345678<br />
                <strong>FPS QR Code:</strong> <img src="https://via.placeholder.com/150" alt="FPS QR Code" />
              </p>

              {/* Buttons to donate */}
              <div className="flex justify-center space-x-4 mt-6 gap-20">
                <button className="bg-lightBlue-500 px-12 py-5 rounded hover:bg-lightBlue-600"
                  onClick={(e) => handleButtonClick('general')}  
                >
                  <p className="text-lg font-bold text-white">
                    Donate General
                  </p>
                </button>
                <button className="bg-lightBlue-500 px-12 py-5 rounded hover:bg-lightBlue-600"
                  onClick={(e) => handleButtonClick('specific')}
                >
                  <p className="text-lg font-bold text-white">
                    Donate Specific Project
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mx-auto px-4 mt-8">
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-sm text-gray-600">{additionalInfo}</p>
            </div>
          </div>
        </section>

        {/* Donation Type */}
        <div className="mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8">

            {/* Partition */}
            { partitions.map((partition, index) => {
              const showAll = expandedPartitions[partition.title] || false;
              const imagesToShow = showAll ? partition.images : partition.images.slice(0, 4); // Show all images if expanded, otherwise show first 8
              return (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{partition.title}</h3>

                  {/* Imagess */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {imagesToShow.map((image, imgIndex) => (
                      <a
                        key={imgIndex}
                        href={`/school/${partition.title.toLowerCase()}-${imgIndex + 1}`}
                        className="block"
                      >
                        <img
                          src={image}
                          alt={`Partition ${index + 1} Image ${imgIndex + 1}`}
                          className="w-full h-48 object-cover rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        />
                      </a>
                    ))}
                  </div>

                  {/* View More */}
                  {partition.images.length > 4 && (
                    <div className="mt-4 text-center">
                      {!showAll ? (
                        <button
                          className="text-blue-500 underline font-semibold"
                          onClick={() => handleViewMoreLess(partition.title, true)}
                        >
                          View more
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 underline font-semibold"
                          onClick={() => handleViewMoreLess(partition.title, false)}
                        >
                          View less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
