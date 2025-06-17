import { NextResponse } from 'next/server';
import supabase from '@/app/Supabase/config';

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        clerk_id: orderData.clerk_id,
        clerkid_seller: orderData.clerkid_seller,
        customer: orderData.customer,
        amount: orderData.amount,
        status: orderData.status || 'pending',
        products: orderData.products,
        currency: orderData.currency || 'USD',
        shipping_address: orderData.shipping_address,
        notes: orderData.notes
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      orderId: order[0].id
    }, { status: 200 });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create order'
    }, { status: 500 });
  }
}