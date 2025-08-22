import React, { useState } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

// Simple fade animation using Tailwind
const Fade = ({ show, children }) => (
  <div
    className={`transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  >
    {children}
  </div>
);

const districts = [
    { 
        name: "Central and Western",
        image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    { 
        name: "Eastern",
        image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    { 
        name: "Islands",
        image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    { 
        name: "North",
        image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
]

const schools = [
  "Happy Kids Kindergarten",
  "Sunshine Kindergarten",
  "Rainbow Kindergarten",
  "Little Stars Kindergarten",
  "Future Leaders Kindergarten",
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
        title: "Choose District / School",
        content: (
        <>
            <p className="mb-4">Select the district(s) and school(s) you'd like to sponsor:</p>
        </>
        ),
    },
    {
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
        title: "Select Amount",
        content: (
        <>
            <p className="mb-4">Enter your donation amount:</p>
        </>
        ),
    },
    {
        title: "Your Details",
        content: (
        <>
            <p className="mb-4">Please provide your contact information:</p>
        </>
        ),
    },
    {
        title: "Payment Method",
        content: (
        <>
            <p className="mb-4">Please provide your payment method:</p>
        </>
        ),
    },
    {
        title: "Review & Confirm",
        content: (
        <>
            <p className="mb-4">Review your donation details and confirm:</p>
        </>
        ),
    },
];



export default function DonateGeneral() {
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

    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedDistricts((prev) =>
        prev.includes(value)
            ? prev.filter((d) => d !== value)
            : [...prev, value]
        );
    };

    const handleSchoolChange = (e) => {
        const value = e.target.value;
        setSelectedSchools((prev) =>
        prev.includes(value)
            ? prev.filter((s) => s !== value)
            : [...prev, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnimating(true);
        setTimeout(() => {
            setStep(steps.length);
            setAnimating(false);
        }, 400);
    };

    return (
        <>
        <Navbar transparent />
        <main className="bg-lightblue-20 min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-lg mx-auto mt-12 mb-12">
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
                        {step === 0 && (
                        <div>
                            {steps[0].content}
                            <div className="flex flex-col gap-4">
                            {steps[0].options.map((opt) => (
                                <button
                                key={opt.value}
                                type="button"
                                className={`py-3 px-6 rounded-lg border transition-all duration-300
                                    ${donationType === opt.value
                                    ? "bg-blue-500 text-white border-blue-500 scale-105"
                                    : "bg-blueGray-50 text-blueGray-700 border-blueGray-200 hover:bg-blue-100"}
                                `}
                                onClick={() => setDonationType(opt.value)}
                                >
                                {opt.label}
                                </button>
                            ))}
                            </div>
                        </div>
                        )}

                        {step === 1 && (
                        <div>
                            {steps[1].content}
                            <input
                            type="number"
                            min="1"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-blueGray-200 focus:border-blue-500 focus:outline-none mb-4 transition-all duration-300"
                            placeholder="Amount (HKD)"
                            />
                        </div>
                        )}

                        {step === 2 && (
                            <div>
                                {steps[2].content}
                                <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-blueGray-200 focus:border-blue-500 focus:outline-none mb-4 transition-all duration-300"
                                placeholder="Your Name"
                                />
                                <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-blueGray-200 focus:border-blue-500 focus:outline-none mb-4 transition-all duration-300"
                                placeholder="Your Email"
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                {steps[3].content}
                                <div className="flex flex-col gap-4">
                                {paymentMethods.map((method) => (
                                    <button
                                    key={method.value}
                                    type="button"
                                    className={`py-3 px-6 rounded-lg border transition-all duration-300 text-left
                                        ${paymentMethod === method.value
                                        ? "bg-blue-500 text-white border-blue-500 scale-105"
                                        : "bg-blueGray-50 text-blueGray-700 border-blueGray-200 hover:bg-blue-100"}
                                    `}
                                    onClick={() => setPaymentMethod(method.value)}
                                    >
                                    <span className="font-semibold">{method.label}</span>
                                    {paymentMethod === method.value && method.details}
                                    </button>
                                ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                {steps[4].content}
                                <div className="mb-4">
                                <div className="font-semibold">Donation Type:</div>
                                <div className="mb-2">{donationType}</div>
                                <div className="font-semibold">Amount:</div>
                                <div className="mb-2">{amount} HKD</div>
                                <div className="font-semibold">Name:</div>
                                <div className="mb-2">{name}</div>
                                <div className="font-semibold">Email:</div>
                                <div className="mb-2">{email}</div>
                                <div className="font-semibold">Payment Method:</div>
                                <div className="mb-2">
                                    {paymentMethods.find((m) => m.value === paymentMethod)?.label}
                                </div>
                                <div>
                                    {paymentMethods.find((m) => m.value === paymentMethod)?.details}
                                </div>
                                </div>
                            </div>
                        )}

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
                                (step === 0 && !donationType) ||
                                (step === 1 && !amount) ||
                                (step === 2 && (!name || !email)) ||
                                (step === 3 && !paymentMethod) ||
                                animating
                                ? "bg-blueGray-200 text-blueGray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            onClick={nextStep}
                            disabled={
                                (step === 0 && !donationType) ||
                                (step === 1 && !amount) ||
                                (step === 2 && (!name || !email)) ||
                                (step === 3 && !paymentMethod) ||
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