import React, { useState } from "react";

import { ChooseDistrictSchoolStep, DonationTypeStep, AmountTypeStep, YourDetailsStep, PaymentMethodStep, ReviewStep } from "components/Steps/donationSteps";
import donationSuccessAlert from "components/Alert/donationSuccessAlert";
import { saveDonation } from 'utils/donationDB.js'

// Simple fade animation using Tailwind
const Fade = ({ show, children }) => (
  <div
    className={`transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  >
    {children}
  </div>
);

export default function DonateGeneral({ type }) {

    const [step, setStep] = useState(0);
    const [animating, setAnimating] = useState(false);

    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [donationType, setDonationType] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [visibleOnLeaderboard, setVisibleOnLeaderboard] = useState(true);
    const [socialMedia, setSocialMedia] = useState({
        facebook: "",
        instagram: "",
        linkedin: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("");
    

    const steps = type === 'general' ? generalSteps : specificSteps;

    // Animation handler
    const nextStep = () => {
        setAnimating(true);
        window.scrollTo(0, 0); // scroll to top
        setTimeout(() => {
            setStep((prev) => Math.min(prev + 1, steps.length - 1));
            setAnimating(false);
        }, 400);
    };

    const prevStep = () => {
        setAnimating(true);
        window.scrollTo(0, 0); // scroll to top
        setTimeout(() => {
            setStep((prev) => Math.max(prev - 1, 0));
            setAnimating(false);
        }, 400);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare donation data
        const donationData = {
            type,
            donationType,
            amount,
            name,
            email,
            visibleOnLeaderboard,
            socialMedia,
            paymentMethod,
            selectedDistricts,
            selectedSchools,
            date: new Date().toISOString(),
        };

        try {
            await saveDonation(donationData);
            
            // Alert Confirmation
            donationSuccessAlert();
        } catch (error) {
            console.error("Donation save failed:", error);
            alert("Sorry, there was a problem saving your donation locally. Please try again.");
        }

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

    const redirectToStory = (e, type, place) => {
        e.stopPropagation();
        const url = `/${type}/${encodeURIComponent(place.name)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const renderStep = () => {
        switch (steps[step].component) {
            case "ChooseDistrictSchoolStep":
                return (
                    <ChooseDistrictSchoolStep
                        step={steps[step]}
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
                        visibleOnLeaderboard={visibleOnLeaderboard}
                        socialMedia={socialMedia}
                        setName={setName}
                        setEmail={setEmail}
                        setVisibleOnLeaderboard={setVisibleOnLeaderboard}
                        setSocialMedia={setSocialMedia}
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
        <div className="w-full h-full mx-auto mt-12 mb-12 md: px-8 lg:px-20">
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
            <form onSubmit={handleSubmit} className="lg:px-60">
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
                                // Dynamic validation based on step and type
                                (steps[step].component === "DonationTypeStep" && !donationType) ||
                                (steps[step].component === "AmountTypeStep" && !amount) ||
                                (steps[step].component === "YourDetailsStep" && (!name || !email)) ||
                                (steps[step].component === "PaymentMethodStep" && !paymentMethod) ||
                                (steps[step].component === "ChooseDistrictSchoolStep" &&
                                    type === "specific" &&
                                    selectedDistricts.length === 0 &&
                                    selectedSchools.length === 0) ||
                                animating
                                ? "bg-blueGray-200 text-blueGray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            onClick={nextStep}
                            disabled={
                                (steps[step].component === "DonationTypeStep" && !donationType) ||
                                (steps[step].component === "AmountTypeStep" && !amount) ||
                                (steps[step].component === "YourDetailsStep" && (!name || !email)) ||
                                (steps[step].component === "PaymentMethodStep" && !paymentMethod) ||
                                (steps[step].component === "ChooseDistrictSchoolStep" &&
                                    type === "specific" &&
                                    selectedDistricts.length === 0 &&
                                    selectedSchools.length === 0) ||
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
    );
}
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

const generalSteps = [
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

const specificSteps = [
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