import { NextResponse } from 'next/server';
import supabase from '../../../Supabase/config';

export async function POST(request: Request) {
  try {
    const { productId, clerkId, amount, userAvatar, userName } = await request.json();

    if (!productId || !clerkId || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid bid details' },
        { status: 400 }
      );
    }

    const currentTime = new Date().toISOString();

    // Check for existing bid
    const { data: existingBids, error: fetchError } = await supabase
      .from('bids')
      .select('*')
      .eq('product_id', productId)
      .eq('clerk_id', clerkId);

    if (fetchError) throw fetchError;

    if (existingBids?.length > 0) {
      // Update existing bid
      const { error: updateError } = await supabase
        .from('bids')
        .update({
          amount: [...(existingBids[0].amount || []), amount],
          bid_time: [...(existingBids[0].bid_time || []), currentTime],
          avatar: userAvatar,
          user_id: userName
        })
        .eq('id', existingBids[0].id);

      if (updateError) throw updateError;
    } else {
      // Create new bid
      const { error: insertError } = await supabase
        .from('bids')
        .insert([{
          product_id: productId,
          clerk_id: clerkId,
          user_id: userName,
          amount: [amount],
          avatar: userAvatar,
          bid_time: [currentTime],
          created_at: currentTime
        }]);

      if (insertError) throw insertError;
    }

    return NextResponse.json(
      { message: 'Bid placed successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Bid placement error:', err);
    return NextResponse.json(
      { error: 'Failed to place bid' },
      { status: 500 }
    );
  }
}