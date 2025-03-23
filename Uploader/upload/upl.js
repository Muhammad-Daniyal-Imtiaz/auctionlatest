"use client";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const UploadStep = ({ 
  files, 
  setFiles, 
  uploadProgress, 
  isUploading, 
  setUploadProgress, 
  setIsUploading, 
  setPredictions 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
      simulateUpload();
      handleImageUpload(acceptedFiles[0]); // Classify the first uploaded image
    },
  });

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPEG, PNG, etc.).");
      return;
    }

    setLoading(true);
    setError(null);

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result?.toString().split(",")[1]; // Remove Base64 metadata

      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN || ""}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: base64Image, parameters: { top_k: 5 } }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          setError("Failed to classify image. Please try again.");
          return;
        }

        const data = await response.json();
        setPredictions(data.map((item) => ({ 
          label: item.label, 
          score: item.score 
        })));
      } catch (error) {
        console.error("Error classifying image:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Upload Product Images</h2>
        <p className="text-gray-500">Drag and drop your product images or click to browse</p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 cursor-pointer text-center transition-all ${
          isDragActive 
            ? "border-primary bg-primary/10" 
            : isDragReject 
              ? "border-red-400 bg-red-100" 
              : files.length === 0
                ? "border-yellow-400 bg-yellow-50" 
                : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: isDragActive ? 1.1 : 1,
              y: isDragActive ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Upload className="h-12 w-12 text-gray-500" />
          </motion.div>
          <div>
            <p className="font-medium">
              {isDragActive ? "Drop the files here..." : "Drag 'n' drop some files here, or click to select files"}
            </p>
            <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      
      {files.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Please upload at least one image to continue</span>
        </motion.div>
      )}

      {files.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Uploaded Files ({files.length})</h3>
            <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
              Clear All
            </Button>
          </div>

          {isUploading && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-md overflow-hidden border"
              >
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {loading && <p className="text-primary">Processing image...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </motion.div>
  );
};

export default UploadStep;