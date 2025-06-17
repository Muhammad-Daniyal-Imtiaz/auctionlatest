// app/api/count/route.js
import { NextResponse } from 'next/server';
import supabase from '../../Supabase/config';

export async function GET(request) {
  try {
    // Get clerk_id from query parameters
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerk_id');

    if (!clerkId) {
      return NextResponse.json(
        { error: 'clerk_id is required' }, 
        { status: 400 }
      );
    }

    // Query Supabase for orders count
    const { count, error } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('clerk_id', clerkId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      success: true,
      count: count || 0 
    });
    
  } catch (error) {
    console.error('Error fetching orders count:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}