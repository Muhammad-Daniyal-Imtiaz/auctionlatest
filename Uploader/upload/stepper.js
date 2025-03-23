'use client'
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
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
  );
};

export default Stepper;