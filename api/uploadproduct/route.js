import { NextResponse } from 'next/server';

// In-memory storage for demonstration (in a real app, use a database)
let storedProducts = [];

// POST request handler to store product data
export async function POST(request) {
  const productData = await request.json();
  
  // Store the received product
  storedProducts.push(productData);
  
  console.log("Stored product:", productData);
  
  return NextResponse.json({
    success: true,
    product: productData
  });
}

// GET request handler to return all stored products
export async function GET() {
  console.log("Returning stored products:", storedProducts);
  
  return NextResponse.json({
    success: true,
    products: storedProducts
  });
}