import supabase from '../Supabase/config';

export default async function placeBid({ productId, clerkId, amount, userAvatar, userName }) {
  try {
    // Validate inputs
    if (typeof productId !== 'string' || !productId.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      throw new Error('Invalid product ID format');
    }

    if (typeof clerkId !== 'string' || clerkId.trim() === '') {
      throw new Error('Invalid user ID');
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Invalid bid amount');
    }

    const currentTime = new Date().toISOString();

    // Check for existing bids
    const { data: existingBids, error: fetchError } = await supabase
      .from('bids')
      .select('id, amount, bid_time')
      .eq('product_id', productId)
      .eq('clerk_id', clerkId);

    if (fetchError) throw fetchError;

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

    return { success: true };
  } catch (error) {
    console.error('Error placing bid:', error);
    return {
      success: false,
      error: error.message || 'Failed to place bid'
    };
  }
}