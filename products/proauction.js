'use client'
import { Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductAuction({
  productData,
  timeLeft,
  bidAmount,
  setBidAmount,
  bidHistory = [],
  isLive,
  handleBid,
  formatTime
}) {
  const quickBid = (amount) => {
    setBidAmount(prev => {
      const newAmount = prev + amount;
      return Math.max(newAmount, (productData.price || 0) + (productData.bid_increment || 0));
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="h-6 w-6 text-purple-600" />
        <h2 className="text-lg font-bold text-gray-900">Auction Ending Soon!</h2>
        <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
          isLive ? "bg-green-100 text-green-800" :
          timeLeft.status === "ENDED" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
        }`}>
          {timeLeft.status === "LIVE" && <span className="animate-pulse">Live</span>}
          {timeLeft.status === "UPCOMING" && "Upcoming"}
          {timeLeft.status === "ENDED" && "Ended"}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="bg-white rounded-lg p-2 shadow-sm">
              <div className="text-xl font-bold text-gray-900">{timeLeft[unit] || 0}</div>
              <div className="text-xs text-gray-500 uppercase">{unit}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700">Current Bid:</p>
          <p className="text-xl font-bold text-gray-900">${(productData.price || 0).toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700">Next Bid:</p>
          <p className="text-lg font-medium text-gray-900">
            ${((productData.price || 0) + (productData.bid_increment || 0)).toFixed(2)}
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="pl-6"
              min={(productData.price || 0) + (productData.bid_increment || 0)}
            />
          </div>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleBid}
            disabled={!isLive || bidAmount <= (productData.price || 0)}
          >
            {isLive ? "Place Bid" : "Auction Not Live"}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Quick Bid Options</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => quickBid(10)}>+$10</Button>
            <Button variant="outline" size="sm" onClick={() => quickBid(20)}>+$20</Button>
            <Button variant="outline" size="sm" onClick={() => quickBid(50)}>+$50</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Bid History</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {bidHistory.length > 0 ? (
              bidHistory.map((bid, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={bid.user.profile_image_url} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{bid.user.username}</p>
                      <p className="text-sm text-gray-500">{formatTime(bid.created_at)}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">${bid.amount.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No bids yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
