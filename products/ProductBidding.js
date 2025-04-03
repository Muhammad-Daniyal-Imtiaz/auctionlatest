'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import supabase from "../Supabase/config";
import { useUser } from '@clerk/clerk-react';
import fetchBids from './fetchBids';
import placeBid from './placeBid';

// ActiveLink Component
function ActiveLink({ children, href, onClick }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default function ProductBidding({ productId, clerkId }) {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState({
    fetching: true,
    placing: false
  });
  const [error, setError] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  const fetchAndSetBids = async () => {
    try {
      setLoading(prev => ({ ...prev, fetching: true }));
      setError(null);

      const { success, bids, error } = await fetchBids(productId);

      if (success) {
        setBids(bids);
      } else {
        throw new Error(error);
      }
    } catch (err) {
      console.error('Fetch bids error:', err);
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, fetching: false }));
    }
  };

  const handlePlaceBid = async () => {
    try {
      const stringProductId = typeof productId === 'object' ? productId.id : productId;

      const amount = parseFloat(bidAmount);
      if (isNaN(amount)) {
        setError('Please enter a valid number');
        return;
      }

      if (amount <= 0) {
        setError('Bid amount must be greater than 0');
        return;
      }

      setLoading(prev => ({ ...prev, placing: true }));
      setError(null);

      const { success, error } = await placeBid({
        productId: stringProductId,
        clerkId,
        amount,
        userAvatar: user?.imageUrl || `https://avatar.vercel.sh/${clerkId}.png`,
        userName: user?.username || user?.fullName || `User${clerkId.slice(0, 4)}`
      });

      if (!success) {
        throw new Error(error);
      }

      setBidAmount('');
      await fetchAndSetBids();
    } catch (err) {
      console.error('Place bid error:', err);
      setError(err.message || 'Failed to place bid. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, placing: false }));
    }
  };

  const handleAvatarClick = async (selectedUserId) => {
    const sortedIds = [user.id, selectedUserId].sort((a, b) => b - a);
    const sumIds = sortedIds.reduce((a, b) => a + b, 0);
    const channelName = `${sortedIds[0]}${sortedIds[1]}${sumIds}`;

    // Check if the channel already exists
    const { data, error } = await supabase
      .from('channels')
      .select('id')
      .eq('channel_name', channelName)
      .single();

    if (error) {
      console.error('Error checking channel:', error);
      return;
    }

    if (data) {
      // Channel exists, navigate to the channel
      router.push(`/channel/${channelName}`);
    } else {
      // Channel does not exist, create it
      const { error: insertError } = await supabase
        .from('channels')
        .insert([{ channel_name: channelName, user1_id: sortedIds[0], user2_id: sortedIds[1] }]);

      if (insertError) {
        console.error('Error creating channel:', insertError);
      } else {
        // Navigate to the newly created channel
        router.push(`/channel/${channelName}`);
      }
    }
  };

  useEffect(() => {
    if (!productId) return;

    fetchAndSetBids();

    const channel = supabase
      .channel(`product_bids_${productId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bids',
          filter: `product_id=eq.${productId}`
        },
        fetchAndSetBids
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  if (loading.fetching && bids.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 space-y-4 border">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 border">
      <h2 className="text-xl font-bold">Place Your Bid</h2>

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid amount"
          className="flex-1"
          step="0.01"
          min="0"
          disabled={loading.placing}
        />
        <Button
          onClick={handlePlaceBid}
          disabled={loading.placing || !bidAmount}
        >
          {loading.placing ? 'Placing Bid...' : 'Place Bid'}
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Bid History</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {bids.length > 0 ? (
            bids.map((bid) => (
              <div key={bid.id} className="border-b pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <ActiveLink href={`#`} onClick={() => handleAvatarClick(bid.user_id)}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={bid.avatar} />
                      <AvatarFallback>
                        {(bid.user_id?.charAt(0) || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </ActiveLink>
                  <span className="font-medium">{bid.user_id}</span>
                </div>
                <div className="ml-10 space-y-1">
                  {bid.bidHistory?.map((bidItem, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {new Date(bidItem.time).toLocaleString()}
                      </span>
                      <span className="font-medium">
                        ${bidItem.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No bids yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
