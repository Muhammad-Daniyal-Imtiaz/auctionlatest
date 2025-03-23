'use client'
import { motion } from "framer-motion";
import { Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreviewStep = ({ 
  previewUrls, 
  selectedImages, 
  toggleImageSelection, 
  setSelectedImages 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Product Images</h2>
        <p className="text-gray-500">Choose which images to include in your product listing</p>
      </div>

      {previewUrls.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {previewUrls.map((url, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleImageSelection(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                selectedImages.includes(index) ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              {selectedImages.includes(index) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-2 right-2 bg-primary text-white rounded-full p-1"
                >
                  <Check size={16} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-xl">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500">No images uploaded yet</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {selectedImages.length} of {previewUrls.length} images selected
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedImages(previewUrls.map((_, i) => i))}
          disabled={previewUrls.length === 0}
        >
          Select All
        </Button>
      </div>
    </motion.div>
  );
};

export default PreviewStep;