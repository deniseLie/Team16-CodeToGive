import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Choose District & School Step
export const ChooseDistrictSchoolStep = ({ 
    step, districtsData, schoolsData, selectedDistricts, selectedSchools, handleDistrictChange, handleSchoolChange,
    redirectToStory
}) => {
    return (        
        <div>
            {step.content}
            <div className="flex flex-col gap-4">

                {/* Select District */}
                <h3 className="text-lg font-bold mb-2">Choose District(s) to Sponsor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {districtsData.map((district) => (
                        <motion.div
                            key={district.name}
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-lg shadow-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                                selectedDistricts.includes(district.name)
                                ? "border-blue-500 ring-2 ring-blue-400"
                                : "border-gray-200"
                            }`}
                            onClick={() => handleDistrictChange(district.name)}
                        >
                            <img
                                src={district.image}
                                alt={district.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-blueGray-800">{district.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedDistricts.includes(district.name)}
                                        onChange={() => handleDistrictChange(district.name)}
                                        className="ml-2"
                                    />
                                </div>
                                <p className="text-sm text-blueGray-600 mt-2">{district.description}</p>
                                <button
                                    type="button"
                                    className="mt-2 text-blue-500 underline text-sm"
                                    onClick={(e) => redirectToStory(e, "district", district)}
                                >
                                    View Story
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Select School */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Choose Kindergarten(s) to Sponsor</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {schoolsData
                            // .filter((school) =>
                            //     selectedDistricts.length === 0 ||
                            //     selectedDistricts.includes(school.district)
                            // )
                            .map((school) => (
                                <motion.div
                                    key={school.name}
                                    whileHover={{ scale: 1.03 }}
                                    className={`rounded-lg shadow-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                                    selectedSchools.includes(school.name)
                                        ? "border-green-500 ring-2 ring-green-400"
                                        : "border-gray-200"
                                    }`}
                                    onClick={() => handleSchoolChange(school.name)}
                                >
                                    <img
                                        src={school.image}
                                        alt={school.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-blueGray-800">{school.name}</span>
                                            <input
                                                type="checkbox"
                                                checked={selectedSchools.includes(school.name)}
                                                onChange={() => handleSchoolChange(school.name)}
                                                className="ml-2"
                                            />
                                        </div>
                                        <p className="text-sm text-blueGray-600 mt-2">{school.description}</p>
                                        <p className="text-xs text-blueGray-400 mt-1">
                                            District: {school.district}
                                        </p>
                                        <button
                                            type="button"
                                            className="mt-2 text-blue-500 underline text-sm"
                                            onClick={(e) => redirectToStory(e, "school", school)}
                                        >
                                            View Story
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

// Donation Type
export const DonationTypeStep = ({ step, donationType, setDonationType }) => {
    return (
        <div>
            {step.content}
            <div className="flex flex-col gap-4">
            {step.options.map((opt) => (
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
    )
}

// Amount Type
export const AmountTypeStep = ({ step, amount, setAmount }) => {
    const kidsHelped = Math.floor(amount / 10);

    const [income, setIncome] = React.useState(150000); // Default income
    const [showInfo, setShowInfo] = React.useState(false);

    const maxDeduction = Math.floor(income * 0.35); // 35% of income
    const deductible = amount >= 100 ? Math.min(amount, maxDeduction) : 0;
    const progressPercentage = Math.min((amount / maxDeduction) * 100, 100);

    // Motivation Text
    const getMotivationText = () => {
        if (kidsHelped <= 0) {
        return "Even a small contribution can make a difference.";
        } else if (kidsHelped === 1) {
        return "With $10, you can give 1 child access to education!";
        } else if (kidsHelped <= 5) {
        return `Your donation of $${amount} helps ${kidsHelped} children receive education.`;
        } else if (kidsHelped <= 10) {
        return `$${amount} transforms the future of ${kidsHelped} children.`;
        } else {
        return `With $${amount}, you’re empowering ${kidsHelped} children with education!`;
        }
    };
    
    return (
        <div className="space-y-6">
            <p className="text-lg text-gray-700">{step.content}</p>

            {/* Donation Amount */}
            <div className="flex flex-col space-y-2 mb-10">
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                />
            </div>

            {/* Tax Deductible Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm relative">
                <div className="flex items-center mb-4 gap-2">
                    <h3 className="text-green-700 font-semibold">Tax-Deductible Calculator</h3>
                    <Popover className="relative">
                        <PopoverButton className="text-green-700 focus:outline-none pt-2">
                            <QuestionMarkCircleIcon className="w-4 h-4 cursor-pointer" />
                        </PopoverButton>

                        <PopoverPanel className="absolute z-50 mt-2 w-64 p-3 bg-white border rounded-lg shadow-lg text-sm text-gray-700">
                            <p className="text-green-700 font-medium">
                                We will help you calculate the tax deductible based on your income and donation amount.
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Donations of HK$100 or above are eligible for tax deduction in Hong Kong.
                            </p>
                        </PopoverPanel>
                    </Popover>
                </div>

                {/* Popup */}
                {showInfo && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                        onClick={() => setShowInfo(false)}
                    >
                        <div 
                            className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing popup
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-green-700 text-sm">
                                    We will help you calculate the tax deductible based on your income and donation amount
                                </p>
                            </div>                            
                        </div>
                    </div>
                )}

                {/* User Income Input */}
                <div className="mb-2">
                    <label className="block text-green-700 text-sm font-medium mb-1 text-left">
                        Your Annual Assessable Income
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="e.g. HK$ 50,000"
                    />
                </div>
                
                {/* Calculated Deductible */}
                {income > 0 && (
                    <div>
                        <div className="p-4">
                            <p className="text-green-700 font-semibold text-lg">
                                Tax Deductible: HK$ {deductible.toLocaleString()}
                            </p>

                            {amount > maxDeduction && (
                            <p className="text-xs text-red-600 mt-1">
                                Max deductible: HK$ {maxDeduction.toLocaleString()} (35% of income)
                            </p>
                            )}
                            <p className="text-xs text-green-700 mt-1">
                                {progressPercentage.toFixed(0)}% of max deductible used
                            </p>

                            {/* Progress bar */}
                            <div className="relative mt-2 h-2 bg-green-200 rounded-full">
                            <div
                                className="absolute h-2 bg-green-500 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Motivation Text */}
            <div className="p-4 bg-blue-50 text-center rounded-xl">
                <AnimatePresence mode="wait">
                <motion.p
                    key={kidsHelped} // re-animate when number changes
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-blue-700 font-semibold"
                >
                    {getMotivationText()}
                </motion.p>
                </AnimatePresence>

                {/* Cute bouncing number of kids helped */}
                {kidsHelped > 0 && (
                    <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-2xl font-bold text-green-600 text-center"
                    >
                    🎉 {kidsHelped} kid{kidsHelped > 1 ? "s" : ""} will be helped!
                    </motion.div>
                )}
            </div>

            {/* Info */}
            <p className="text-xs text-green-700 mt-4 text-left">
                根據 《香港稅務條例》 第 88 條本香港註冊有限公司是已獲豁免的慈善機構。捐款港幣 $100 元或以上可申請免稅。Race for Education Accessibilities for Every Child Limited is a registered charity institution in Hong Kong which is exempt from tax under section 88 of the Hong Kong inland revenue ordinance. Donations of HK$100 or above are tax deductible.
            </p>
        </div>
    );
}

// Your Details Step
export const YourDetailsStep = ({ 
    step, name, email, visibleOnLeaderboard, socialMedia,
    setName, setEmail, setVisibleOnLeaderboard, setSocialMedia
}) => {
    const [emailError, setEmailError] = React.useState("");
    const [showSocialMedia, setShowSocialMedia] = React.useState(true);

    const validateEmail = (value) => {
        // simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError("Email is required");
        } else if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const visibilityClicked = () => {
        setVisibleOnLeaderboard(!visibleOnLeaderboard);
        setShowSocialMedia(!visibleOnLeaderboard)
    }

    const connectPlatform = (platform) => {
        const simulatedUsername = `fake-user`;
        setSocialMedia((prev) => ({
            ...prev,
            [platform]: simulatedUsername
        }));
    };
    
    return (
        <div >
            {step.content}

            {/* Name */}
            <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blueGray-200 focus:border-blue-500 focus:outline-none mb-4 transition-all duration-300"
                placeholder="Your Name"
            />

            {/* Email */}
            <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value)
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                    emailError ? "border-red-500" : "border-blueGray-200"
                    } focus:border-blue-500 focus:outline-none mb-2 transition-all duration-300`}
                placeholder="Your Email"
            />
            {/* email error */}
            {emailError && (
                <p className="text-red-500 text-sm mb-2">{emailError}</p>
            )}

            {/* Visible on leaderboard */}
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="visibleOnLeaderboard"
                    checked={visibleOnLeaderboard}
                    onChange={visibilityClicked}
                    className="mr-2"
                />
                <label htmlFor="visibleOnLeaderboard" className="text-sm text-blueGray-700">
                    I want to be visible on the leaderboard
                </label>
            </div>

            {/* Social Media Link */}
            {showSocialMedia && (
                <div className="mb-4 text-left">
                    <label className="block text-sm text-blueGray-700 mb-2">Connect Social Media</label>
                    <div className="flex flex-col sm:flex-row gap-4">

                        {/* Facebook */}
                        {socialMedia.facebook ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                                <FaFacebookF />
                                {socialMedia.facebook}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:opacity-90 text-white font-semibold rounded-lg transition-colors"
                                onClick={() => connectPlatform("facebook")}
                            >
                                <FaFacebookF />
                                Connect Facebook
                            </button>
                        )}

                        {/* Instagram */}
                        {socialMedia.instagram ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg">
                                <FaInstagram />
                                {socialMedia.instagram}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 hover:opacity-90 text-white font-semibold rounded-lg transition-all"
                                onClick={() => connectPlatform("instagram")}
                            >
                                <FaInstagram />
                                Connect Instagram
                            </button>
                        )}

                        {/* LinkedIn */}
                        {socialMedia.linkedin ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg">
                                <FaLinkedinIn />
                                {socialMedia.linkedin}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 hover:opacity-90 text-white font-semibold rounded-lg transition-colors"
                                onClick={() => connectPlatform("linkedin")}
                            >
                                <FaLinkedinIn />
                                Connect LinkedIn
                            </button>
                        )}

                    </div>
                </div>
            )}   
        </div>
    )
}

