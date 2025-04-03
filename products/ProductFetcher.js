'use client'
import { useState, useEffect } from 'react';
import supabase from "../Supabase/config";

export default function ProductFetcher({ productId, children }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductWithDetails = async () => {
    try {
      setLoading(true);
      setError(null);

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

      // Fetch bids if it's an auction
      let bidsData = [];
      if (productData.sale_type === 'auction') {
        const { data: bids, error: bidsError } = await supabase
          .from('bids')
          .select('*')
          .eq('product_id', productId)
          .order('created_at', { ascending: false });

        if (bidsError) throw bidsError;
        bidsData = bids;
      }

      // Fetch user details for bids
      const userIds = bidsData.map(bid => bid.user_id);
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('clerk_id, email, username, profile_image_url')
        .in('clerk_id', userIds);

      if (usersError) throw usersError;

      // Prepare images array
      const images = imagesData.map(img =>
        img.selected_version === 'processed' && img.processed_url
          ? img.processed_url
          : img.original_url
      ).filter(url => url);

      // Map bids with user details
      const bidsWithUsers = bidsData.map(bid => {
        const user = usersData.find(user => user.clerk_id === bid.user_id);
        return {
          ...bid,
          user: user || { clerk_id: bid.user_id, email: '', username: '', profile_image_url: '' }
        };
      });

      setProductData({
        ...productData,
        images: images.length > 0 ? images : ['/placeholder-product.jpg'],
        bids: bidsWithUsers.map(bid => ({
          ...bid,
          time: bid.created_at,
        })),
      });
    } catch (err) {
      setError(err.message);
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for new bids
  useEffect(() => {
    if (!productId || !productData || productData.sale_type !== 'auction') return;

    const channel = supabase
      .channel(`product_bids_${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bids',
          filter: `product_id=eq.${productId}`
        },
        () => fetchProductWithDetails()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId, productData]);

  // Initial fetch
  useEffect(() => {
    fetchProductWithDetails();
  }, [productId]);

  const placeBid = async (bidData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bids')
        .insert({
          product_id: productId,
          amount: bidData.amount,
          user_id: bidData.user,
          avatar: bidData.avatar
        })
        .select()
        .single();

      if (error) throw error;

      // Update product price with the new bid
      await supabase
        .from('products')
        .update({ price: bidData.amount })
        .eq('id', productId);

      return data;
    } catch (err) {
      setError(`Failed to place bid: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (updateData) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', productId);

      if (error) throw error;
      await fetchProductWithDetails();
    } catch (err) {
      setError(`Failed to update product: ${err.message}`);
    }
  };

  if (loading && !productData) {
    return <div className="p-4 text-center">Loading product data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">{error}</div>
        <button
          onClick={fetchProductWithDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!productData) {
    return <div className="p-4 text-center">Product not found</div>;
  }

  return children({
    productData,
    loading,
    error,
    placeBid,
    updateProduct,
    refreshData: fetchProductWithDetails
  });
}
