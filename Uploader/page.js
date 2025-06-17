'use client';
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Upload, ImageIcon, Tag, FileText, Loader2 } from "lucide-react";
import Stepper from "./upload/stepper";
import UploadStep from "./upload/upl";
import PreviewStep from "./upload/preview";
import TagsStep from "./upload/tag";
import DetailsStep from "./upload/details";
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { CopilotPopup } from "@copilotkit/react-ui";
import { toast } from "sonner";

const mockAITags = [
  { name: "Electronics", confidence: 0.98 },
  { name: "Smartphone", confidence: 0.95 },
  { name: "Mobile", confidence: 0.92 },
  { name: "Technology", confidence: 0.89 },
  { name: "Gadget", confidence: 0.85 },
  { name: "Touchscreen", confidence: 0.82 },
  { name: "Wireless", confidence: 0.78 },
  { name: "Digital", confidence: 0.75 },
  { name: "Portable", confidence: 0.72 },
  { name: "Modern", confidence: 0.68 },
];

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Automotive",
  "Health & Wellness",
  "Food & Beverages",
];

export default function ProductUploader() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [aiTags, setAiTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sale_type: "fixed",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (currentStep === 2) {
      setAiTags([]);
      const tagInterval = setInterval(() => {
        setAiTags((prev) => {
          if (prev.length >= mockAITags.length) {
            clearInterval(tagInterval);
            return prev;
          }
          return [...prev, mockAITags[prev.length]];
        });
      }, 300);
      return () => clearInterval(tagInterval);
    }
  }, [currentStep]);

  const handleSaleTypeChange = (type) => {
    if (type === "auction") {
      setProductDetails(prev => ({
        ...prev,
        sale_type: type,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        startTime: "12:00",
        endTime: "12:00",
        minBidIncrement: "1.00",
        auctionStatus: "pending"
      }));
    } else {
      const { startDate, endDate, startTime, endTime, minBidIncrement, auctionStatus, ...rest } = productDetails;
      setProductDetails({
        ...rest,
        sale_type: type
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    // Validate required fields
    if (!productDetails.name || !productDetails.description || !productDetails.price || !productDetails.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    // Additional validation for auctions
    if (productDetails.sale_type === "auction") {
      if (!productDetails.startDate || !productDetails.endDate) {
        toast.error("Please set auction start and end dates");
        return;
      }

      const now = new Date();
      const startDateTime = new Date(
        `${productDetails.startDate.toISOString().split('T')[0]}T${productDetails.startTime}`
      );
      const endDateTime = new Date(
        `${productDetails.endDate.toISOString().split('T')[0]}T${productDetails.endTime}`
      );

      if (startDateTime >= endDateTime) {
        toast.error("Auction end time must be after start time");
        return;
      }

      if (startDateTime < now) {
        toast.error("Auction start time must be in the future");
        return;
      }

      if (parseFloat(productDetails.minBidIncrement || 0) <= 0) {
        toast.error("Minimum bid increment must be greater than 0");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Prepare base product data
      const productData = {
        name: productDetails.name,
        description: productDetails.description,
        price: parseFloat(productDetails.price),
        category: productDetails.category,
        tags: selectedTags,
        sale_type: productDetails.sale_type,
        clerk_id: user.id,
        user_email: user.primaryEmailAddress?.emailAddress,
        user_name: user.fullName,
        user_image: user.imageUrl,
        images: files
          .filter((_, index) => selectedImages.includes(index))
          .map(file => file.cloudinaryUrl),
      };

      // Add auction-specific data if needed
      if (productDetails.sale_type === "auction") {
        // Format dates to ISO strings
        const startDateISO = new Date(
          `${productDetails.startDate.toISOString().split('T')[0]}T${productDetails.startTime}`
        ).toISOString();

        const endDateISO = new Date(
          `${productDetails.endDate.toISOString().split('T')[0]}T${productDetails.endTime}`
        ).toISOString();

        Object.assign(productData, {
          start_date: startDateISO,
          end_date: endDateISO,
          start_time: productDetails.startTime,
          end_time: productDetails.endTime,
          min_bid_increment: parseFloat(productDetails.minBidIncrement),
          auction_status: "pending",
        });
      }

      // Make API request
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Product creation failed');
      }

      toast.success(
        productDetails.sale_type === "auction"
          ? "Auction created successfully!"
          : "Product listed successfully!"
      );
      router.push(`/products/${result.product.id}`);
    } catch (error) {
      console.error('Product creation error:', error);
      toast.error(error.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleImageSelection = (index) => {
    setSelectedImages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleTagSelection = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]
    );
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setProductDetails((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setProductDetails(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const steps = [
    { title: "Upload", icon: Upload },
    { title: "Preview", icon: ImageIcon },
    { title: "Tags", icon: Tag },
    { title: "Details", icon: FileText },
  ];

  const stepContents = [
    <UploadStep
      key="upload"
      files={files}
      setFiles={setFiles}
      uploadProgress={uploadProgress}
      isUploading={isUploading}
      setUploadProgress={setUploadProgress}
      setIsUploading={setIsUploading}
      setPredictions={setPredictions}
    />,
    <PreviewStep
      key="preview"
      files={files}
      selectedImages={selectedImages}
      toggleImageSelection={toggleImageSelection}
    />,
    <TagsStep
      key="tags"
      aiTags={aiTags}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      setSelectedTags={setSelectedTags}
      categories={categories}
    />,
    <DetailsStep
      key="details"
      productDetails={productDetails}
      handleDetailsChange={handleDetailsChange}
      handleCategoryChange={handleCategoryChange}
      handleSaleTypeChange={handleSaleTypeChange}
      handleDateChange={handleDateChange}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      categories={categories}
      predictions={predictions}
      setProductDetails={setProductDetails}
    />,
  ];

  useCopilotReadable({
    description: "Current product details",
    value: productDetails
  });

  useCopilotReadable({
    description: "Current step index",
    value: currentStep
  });

  useCopilotReadable({
    description: "Uploaded files",
    value: files
  });

  useCopilotReadable({
    description: "Selected images indices",
    value: selectedImages
  });

  useCopilotReadable({
    description: "AI generated tags",
    value: aiTags
  });

  useCopilotReadable({
    description: "Selected tags",
    value: selectedTags
  });

  useCopilotAction({
    name: "updateProductDetails",
    description: "Update product details and optionally move to next step",
    parameters: [
      {
        name: "details",
        type: "object",
        description: "Product details to update",
        attributes: [
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "price", type: "string" },
          { name: "category", type: "string" },
          { name: "sale_type", type: "string", enum: ["fixed", "auction"] }
        ]
      },
      {
        name: "moveToNextStep",
        type: "boolean",
        description: "Whether to move to next step after update",
        required: false
      }
    ],
    handler: ({ details, moveToNextStep = false }) => {
      if (details.sale_type === "auction" && productDetails.sale_type !== "auction") {
        handleSaleTypeChange("auction");
      } else if (details.sale_type === "fixed" && productDetails.sale_type !== "fixed") {
        handleSaleTypeChange("fixed");
      }

      setProductDetails(prev => ({ ...prev, ...details }));
      if (moveToNextStep && currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">List Your Product</h1>
        </div>

        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 mb-6 flex-1 flex flex-col backdrop-blur-md">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {stepContents[currentStep]}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 border-white text-white hover:bg-white hover:bg-opacity-20"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 0 && files.length === 0) ||
              (currentStep === 1 && selectedImages.length === 0) ||
              isSubmitting
            }
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : currentStep < 3 ? (
              <>
                Next
                <ChevronRight size={16} />
              </>
            ) : (
              productDetails.sale_type === "auction" ? "Start Auction" : "List Product"
            )}
          </Button>
        </div>

        {submitError && (
          <div className="text-red-500 text-sm mt-2 text-center">{submitError}</div>
        )}

        {predictions.length > 0 && (
          <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-xl shadow-md backdrop-blur-md">
            <h3 className="font-bold mb-2 text-blue-600">AI Predictions:</h3>
            <ul className="space-y-2">
              {predictions.map((pred, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-white bg-opacity-20 rounded">
                  <strong className="text-gray-800">{pred.label}</strong>
                  <span className="text-blue-600">{(pred.score * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CopilotPopup
        instructions={`
          You are a product upload assistant. Help users through the 4-step process:
          1. Upload - Must upload at least one image
          2. Preview - Select images
          3. Tags - Add product tags
          4. Details - Enter product information

          Rules:
          - Always verify images are uploaded before proceeding
          - For auctions, collect all required fields
          - Provide clear guidance at each step
          - Help with writing good product descriptions
          - Suggest appropriate tags based on the product
        `}
        labels={{
          title: "Listing Assistant",
          initial: "How can I help with your product listing today?"
        }}
        defaultOpen={false}
        clickOutsideToClose={true}
      />
    </div>
  );
}