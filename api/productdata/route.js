import { NextResponse } from 'next/server';
import supabase from '@/app/Supabase/config';

export async function GET() {
  try {
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select(`
        id,
        clerk_id,
        name,
        description,
        price,
        product_images (original_url),
        sale_type,
        currentbid,
        min_bid_increment,
        bidders,
        timeleft
      `)
      .order('created_at', { ascending: false })
      .limit(6);

    if (productsError) throw productsError;

    if (!productsData || productsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const formattedProducts = productsData.map(product => ({
      id: product.id,
      clerk_id: product.clerk_id,
      title: product.name || 'Untitled Product',
      description: product.description || 'No description available',
      price: product.price || 0,
      image: product.product_images?.[0]?.original_url || '/placeholder.svg',
      sale_type: product.sale_type || 'fixed',
      currentbid: product.currentbid || null,
      min_bid_increment: product.min_bid_increment || 1.00,
      bidders: product.bidders || 0,
      timeleft: product.timeleft || null
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error('Error in product data API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}