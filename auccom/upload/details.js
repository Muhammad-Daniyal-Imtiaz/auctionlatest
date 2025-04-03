// details.js
'use client';
import { motion } from "framer-motion";
import { FileText, X, Clock, Gavel, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";

const DetailsStep = ({ 
  productDetails, 
  handleDetailsChange, 
  handleCategoryChange, 
  selectedTags, 
  toggleTagSelection, 
  categories,
  predictions
}) => {
  const [isAuction, setIsAuction] = useState(false);
  const [auctionType, setAuctionType] = useState("static");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));

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
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Gavel className="text-primary" />
            <div>
              <Label htmlFor="auction-mode">Auction Mode</Label>
              <p className="text-sm text-gray-500">Enable to sell via auction</p>
            </div>
          </div>
          <Switch 
            id="auction-mode" 
            checked={isAuction} 
            onCheckedChange={setIsAuction} 
          />
        </div>

        {isAuction && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="text-primary" />
              <h3 className="font-medium">Auction Settings</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="starting-price">Starting Price</Label>
                <Input
                  id="starting-price"
                  name="startingPrice"
                  value={productDetails.startingPrice || ''}
                  onChange={handleDetailsChange}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="reserve-price">Reserve Price (Minimum)</Label>
                <Input
                  id="reserve-price"
                  name="reservePrice"
                  value={productDetails.reservePrice || ''}
                  onChange={handleDetailsChange}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Auction Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="static-auction"
                    value="static"
                    checked={auctionType === "static"}
                    onChange={() => setAuctionType("static")}
                  />
                  <Label htmlFor="static-auction">Static Auction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="live-auction"
                    value="live"
                    checked={auctionType === "live"}
                    onChange={() => setAuctionType("live")}
                  />
                  <Label htmlFor="live-auction">Live Auction</Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {auctionType === "static" ? (
                <div className="flex flex-col gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComp
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComp
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          fromDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComp
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          fromDate={startDate || new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
            </div>

            {auctionType === "static" && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Bidding will automatically end at the specified time</span>
              </div>
            )}
            {auctionType === "live" && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Live bidding will be available between the specified dates</span>
              </div>
            )}
          </div>
        )}

        {/* Existing fields */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleDetailsChange}
            placeholder="Enter product name"
          />
        </div>

        {/* Rest of the existing fields... */}
      </div>

      <div className="pt-6">
        <Button className="w-full" size="lg">
          {isAuction ? "Create Auction" : "Create Product"}
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailsStep;