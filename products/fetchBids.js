import supabase from '../Supabase/config';

export default async function fetchBids(productId) {
  try {
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

    // Process the bids data to match the expected format
    const processedBids = data.map(bid => ({
      ...bid,
      bidHistory: bid.amount.map((amount, index) => ({
        amount: parseFloat(amount),
        time: bid.bid_time?.[index] || bid.created_at
      }))
    }));

    return {
      success: true,
      bids: processedBids
    };
  } catch (error) {
    console.error('Error fetching bids:', error);
    return {
      success: false,
      error: error.message
    };
  }
}