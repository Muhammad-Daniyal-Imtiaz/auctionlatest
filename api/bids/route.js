import { NextResponse } from 'next/server';
import supabase from '../../Supabase/config';

// GET handler for fetching bids (sorted with latest first)
export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const productId = searchParams.get('productId');
  
      if (!productId) {
        return NextResponse.json(
          { success: false, error: 'Product ID is required' },
          { status: 400 }
        );
      }
  
      const { data, error } = await supabase
        .from('bids')
        .select(`
          id,
          product_id,
          clerk_id,
          user_id,
          amount,
          avatar,
          created_at,
          bid_time
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
  
      if (error) throw error;
  
      // Process the bids data with proper sorting
      const processedBids = data.map(bid => {
        // For each bid, sort its bidHistory (individual bid amounts/times)
        const bidHistory = bid.amount
          .map((amount, index) => ({
            amount: parseFloat(amount),
            time: bid.bid_time?.[index] || bid.created_at
          }))
          // Sort individual bid amounts in descending order (newest first)
          .sort((a, b) => new Date(b.time) - new Date(a.time));
  
        return {
          ...bid,
          bidHistory,
          // Add a latestBidTime field for easier sorting of all bids
          latestBidTime: bidHistory[0]?.time || bid.created_at,
          // Add maxBidAmount for easy reference
          maxBidAmount: Math.max(...bidHistory.map(b => b.amount))
        };
      })
      // Sort all bids by their latest bid time (newest first)
      .sort((a, b) => new Date(b.latestBidTime) - new Date(a.latestBidTime));
  
      return NextResponse.json({
        success: true,
        bids: processedBids
      });
    } catch (error) {
      console.error('Error fetching bids:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
  
  // POST handler for placing bids with validation
  export async function POST(request) {
    try {
      const { productId, clerkId, amount, userAvatar, userName } = await request.json();
  
      // Validate inputs
      if (typeof productId !== 'string' || !productId.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
        return NextResponse.json(
          { success: false, error: 'Invalid product ID format' },
          { status: 400 }
        );
      }
  
      if (typeof clerkId !== 'string' || clerkId.trim() === '') {
        return NextResponse.json(
          { success: false, error: 'Invalid user ID' },
          { status: 400 }
        );
      }
  
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        return NextResponse.json(
          { success: false, error: 'Invalid bid amount' },
          { status: 400 }
        );
      }
  
      // Get current highest bid from all users
      const { data: currentBids, error: fetchError } = await supabase
        .from('bids')
        .select('amount')
        .eq('product_id', productId);
  
      if (fetchError) throw fetchError;
  
      // Find the maximum bid amount across all bids
      let maxBid = 0;
      currentBids?.forEach(bid => {
        const amounts = bid.amount.map(a => parseFloat(a));
        const bidMax = Math.max(...amounts);
        if (bidMax > maxBid) maxBid = bidMax;
      });
  
      // Validate bid amount is higher than current max
      if (numericAmount <= maxBid) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Bid too low',
            details: {
              currentMaxBid: maxBid,
              message: `Your bid must be higher than $${maxBid.toFixed(2)}`
            }
          },
          { status: 400 }
        );
      }
  
      const currentTime = new Date().toISOString();
  
      // Check for existing bids from this user
      const { data: existingBids, error: userBidError } = await supabase
        .from('bids')
        .select('id, amount, bid_time')
        .eq('product_id', productId)
        .eq('clerk_id', clerkId);
  
      if (userBidError) throw userBidError;
  
      if (existingBids?.length > 0) {
        // Update existing bid
        const updatedAmount = [...existingBids[0].amount, numericAmount];
        const updatedBidTime = [...existingBids[0].bid_time, currentTime];
  
        const { error: updateError } = await supabase
          .from('bids')
          .update({
            amount: updatedAmount,
            bid_time: updatedBidTime,
            avatar: userAvatar,
            user_id: userName
          })
          .eq('id', existingBids[0].id);
  
        if (updateError) throw updateError;
      } else {
        // Create new bid
        const { error: insertError } = await supabase
          .from('bids')
          .insert({
            product_id: productId,
            clerk_id: clerkId,
            user_id: userName,
            amount: [numericAmount],
            avatar: userAvatar,
            bid_time: [currentTime],
            created_at: currentTime
          });
  
        if (insertError) throw insertError;
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error placing bid:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to place bid' },
        { status: 500 }
      );
    }
  }