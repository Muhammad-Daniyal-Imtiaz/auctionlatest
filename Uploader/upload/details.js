'use client'
import { motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DetailsStep = ({ 
  productDetails, 
  handleDetailsChange, 
  handleCategoryChange, 
  selectedTags, 
  toggleTagSelection, 
  categories,
  predictions
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Product Details</h2>
        <p className="text-gray-500">Fill in the information about your product</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">Product Name</label>
          <Input
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleDetailsChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">Description</label>
          <Textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleDetailsChange}
            placeholder="Enter product description"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="font-medium">Price</label>
            <Input
              id="price"
              name="price"
              value={productDetails.price}
              onChange={handleDetailsChange}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-medium">Category</label>
            <Select value={productDetails.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <label className="font-medium">Selected Tags</label>
          <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-md min-h-10">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200">
                  <FileText size={14} />
                  <span>{tag}</span>
                  <button
                    onClick={() => toggleTagSelection(tag)}
                    className="ml-1 rounded-full p-0.5 bg-gray-400/20 text-gray-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm w-full text-center m-auto">No tags selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button className="w-full" size="lg">
          Create Product
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailsStep;