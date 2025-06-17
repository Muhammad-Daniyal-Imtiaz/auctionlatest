'use client';
import { motion } from "framer-motion";
import { Check, ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PreviewStep = ({
  files,
  selectedImages,
  toggleImageSelection,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => {
            const isSelected = selectedImages.includes(index);

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-md overflow-hidden border-2 ${
                  isSelected ? "border-blue-500" : "border-gray-200 dark:border-gray-700"
                } transition-all`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/10 z-10" />
                  )}

                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={file.preview}
                      alt={`Preview ${index}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.image-fallback');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback hidden absolute inset-0 items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>

                  <div className={`absolute inset-0 flex flex-col justify-between p-2 transition-opacity ${
                    (hoveredIndex === index || isSelected) ? 'opacity-100' : 'opacity-0'
                  } hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent`}>
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImageSelection(index);
                        }}
                        className={`p-2 rounded-full ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-white/80 text-gray-700 hover:bg-white/100"
                        } transition-colors`}
                      >
                        {isSelected ? <Check size={18} /> : <span className="w-4 h-4 rounded-full border-2 border-gray-700" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="text-white text-sm font-medium">
                        {file?.file.name || `Image ${index + 1}`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-xl">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </motion.div>
  );
};

export default PreviewStep;
