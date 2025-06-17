import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import supabase from "../Supabase/config";
import { useUser } from '@clerk/clerk-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

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
  const [showBidError, setShowBidError] = useState(false);
  const [bidErrorData, setBidErrorData] = useState({
    message: '',
    currentMax: 0
  });
  const { user } = useUser();
  const router = useRouter();

  const fetchAndSetBids = async () => {
    try {
      setLoading(prev => ({ ...prev, fetching: true }));
      setError(null);

      const response = await fetch(`/api/bids?productId=${productId}`);
      const { success, bids, error } = await response.json();

      if (!response.ok) {
        throw new Error(error || 'Failed to fetch bids');
      }

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

      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: stringProductId,
          clerkId,
          amount,
          userAvatar: user?.imageUrl || `https://avatar.vercel.sh/${clerkId}.png`,
          userName: user?.username || user?.fullName || `User${clerkId.slice(0, 4)}`
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Bid too low') {
          setBidErrorData({
            message: result.details.message,
            currentMax: result.details.currentMaxBid
          });
          setShowBidError(true);
          return;
        }
        throw new Error(result.error || 'Failed to place bid');
      }

      if (!result.success) {
        throw new Error(result.error);
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

  const generateChannelName = (id1, id2) => {
    const sortedIds = [id1, id2].sort((a, b) => b - a);
    const sum = sortedIds[0] + sortedIds[1];
    return `${sortedIds[0]}${sortedIds[1]}${sum}`;
  };

  const handleAvatarClick = async (bidderClerkId) => {
    try {
      setError(null);
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.id) {
        throw new Error('Sender ID not found in local storage');
      }
      const senderId = userData.id;

      const { data: receiverData, error: receiverError } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', bidderClerkId)
        .single();

      if (receiverError || !receiverData) {
        throw new Error('Could not find user information');
      }

      const receiverId = receiverData.id;
      const channelName = generateChannelName(senderId, receiverId);

      const { data: existingChannel } = await supabase
        .from('channels')
        .select('id')
        .eq('channel_name', channelName)
        .maybeSingle();

      if (existingChannel) {
        router.push(`/products/channel/${channelName}`);
        return;
      }

      const { error: createError } = await supabase
        .from('channels')
        .insert({
          channel_name: channelName,
          user1_id: senderId,
          user2_id: receiverId
        });

      if (createError) {
        console.log('Channel creation note:', createError.message);
      }

      router.push(`/products/channel/${channelName}`);

    } catch (err) {
      console.log('Error handling avatar click:', err.message);
      setError('Could not start chat. Please try again.');
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
    <div className="bg-white rounded-lg p-6 space-y-4 border relative">
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
                  <ActiveLink href={`#`} onClick={() => handleAvatarClick(bid.clerk_id)}>
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

      {/* Bid Error Dialog with Dark Colors and Bold Text */}
      <Dialog open={showBidError} onOpenChange={setShowBidError}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="font-bold">Bid Too Low</DialogTitle>
            <DialogDescription className="font-bold">
              {bidErrorData.message}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg font-bold">
              Current highest bid: ${bidErrorData.currentMax.toFixed(2)}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-gray-700"
              onClick={() => {
                setShowBidError(false);
                setBidAmount((bidErrorData.currentMax + 0.01).toFixed(2));
              }}
            >
              Bid ${(bidErrorData.currentMax + 0.01).toFixed(2)}
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600"
              onClick={() => setShowBidError(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