// Payment Method
export const PaymentMethodStep = ({ step, paymentMethods, setPaymentMethod, paymentMethod }) => {
    return (
        <div>
            {step.content}
            <div className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
                <button
                key={method.value}
                type="button"
                className={`py-3 px-6 rounded-lg border transition-all duration-300
                    ${paymentMethod === method.value
                    ? "bg-blue-500 text-white border-blue-500 scale-105"
                    : "bg-blueGray-50 text-blueGray-700 border-blueGray-200 hover:bg-blue-100"}
                `}
                onClick={() => setPaymentMethod(method.value)}
                >
                {method.label}
                </button>
            ))}
            </div>
        </div>
    )
}

// Review Step
export const ReviewStep = ({ step, selectedDistricts = null, selectedSchools = null, donationType, amount, name, email, paymentMethod, paymentMethods }) => {
    return (
        <div>
            {step.content}
            <div className="mb-4">

                {selectedDistricts && (
                    <>
                        <div className="font-semibold">Selected Districts:</div>
                        <div className="mb-2">{selectedDistricts}</div>
                    </>
                )}
                {selectedSchools && (
                    <>
                        <div className="font-semibold">Selected Schools:</div>
                        <div className="mb-2">{selectedSchools}</div>
                    </>
                )}
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
    )
}
