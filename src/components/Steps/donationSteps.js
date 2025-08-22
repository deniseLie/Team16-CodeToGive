import React from "react";

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
    return (
        <div>
            {step.content}
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

// Your Details Step
export const YourDetailsStep = ({ step, name, email, setName, setEmail }) => {
    return (
        <div>
            {step.content}
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
export const ReviewStep = ({ step, donationType, amount, name, email, paymentMethod, paymentMethods }) => {
    return (
        <div>
            {step.content}
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
    )
}
