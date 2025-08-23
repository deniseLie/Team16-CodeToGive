import React, { useEffect, useState } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import { ChooseDistrictSchoolStep, DonationTypeStep, AmountTypeStep, YourDetailsStep, PaymentMethodStep, ReviewStep } from "components/Steps/donationSteps";
import { useNavigate } from "react-router-dom";
import donationSuccessAlert from "components/Alert/donationSuccessAlert";

// Simple fade animation using Tailwind
const Fade = ({ show, children }) => (
  <div
    className={`transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  >
    {children}
  </div>
);

const districtsData = [
  {
    name: "Central & Western",
    image: "https://source.unsplash.com/400x300/?hongkong,central",
    description: "A vibrant district in Hong Kong with a mix of business and culture.",
  },
  {
    name: "Eastern",
    image: "https://source.unsplash.com/400x300/?hongkong,eastern",
    description: "Known for its residential areas and beautiful waterfront.",
  },
  {
    name: "Central & Western",
    image: "https://source.unsplash.com/400x300/?hongkong,central",
    description: "A vibrant district in Hong Kong with a mix of business and culture.",
  },
  {
    name: "Eastern",
    image: "https://source.unsplash.com/400x300/?hongkong,eastern",
    description: "Known for its residential areas and beautiful waterfront.",
  },
];

const schoolsData = [
  {
    name: "Happy Kids Kindergarten",
    image: "https://source.unsplash.com/400x300/?kindergarten,happy",
    description: "A nurturing environment for early childhood education.",
    district: "Central & Western",
  },
  {
    name: "Sunshine Kindergarten",
    image: "https://source.unsplash.com/400x300/?kindergarten,sunshine",
    description: "Fostering creativity and growth for young learners.",
    district: "Eastern",
  },
  // ...add more schools as needed
];

const paymentMethods = [
  {
    label: "Bank Transfer",
    value: "bank",
    details: (
      <div className="text-sm text-blueGray-700 mt-2">
        <div className="text-white"><span className="font-semibold">Bank Name:</span> ICBC (Asia)</div>
        <div className="text-white"><span className="font-semibold">Account Name:</span> Race for Education Accessibilities for Every Child Limited</div>
        <div className="text-white"><span className="font-semibold">Account Number:</span> 701-502-029066</div>
        <div className="text-white"><span className="font-semibold">Bank Code:</span> 072</div>
        <div className="text-white"><span className="font-semibold">Bank Address:</span> ICBC Tower, 3 Garden Road, Central, Hong Kong</div>
        <div className="mt-2 text-xs text-white">Please email your transfer receipt to <a href="mailto:info@reach.org.hk" className="underline text-white">info@reach.org.hk</a> for confirmation.</div>
      </div>
    ),
  },
  {
    label: "Credit Card / Alipay",
    value: "credit",
    details: (
      <div className="text-sm text-blueGray-700 mt-2">
        <div className="text-white">We accept Visa, MasterCard, and Alipay.</div>
        <div className="mt-2 text-xs text-white">You will be redirected to our secure payment gateway after confirming your donation.</div>
      </div>
    ),
  },
  {
    label: "FPS",
    value: "fps",
    details: (
      <div className="text-sm text-blueGray-700 mt-2">
        <div className="text-white"><span className="font-semibold">FPS ID:</span> 123456789</div>
        <div className="mt-2 text-xs text-white">Please email your FPS receipt to <a href="mailto:info@reach.org.hk" className="underline text-white">info@reach.org.hk</a> for confirmation.</div>
      </div>
    ),
  },
]

const steps = [
    {
        component: "ChooseDistrictSchoolStep",
        title: "Choose District and School",
        content: (
        <>
            <p className="mb-4">Select the district and school you want to support:</p>
        </>
        ),
    },
    {
        component : "DonationTypeStep",
        title: "Choose Donation Type",
        content: (
        <>
            <p className="mb-4">Select the type of donation you want to make:</p>
        </>
        ),
        options: [
        { label: "One-Time", value: "one-time" },
        { label: "Monthly", value: "monthly" },
        { label: "Annual", value: "annual" },
        ],
    },
    {
        component: "AmountTypeStep",
        title: "Select Amount",
        content: (
        <>
            <p className="mb-4">Enter your donation amount:</p>
        </>
        ),
    },
    {
        component: "YourDetailsStep",
        title: "Your Details",
        content: (
        <>
            <p className="mb-4">Please provide your contact information:</p>
        </>
        ),
    },
    {
        component: "PaymentMethodStep",
        title: "Payment Method",
        content: (
        <>
            <p className="mb-4">Please provide your payment method:</p>
        </>
        ),
    },
    {
        component: "ReviewStep",
        title: "Review & Confirm",
        content: (
        <>
            <p className="mb-4">Review your donation details and confirm:</p>
        </>
        ),
    },
];

export default function DonateSpecific() {
    
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [donationType, setDonationType] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [animating, setAnimating] = useState(false);

    // Animation handler
    const nextStep = () => {
        setAnimating(true);
        setTimeout(() => {
            setStep((prev) => Math.min(prev + 1, steps.length - 1));
            setAnimating(false);
        }, 400);
    };

    const prevStep = () => {
        setAnimating(true);
        setTimeout(() => {
            setStep((prev) => Math.max(prev - 1, 0));
            setAnimating(false);
        }, 400);
    };

    // Handle district selection (multi-select)
    const handleDistrictChange = (districtName) => {
        setSelectedDistricts((prev) =>
            prev.includes(districtName)
                ? prev.filter((d) => d !== districtName)
                : [...prev, districtName]
        );
    };

     // Handle school selection (multi-select)
    const handleSchoolChange = (schoolName) => {
        setSelectedSchools((prev) =>
            prev.includes(schoolName)
                ? prev.filter((s) => s !== schoolName)
                : [...prev, schoolName]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Alert Confirmation
        donationSuccessAlert();
        
        navigate("/donate");
    };

    const redirectToStory = (e, type, place) => {
        e.stopPropagation();
        navigate(`/${type}}/${encodeURIComponent(place.name)}`);
    };


    const renderStep = () => {
        switch (steps[step].component) {
            case "ChooseDistrictSchoolStep":
                return (
                    <ChooseDistrictSchoolStep
                        step={steps[step]}
                        districtsData={districtsData}
                        schoolsData={schoolsData}
                        selectedDistricts={selectedDistricts}
                        selectedSchools={selectedSchools}
                        handleDistrictChange={handleDistrictChange}
                        handleSchoolChange={handleSchoolChange}
                        redirectToStory={redirectToStory}
                    />
                );
            case "DonationTypeStep":
                return (
                    <DonationTypeStep
                        step={steps[step]}
                        donationType={donationType}
                        setDonationType={setDonationType}
                    />
                );
            case "AmountTypeStep":
                return (
                    <AmountTypeStep
                    step={steps[step]}
                    amount={amount}
                    setAmount={setAmount}
                    />
                );
            case "YourDetailsStep":
                return (
                    <YourDetailsStep
                    step={steps[step]}
                    name={name}
                    email={email}
                    setName={setName}
                    setEmail={setEmail}
                    />
                );
            case "PaymentMethodStep":
                return (
                    <PaymentMethodStep
                    step={steps[step]}
                    paymentMethods={paymentMethods}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    />
                );
            case "ReviewStep":
                return (
                    <ReviewStep
                        step={steps[step]}
                        selectedDistricts={selectedDistricts}
                        selectedSchools={selectedSchools}
                        donationType={donationType}
                        amount={amount}
                        name={name}
                        email={email}
                        paymentMethod={paymentMethod}
                        paymentMethods={paymentMethods}
                    />
            );
            default:
                return <div>Unknown step</div>;
        }
    }

    return (
        <>
        <Navbar transparent />
        <main className="bg-blue-500 min-h-screen flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-5xl mx-auto mt-12 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Stepper */}
                <div className="flex justify-between mb-8">
                {steps.map((s, idx) => (
                    <div key={s.title} className="flex-1 flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300
                        ${step === idx ? "bg-blue-500 text-white scale-110 shadow-lg" : "bg-blueGray-200 text-blueGray-600"}
                        `}
                    >
                        {idx + 1}
                    </div>
                    <span className={`mt-2 text-xs text-center ${step === idx ? "font-bold text-blue-500" : "text-blueGray-400"}`}>
                        {s.title}
                    </span>
                    </div>
                ))}
                </div>

                {/* Step Content */}
                <form onSubmit={handleSubmit}>
                    <Fade show={!animating}>
                        
                        {renderStep()}

                        {step === steps.length && (
                            <div className="text-center py-12">
                                <div className="text-3xl font-bold text-green-500 mb-4 animate-bounce">Thank You!</div>
                                <div className="text-blueGray-600 mb-2">
                                Your donation has been received. We appreciate your support!
                                </div>
                            </div>
                        )}
                    </Fade>

                    {/* Navigation Buttons */}
                    {step < steps.length && (
                        <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                            step === 0
                                ? "bg-blueGray-200 text-blueGray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            onClick={prevStep}
                            disabled={step === 0 || animating}
                        >
                            Back
                        </button>
                        {step < steps.length - 1 ? (
                            <button
                            type="button"
                            className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                                (step === 0 && (!selectedSchools || !selectedDistricts)) ||
                                (step === 1 && !donationType) ||
                                (step === 2 && !amount) ||
                                (step === 3 && (!name || !email)) ||
                                (step === 4 && !paymentMethod) ||
                                animating
                                ? "bg-blueGray-200 text-blueGray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            onClick={nextStep}
                            disabled={
                                (step === 0 && (!selectedSchools || !selectedDistricts)) ||
                                (step === 1 && !donationType) ||
                                (step === 2 && !amount) ||
                                (step === 3 && (!name || !email)) ||
                                (step === 4 && !paymentMethod) ||
                                animating
                            }
                            >
                            Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                                    animating
                                    ? "bg-blueGray-200 text-blueGray-400 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                                disabled={animating}
                            >
                                Confirm & Donate
                            </button>
                        )}
                        </div>
                    )}
                    </form>
            </div>
            </div>
        </main>
        <Footer />
        </>
    );
}