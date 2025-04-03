'use client'
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const Stepper = ({ steps, currentStep, onAuctionSubmit }) => {
  const [auctionType, setAuctionType] = useState("static");
  const [startingPrice, setStartingPrice] = useState("");
  const [staticEndTime, setStaticEndTime] = useState("");
  const [liveStartTime, setLiveStartTime] = useState("");

  const handleAuctionSubmit = () => {
    if (!startingPrice || startingPrice <= 0) {
      alert("Please enter a valid starting price.");
      return;
    }
    if (auctionType === "static" && !staticEndTime) {
      alert("Please select an end time for static bidding.");
      return;
    }
    if (auctionType === "dynamic" && !liveStartTime) {
      alert("Please select a start time for live bidding.");
      return;
    }
    onAuctionSubmit({ auctionType, startingPrice, staticEndTime, liveStartTime });
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Auction Type Selection */}
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            value="static"
            checked={auctionType === "static"}
            onChange={() => setAuctionType("static")}
          />
          Static Auction
        </label>
        <label>
          <input
            type="radio"
            value="dynamic"
            checked={auctionType === "dynamic"}
            onChange={() => setAuctionType("dynamic")}
          />
          Dynamic Auction
        </label>
      </div>

      {/* Starting Price Input */}
      <div>
        <label className="block text-sm font-medium">Starting Price</label>
        <input
          type="number"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter starting price"
        />
      </div>

      {/* Static End Time Input */}
      {auctionType === "static" && (
        <div>
          <label className="block text-sm font-medium">Static End Time</label>
          <input
            type="datetime-local"
            value={staticEndTime}
            onChange={(e) => setStaticEndTime(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      )}

      {/* Live Start Time Input */}
      {auctionType === "dynamic" && (
        <div>
          <label className="block text-sm font-medium">Live Start Time</label>
          <input
            type="datetime-local"
            value={liveStartTime}
            onChange={(e) => setLiveStartTime(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      )}

      {/* Stepper UI */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform ${
                currentStep === index 
                  ? "bg-primary" 
                  : currentStep > index 
                    ? "bg-success" 
                    : "bg-gray-200"
              }`}
              animate={{
                scale: currentStep === index ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: currentStep === index ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
            >
              {currentStep > index ? (
                <Check className="text-white" size={18} />
              ) : (
                <step.icon className={currentStep === index ? "text-white" : ""} size={18} />
              )}
            </motion.div>
            <span
              className={`text-sm ${
                currentStep === index 
                  ? "font-medium text-primary" 
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: currentStep > index ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAuctionSubmit}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Submit Auction
      </button>
    </div>
  );
};

export default Stepper;