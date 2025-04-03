'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const TagsStep = ({ 
  aiTags, 
  selectedTags, 
  toggleTagSelection,
  setSelectedTags
}) => {
  const [customTag, setCustomTag] = useState("");
  const [auctionType, setAuctionType] = useState("static"); // static or dynamic
  const [startingPrice, setStartingPrice] = useState("");
  const [staticEndTime, setStaticEndTime] = useState("");
  const [liveStartTime, setLiveStartTime] = useState("");

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      toggleTagSelection(customTag.trim());
      setCustomTag("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && customTag.trim()) {
      toggleTagSelection(customTag.trim());
      setCustomTag("");
    }
  };

  const handleAuctionTypeChange = (type) => {
    setAuctionType(type);
  };

  const handleStartingPriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setStartingPrice(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">AI-Generated Tags</h2>
        <p className="text-gray-500">Our AI has analyzed your images and suggested these tags</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {aiTags.map((tag, index) => (
            <motion.div
              key={tag.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleTagSelection(tag.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                selectedTags.includes(tag.name)
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <span>{tag.name}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedTags.includes(tag.name)
                    ? "bg-white/20"
                    : "bg-gray-400/20"
                }`}
              >
                {Math.round(tag.confidence * 100)}%
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {aiTags.length > 0 && (
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">
            {selectedTags.length} of {aiTags.length} tags selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedTags([])}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedTags(aiTags.map((tag) => tag.name))}>
              Select All
            </Button>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-bold mb-4">Auction Settings</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Auction Type</label>
            <div className="flex gap-4">
              <Button
                variant={auctionType === "static" ? "primary" : "outline"}
                onClick={() => handleAuctionTypeChange("static")}
              >
                Static
              </Button>
              <Button
                variant={auctionType === "dynamic" ? "primary" : "outline"}
                onClick={() => handleAuctionTypeChange("dynamic")}
              >
                Dynamic
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="starting-price" className="block mb-2">
              Starting Price
            </label>
            <Input
              id="starting-price"
              type="number"
              placeholder="Enter starting price"
              value={startingPrice}
              onChange={handleStartingPriceChange}
            />
          </div>

          {auctionType === "static" && (
            <div>
              <label htmlFor="static-end-time" className="block mb-2">
                Static Bidding End Time
              </label>
              <Input
                id="static-end-time"
                type="datetime-local"
                value={staticEndTime}
                onChange={(e) => setStaticEndTime(e.target.value)}
              />
            </div>
          )}

          {auctionType === "dynamic" && (
            <div>
              <label htmlFor="live-start-time" className="block mb-2">
                Live Bidding Start Time
              </label>
              <Input
                id="live-start-time"
                type="datetime-local"
                value={liveStartTime}
                onChange={(e) => setLiveStartTime(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label htmlFor="custom-tags" className="block mb-2">
          Add Custom Tags
        </label>
        <div className="flex gap-2">
          <Input
            id="custom-tags"
            placeholder="Enter a tag and press Enter"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="secondary" onClick={handleAddCustomTag}>Add</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TagsStep;