import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  try {
    if (request.headers.get('content-type') !== 'application/json') {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid content type' }),
        { status: 400, headers }
      );
    }

    const data = await request.json();

    const requiredFields = ['name', 'description', 'price', 'category', 'clerk_id', 'images'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing required fields",
          missingFields
        }),
        { status: 400, headers }
      );
    }

    if (!Array.isArray(data.images) || data.images.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "At least one image is required" }),
        { status: 400, headers }
      );
    }

    const price = parseFloat(data.price);
    if (isNaN(price)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid price format" }),
        { status: 400, headers }
      );
    }

    const productData = {
      name: data.name,
      description: data.description,
      price: price,
      category: data.category,
      tags: data.tags || [],
      sale_type: data.sale_type || 'fixed',
      clerk_id: data.clerk_id,
      user_email: data.user_email || null,
      user_name: data.user_name || null,
      user_image: data.user_image || null
    };

    if (data.sale_type === 'auction') {
      const requiredAuctionFields = [
        'start_date', 'end_date',
        'start_time', 'end_time',
        'min_bid_increment'
      ];
      const missingAuctionFields = requiredAuctionFields.filter(field => !data[field]);

      if (missingAuctionFields.length > 0) {
        return new NextResponse(
          JSON.stringify({
            error: "Missing required auction fields",
            missingFields: missingAuctionFields
          }),
          { status: 400, headers }
        );
      }

      productData.start_date = data.start_date;
      productData.end_date = data.end_date;
      productData.start_time = data.start_time;
      productData.end_time = data.end_time;
      productData.min_bid_increment = parseFloat(data.min_bid_increment) || 1.00;
      productData.auction_status = 'pending';
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (productError) {
      console.error('Supabase product insert error:', productError);
      throw productError;
    }

    const imagesToInsert = data.images.map(image => ({
      product_id: product.id,
      clerk_id: data.clerk_id,
      original_url: image,
      original_image_url: image, // Use the secure URL from Cloudinary
      processed_url: null,
      selected_version: 'original',
      is_processed: false
    }));

    const { error: imageError } = await supabase
      .from('product_images')
      .insert(imagesToInsert);

    if (imageError) {
      console.error('Supabase image insert error:', imageError);
      throw imageError;
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        product: {
          ...product,
          images: imagesToInsert
        }
      }),
      { status: 200, headers }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(
      JSON.stringify({
        error: error.message || 'Failed to create product',
        details: process.env.NODE_ENV === 'development' ? error.stack : null
      }),
      { status: 500, headers }
    );
  }
}
