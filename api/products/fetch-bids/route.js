import supabase from '../../../Supabase/config';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return new Response(JSON.stringify({ error: 'Product ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ 
      bids: data.map(bid => ({
        ...bid,
        amount: bid.amount || [],
        bid_time: bid.bid_time || []
      })) 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error fetching bids:', err);
    return new Response(JSON.stringify({ error: 'Failed to load bid history' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}