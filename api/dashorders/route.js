import { NextResponse } from 'next/server';
import supabase from '../../Supabase/config';

export async function GET(request) {
  try {
    // Get clerk_id from query parameters
    const { searchParams } = new URL(request.url);
    const clerk_id = searchParams.get('clerk_id');

    if (!clerk_id) {
      return NextResponse.json(
        { error: 'clerk_id parameter is required' },
        { status: 400 }
      );
    }

    // Query orders from Supabase
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('clerk_id', clerk_id)
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform data to match frontend expectations
    const transformedData = data.map(order => ({
      id: `#ORD-${order.id.slice(0, 8).toUpperCase()}`,
      date: new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      items: order.products ? order.products.map(p => p.name) : [],
      total: `${order.currency || 'USD'} ${order.amount}`,
      status: order.status || 'Processing'
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}