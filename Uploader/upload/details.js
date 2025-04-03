'use client';
import { motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const DetailsStep = ({ 
  productDetails, 
  handleDetailsChange, 
  handleCategoryChange, 
  handleSaleTypeChange,
  selectedTags, 
  toggleTagSelection, 
  categories,
  predictions,
  setProductDetails
}) => {
  const handleDateTimeChange = (field, value) => {
    setProductDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            required
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
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="font-medium">
              {productDetails.sale_type === "auction" ? "Starting Price" : "Price"}
            </label>
            <Input
              id="price"
              name="price"
              value={productDetails.price}
              onChange={handleDetailsChange}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-medium">Category</label>
            <Select 
              value={productDetails.category} 
              onValueChange={handleCategoryChange}
              required
            >
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

        {/* Sale Type Selection */}
        <div className="flex flex-col gap-2 pt-2">
          <label className="font-medium">Sale Type</label>
          <RadioGroup 
            value={productDetails.sale_type}
            className="flex gap-4"
            onValueChange={(value) => handleSaleTypeChange(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed">Fixed Price</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auction" id="auction" />
              <Label htmlFor="auction">Auction</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Auction-specific fields - only shown when sale_type is auction */}
        {productDetails.sale_type === "auction" && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {productDetails.startDate ? format(productDetails.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={productDetails.startDate}
                    onSelect={(date) => handleDateTimeChange("startDate", date)}
                    initialFocus
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Start Time</label>
              <Input
                type="time"
                value={productDetails.startTime}
                onChange={(e) => handleDateTimeChange("startTime", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {productDetails.endDate ? format(productDetails.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={productDetails.endDate}
                    onSelect={(date) => handleDateTimeChange("endDate", date)}
                    initialFocus
                    fromDate={productDetails.startDate || new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">End Time</label>
              <Input
                type="time"
                value={productDetails.endTime}
                onChange={(e) => handleDateTimeChange("endTime", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="minBidIncrement" className="font-medium">Minimum Bid Increment</label>
              <Input
                id="minBidIncrement"
                name="minBidIncrement"
                value={productDetails.minBidIncrement}
                onChange={handleDetailsChange}
                placeholder="0.00"
                type="number"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
        )}

        {/* Tags section */}
        <div className="flex flex-col gap-2 pt-4">
          <label className="font-medium">Selected Tags</label>
          <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-md min-h-10">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 dark:bg-zinc-700">
                  <FileText size={14} />
                  <span>{tag}</span>
                  <button
                    onClick={() => toggleTagSelection(tag)}
                    className="ml-1 rounded-full p-0.5 bg-gray-400/20 text-gray-500 dark:text-gray-300"
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

      {/* AI Predictions */}
      {predictions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg">
          <h3 className="font-bold mb-2">AI Suggestions</h3>
          <div className="space-y-2">
            {predictions.map((pred, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-white dark:bg-zinc-600 rounded">
                <span className="font-medium">{pred.label}</span>
                <span className="text-sm text-gray-500">{(pred.score * 100).toFixed(1)}% match</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DetailsStep;