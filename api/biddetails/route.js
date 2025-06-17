
import { NextResponse } from 'next/server';
import supabase from '@/app/Supabase/config';

export async function GET(request) {
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Fetch product details
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError) throw productError;
    if (!productData) throw new Error('Product not found');

    // Fetch product images
    const { data: imagesData, error: imagesError } = await supabase
      .from('product_images')
      .select('original_url, processed_url, selected_version')
      .eq('product_id', productId);

    if (imagesError) throw imagesError;

    // Prepare images array
    const images = imagesData.map(img =>
      img.selected_version === 'processed' && img.processed_url
        ? img.processed_url
        : img.original_url
    ).filter(url => url);

    // Combine product data with images
    const combinedData = {
      ...productData,
      images: images.length > 0 ? images : ['/placeholder-product.jpg'],
    };

    return NextResponse.json(combinedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
