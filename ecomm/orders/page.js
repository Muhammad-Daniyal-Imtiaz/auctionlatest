'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/Supabase/config';
import Image from 'next/image';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch orders, products, and images from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) throw productsError;

      // Fetch product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) throw imagesError;

      // Organize images by product ID
      const imagesByProduct = {};
      imagesData.forEach(image => {
        if (!imagesByProduct[image.product_id]) {
          imagesByProduct[image.product_id] = [];
        }
        imagesByProduct[image.product_id].push(image);
      });

      setOrders(ordersData || []);
      setProducts(productsData || []);
      setProductImages(imagesByProduct);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.clerk_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete order
  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const { error } = await supabase.from('orders').delete().eq('id', orderId);
        if (error) throw error;
        fetchData(); // Refresh the list
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  // Handle edit order
  const handleEdit = (order) => {
    setEditingOrder(order);
    try {
      const parsedProducts = JSON.parse(order.products);
      setSelectedProducts(parsedProducts);
    } catch {
      setSelectedProducts([]);
    }
    setIsModalOpen(true);
  };

  // Handle save edited order
  const handleSave = async () => {
    if (!editingOrder) return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({
          customer: editingOrder.customer,
          status: editingOrder.status,
          amount: calculateTotal(),
          shipping_address: editingOrder.shipping_address,
          notes: editingOrder.notes,
          currency: editingOrder.currency,
          products: JSON.stringify(selectedProducts),
        })
        .eq('id', editingOrder.id);

      if (error) throw error;

      setIsModalOpen(false);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Handle input change for edit form
  const handleInputChange = (e) => {
    if (!editingOrder) return;

    const { name, value } = e.target;
    setEditingOrder({
      ...editingOrder,
      [name]: value,
    });
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: getFirstProductImage(product.id)?.original_url || null
        }];
      }
    });
  };

  // Get first image for a product
  const getFirstProductImage = (productId) => {
    if (productImages[productId] && productImages[productId].length > 0) {
      return productImages[productId][0];
    }
    return null;
  };

  // Handle product quantity change
  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev => 
      prev.map(p => 
        p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  // Calculate total amount
  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 text-purple-600 flex items-center justify-center">
      <div className="text-xl font-light tracking-wider">Loading orders...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-light tracking-wider mb-8 border-b border-purple-300 pb-4 text-purple-600">
          ORDER MANAGEMENT
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by customer, ID, status..."
              className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Product Images</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-purple-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    let orderProducts = [];
                    try {
                      orderProducts = JSON.parse(order.products);
                    } catch {
                      orderProducts = [];
                    }

                    return (
                      <tr key={order.id} className="hover:bg-purple-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">{order.id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.currency || 'USD'} {order.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2">
                            {orderProducts.slice(0, 5).map((product, index) => {
                              const productImage = productImages[product.id]?.[0]?.original_url || product.image;
                              return (
                                <div key={index} className="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                                  {productImage ? (
                                    <Image
                                      src={productImage}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            {orderProducts.length > 5 && (
                              <div className="relative h-10 w-10 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                +{orderProducts.length - 5}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(order)}
                            className="mr-3 text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="text-pink-600 hover:text-pink-800 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-purple-500">
                      No orders found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light tracking-wider text-purple-600">EDIT ORDER DETAILS</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Customer</label>
                    <input
                      type="text"
                      name="customer"
                      value={editingOrder.customer || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={editingOrder.status || 'pending'}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Shipping Address</label>
                    <textarea
                      name="shipping_address"
                      value={editingOrder.shipping_address || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={editingOrder.notes || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Currency</label>
                    <select
                      name="currency"
                      value={editingOrder.currency || 'USD'}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Order Total:</span>
                      <span className="text-lg font-semibold text-purple-600">
                        {editingOrder.currency || 'USD'} {calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Available Products</label>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                      {products.map((product) => {
                        const productImage = getFirstProductImage(product.id)?.original_url;
                        return (
                          <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={selectedProducts.some(p => p.id === product.id)}
                                onChange={() => handleProductSelect(product)}
                                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                              />
                              {productImage && (
                                <div className="w-8 h-8 relative rounded overflow-hidden">
                                  <Image
                                    src={productImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              )}
                              <span className="text-sm text-gray-700">{product.name}</span>
                            </div>
                            <span className="text-sm text-gray-700">${product.price.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2">Selected Products</label>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                      {selectedProducts.length > 0 ? (
                        selectedProducts.map((product) => {
                          const productImage = productImages[product.id]?.[0]?.original_url || product.image;
                          return (
                            <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                              <div className="flex items-center space-x-3">
                                {productImage && (
                                  <div className="w-8 h-8 relative rounded overflow-hidden">
                                    <Image
                                      src={productImage}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <span className="text-sm text-gray-700">{product.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  min="1"
                                  value={product.quantity}
                                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                                  className="w-16 p-1 bg-white border border-gray-200 rounded text-center text-sm"
                                />
                                <span className="text-sm text-gray-700">= ${(product.price * product.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center text-sm text-gray-500 py-4">No products selected</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}