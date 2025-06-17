import { NextResponse } from 'next/server';
import supabase from '@/app/Supabase/config';

export async function POST(request) {
  try {
    const { paymentData, orderDetails } = await request.json();
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        clerk_id: orderDetails.clerk_id,
        clerkid_seller: orderDetails.clerk_id_seller, // Seller ID from product
        customer: orderDetails.customer,
        amount: orderDetails.amount,
        status: 'completed',
        products: orderDetails.products,
        currency: orderDetails.currency || 'USD',
        shipping_address: orderDetails.shipping_address || 'Digital Delivery'
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      orderId: order[0].id
    }, { status: 200 });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Payment processing failed'
    }, { status: 500 });
  }
}