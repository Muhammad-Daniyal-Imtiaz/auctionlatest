import { NextResponse } from 'next/server';
import supabase from '../../Supabase/config';

// GET endpoint to fetch user details
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerk_id = searchParams.get('clerk_id');

    if (!clerk_id) {
      return NextResponse.json(
        { error: 'clerk_id parameter is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerk_id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update user details
export async function PUT(request) {
  try {
    const { clerk_id, updates } = await request.json();

    if (!clerk_id || !updates) {
      return NextResponse.json(
        { error: 'clerk_id and updates are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('clerk_id', clerk_id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json(
      { error: 'Failed to update user details' },
      { status: 500 }
    );
  }
}