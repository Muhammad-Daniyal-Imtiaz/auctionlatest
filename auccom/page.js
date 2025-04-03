'use client';
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Upload, ImageIcon, Tag, FileText, Moon, Sun, Sparkles, Leaf, Zap, Minimize2 } from "lucide-react";
import Stepper from "./upload/stepper";
import UploadStep from "./upload/upl";
import PreviewStep from "./upload/preview";
import TagsStep from "./upload/tag";
import DetailsStep from "./upload/details";
import ThemeSwitcherComponent from "./upload/themes";
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { CopilotPopup } from "@copilotkit/react-ui";

const themes = {
  dark: {
    name: "Dark Mode",
    icon: Moon,
    className: "theme-dark bg-zinc-900 text-zinc-100",
    accent: "bg-indigo-500",
  },
  light: {
    name: "Light Mode",
    icon: Sun,
    className: "theme-light bg-zinc-50 text-zinc-900",
    accent: "bg-blue-500",
  },
  cyberpunk: {
    name: "Cyberpunk",
    icon: Sparkles,
    className: "theme-cyberpunk bg-purple-950 text-pink-300",
    accent: "bg-pink-500",
  },
  nature: {
    name: "Nature",
    icon: Leaf,
    className: "theme-nature bg-emerald-950 text-emerald-100",
    accent: "bg-emerald-500",
  },
  futuristic: {
    name: "Futuristic",
    icon: Zap,
    className: "theme-futuristic bg-slate-900 text-sky-300",
    accent: "bg-sky-500",
  },
  minimalist: {
    name: "Minimalist",
    icon: Minimize2,
    className: "theme-minimalist bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
    accent: "bg-neutral-500",
  },
};

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
  });
  const [theme, setTheme] = useState("light");
  const [isUploading, setIsUploading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    document.body.className = themes[theme].className;
  }, [theme]);

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
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleImageSelection = (index) => {
    setSelectedImages((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const toggleTagSelection = (tagName) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]));
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
      previewUrls={files.map((file) => URL.createObjectURL(file))}
      selectedImages={selectedImages}
      toggleImageSelection={toggleImageSelection}
      setSelectedImages={setSelectedImages}
    />,
    <TagsStep
      key="tags"
      aiTags={aiTags}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      setSelectedTags={setSelectedTags}
    />,
    <DetailsStep
      key="details"
      productDetails={productDetails}
      handleDetailsChange={handleDetailsChange}
      handleCategoryChange={handleCategoryChange}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      categories={categories}
      predictions={predictions}
    />,
  ];

  // Make available to Copilot all the current state data
  useCopilotReadable({
    description: "The current product details.",
    value: productDetails,
  });

  useCopilotReadable({
    description: "The current step in the product upload process.",
    value: currentStep,
  });

  useCopilotReadable({
    description: "The current selected tags for the product.",
    value: selectedTags,
  });

  useCopilotReadable({
    description: "The tags suggested by AI image analysis.",
    value: aiTags,
  });

  useCopilotReadable({
    description: "The selected images indices.",
    value: selectedImages,
  });

  useCopilotReadable({
    description: "The uploaded files for the product.",
    value: files.map(file => file.name),
  });

  useCopilotReadable({
    description: "Number of uploaded image files.",
    value: files.length,
  });
  
  useCopilotReadable({
    description: "Whether any images have been uploaded yet.",
    value: files.length > 0,
  });

  useCopilotReadable({
    description: "Image predictions from AI analysis.",
    value: predictions,
  });

  // Copilot action to update product details
  useCopilotAction({
    name: "updateProductDetails",
    description: "Update the product details and move to the next step if appropriate",
    parameters: [
      {
        name: "details",
        type: "object",
        description: "The new product details.",
        attributes: [
          {
            name: "name",
            type: "string",
            description: "The name of the product.",
          },
          {
            name: "description",
            type: "string",
            description: "The description of the product.",
          },
          {
            name: "price",
            type: "string",
            description: "The price of the product.",
          },
          {
            name: "category",
            type: "string",
            description: "The category of the product.",
          },
        ],
      },
      {
        name: "moveToNextStep",
        type: "boolean",
        description: "Whether to automatically move to the next step after updating details.",
        required: false,
      },
    ],
    handler: ({ details, moveToNextStep = true }) => {
      setProductDetails(prev => ({
        ...prev,
        ...details
      }));
      
      if (moveToNextStep && currentStep < 3) {
        handleNext();
      }
      
      return { 
        success: true, 
        message: "Product details updated successfully",
        details: details
      };
    },
    render: "Updating product details...",
  });

  // Copilot action to add tags
  useCopilotAction({
    name: "addTags",
    description: "Add tags to the product and optionally move to the next step",
    parameters: [
      {
        name: "tags",
        type: "string[]",
        description: "The tags to add to the product.",
      },
      {
        name: "moveToNextStep",
        type: "boolean",
        description: "Whether to automatically move to the next step after adding tags.",
        required: false,
      },
    ],
    handler: ({ tags, moveToNextStep = true }) => {
      const newTags = tags.filter(tag => !selectedTags.includes(tag));
      setSelectedTags(prevTags => [...prevTags, ...newTags]);
      
      if (moveToNextStep && currentStep < 3) {
        handleNext();
      }
      
      return { 
        success: true, 
        message: `Added ${newTags.length} new tags`,
        tagsAdded: newTags
      };
    },
    render: "Adding tags...",
  });

  // Copilot action to select images
  useCopilotAction({
    name: "selectImages",
    description: "Select specific images by indices and optionally move to the next step",
    parameters: [
      {
        name: "indices",
        type: "number[]",
        description: "The indices of the images to select. Use integers starting from 0.",
      },
      {
        name: "moveToNextStep",
        type: "boolean",
        description: "Whether to automatically move to the next step after selecting images.",
        required: false,
      },
    ],
    handler: ({ indices, moveToNextStep = true }) => {
      const validIndices = indices.filter(index => index >= 0 && index < files.length);
      setSelectedImages(validIndices);
      
      if (moveToNextStep && currentStep < 3) {
        handleNext();
      }
      
      return { 
        success: true, 
        message: `Selected ${validIndices.length} images`,
        selectedIndices: validIndices
      };
    },
    render: "Selecting images...",
  });

  // Copilot action to move to a specific step
  useCopilotAction({
    name: "goToStep",
    description: "Navigate to a specific step in the product upload flow",
    parameters: [
      {
        name: "step",
        type: "number",
        description: "The step number to navigate to (0-3): 0=Upload, 1=Preview, 2=Tags, 3=Details",
      },
    ],
    handler: ({ step }) => {
      // Validate image upload requirement when trying to navigate past step 0
      if (step > 0 && files.length === 0) {
        return {
          success: false,
          message: "You need to upload at least one image before proceeding to the next steps."
        };
      }
      
      // Validate image selection requirement when trying to navigate past step 1
      if (step > 1 && selectedImages.length === 0) {
        return {
          success: false,
          message: "You need to select at least one image before proceeding to the next steps."
        };
      }
      
      if (step >= 0 && step <= 3) {
        setCurrentStep(step);
        return { 
          success: true, 
          message: `Navigated to step ${steps[step].title}`
        };
      } else {
        return { 
          success: false, 
          message: "Invalid step number. Please provide a number between 0 and 3."
        };
      }
    },
    render: "Navigating to step...",
  });

  // Copilot action to prompt users to upload images when none are present
  useCopilotAction({
    name: "promptForImageUpload",
    description: "Remind the user to upload at least one image for the product",
    parameters: [],
    handler: () => {
      if (files.length === 0) {
        // Make sure we're on the upload step
        if (currentStep !== 0) {
          setCurrentStep(0);
        }
        
        return {
          success: true,
          message: "Please upload at least one image for your product. You need to upload images before proceeding to other steps."
        };
      } else {
        return {
          success: true,
          message: `You have already uploaded ${files.length} image(s). You can proceed to the next step.`,
          files: files.map(file => file.name)
        };
      }
    },
    render: "Checking image upload status...",
  });
  
  // Copilot action to complete the entire process
  useCopilotAction({
    name: "completeProductUpload",
    description: "Automatically complete the product upload process with the provided details",
    parameters: [
      {
        name: "productInfo",
        type: "object",
        description: "Complete product information",
        attributes: [
          {
            name: "name",
            type: "string",
            description: "The name of the product.",
            required: true,
          },
          {
            name: "description",
            type: "string",
            description: "The description of the product.",
            required: true,
          },
          {
            name: "price",
            type: "string",
            description: "The price of the product.",
            required: true,
          },
          {
            name: "category",
            type: "string",
            description: "The category of the product.",
            required: true,
          },
          {
            name: "tags",
            type: "string[]",
            description: "Tags for the product.",
            required: false,
          },
        ],
      },
    ],
    handler: async ({ productInfo }) => {
      // First check if at least one image is uploaded
      if (files.length === 0) {
        return {
          success: false,
          message: "You need to upload at least one image before completing the product upload process."
        };
      }
      
      // Update all product details
      setProductDetails({
        name: productInfo.name,
        description: productInfo.description,
        price: productInfo.price,
        category: productInfo.category,
      });
      
      // Add tags if provided
      if (productInfo.tags && productInfo.tags.length > 0) {
        const newTags = productInfo.tags.filter(tag => !selectedTags.includes(tag));
        setSelectedTags(prev => [...prev, ...newTags]);
      }
      
      // If we have files and no selected images, select all images
      if (files.length > 0 && selectedImages.length === 0) {
        setSelectedImages(Array.from({ length: files.length }, (_, i) => i));
      }
      
      // Navigate to the final step
      setCurrentStep(3);
      
      return { 
        success: true, 
        message: "Product information completed successfully",
        productDetails: {
          ...productInfo,
          selectedImages: selectedImages,
          totalFiles: files.length
        }
      };
    },
    render: "Completing product upload...",
  });

  return (
    <div className="min-h-screen transition-colors duration-300 bg-light text-dark">
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Uploader</h1>
          <ThemeSwitcherComponent theme={theme} setTheme={setTheme} themes={themes} />
        </div>

        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex-1 flex flex-col">
          <div className="flex-1">
            <AnimatePresence mode="wait">{stepContents[currentStep]}</AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-primary border-primary"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 0 && files.length === 0) ||
              (currentStep === 1 && selectedImages.length === 0) ||
              currentStep === 3
            }
            className="flex items-center gap-2 text-primary border-primary"
          >
            {currentStep < 3 ? (
              <>
                Next
                <ChevronRight size={16} />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        {/* Display predictions */}
        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Predictions:</h3>
          <ul className="space-y-2">
            {predictions.map((pred, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <strong>{pred.label}</strong>
                <span className="text-sm text-gray-500">({(pred.score * 100).toFixed(2)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CopilotPopup */}
      <CopilotPopup
        instructions={
          "You are a helpful assistant for the product upload process. " +
          "You can help the user upload product images, select images, add tags, " +
          "and fill in product details. " +
          
          "IMPORTANT IMAGE REQUIREMENT: " +
          "At least one image MUST be uploaded to proceed with the product upload process. " +
          "If no images have been uploaded (check 'files.length' or 'Whether any images have been uploaded yet'), " +
          "use the 'promptForImageUpload' action to notify the user and direct them to upload images first. " +
          "Always check if images are uploaded before helping with other steps. " +
          
          "If a user asks about adding product details, tags, or other information when no images are uploaded, " +
          "first inform them about the image requirement and use 'promptForImageUpload' action. " +
          
          "If a user provides product details like name, description, price, category, " +
          "or tags, you should automatically update those fields in the form using the appropriate actions " +
          "and move to the appropriate step in the process, but only if images have been uploaded."
        }
        labels={{
          title: "Product Upload Assistant",
          initial: "Need help with your product upload? Remember to upload at least one image to proceed!",
        }}
      />
    </div>
  );
}