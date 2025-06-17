import { NextResponse } from 'next/server';
import supabase from '@/app/Supabase/config';

// Fetch Products
export async function GET(request) {
  try {
    const clerkId = request.nextUrl.searchParams.get('clerk_id');

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Clerk ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          original_image_url
        )
      `)
      .eq('clerk_id', clerkId);

    if (error) {
      console.error('Supabase query error:', error.message, error.details);
      throw error;
    }

    const products = data.map(product => ({
      ...product,
      images: product.product_images?.map(img => img.original_image_url) || []
    }));

    return NextResponse.json({ products });

  } catch (error) {
    console.error('API route error:', error.message, error.stack);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Update Product
export async function PUT(request) {
  try {
    const product = await request.json();

    if (!product.id || !product.clerk_id || !product.category || !product.sale_type || !product.user_email) {
      return NextResponse.json(
        { error: 'Product ID, Clerk ID, Category, Sale Type, and User Email are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .upsert([{
        id: product.id,
        clerk_id: product.clerk_id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        sale_type: product.sale_type,
        user_email: product.user_email,
      }])
      .select();

    if (error) {
      console.error('Supabase update error:', error.message, error.details);
      throw error;
    }

    return NextResponse.json({ message: 'Product updated successfully', product: data[0] });

  } catch (error) {
    console.error('API route error:', error.message, error.stack);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Delete Product
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url, 'http://localhost');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error.message, error.details);
      throw error;
    }

    return NextResponse.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('API route error:', error.message, error.stack);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Upload Image
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const { searchParams } = new URL(request.url, 'http://localhost');
    const productId = searchParams.get('id');

    if (!file || !productId) {
      return NextResponse.json(
        { error: 'Image and Product ID are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error.message, error.details);
      throw error;
    }

    const imageUrl = data.Key.replace(/^public\//, '');

    const { error: insertError } = await supabase
      .from('product_images')
      .insert([{ product_id: productId, original_image_url: imageUrl }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError.message, insertError.details);
      throw insertError;
    }

    return NextResponse.json({ message: 'Image uploaded successfully', imageUrl });

  } catch (error) {
    console.error('API route error:', error.message, error.stack);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}
