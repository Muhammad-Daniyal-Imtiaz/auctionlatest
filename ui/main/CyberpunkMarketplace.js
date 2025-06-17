'use client';
import { useState, useEffect, useRef } from "react";

const CyberpunkMarketplace = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    shippingAddress: '',
    notes: ''
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [isBidding, setIsBidding] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const googlePayButtonRef = useRef(null);
  const [isGooglePayLoaded, setIsGooglePayLoaded] = useState(false);
  const paymentsClientRef = useRef(null);

  // Google Pay configuration
  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY || 'example',
            gatewayMerchantId: process.env.NEXT_PUBLIC_GATEWAY_MERCHANT_ID || 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID || 'BCR2DN4TXL5QJBIH',
      merchantName: process.env.NEXT_PUBLIC_MERCHANT_NAME || 'Marketplace'
    }
  };

  // Load Google Pay script
  useEffect(() => {
    if (window.google && window.google.payments && window.google.payments.api.PaymentsClient) {
      setIsGooglePayLoaded(true);
      paymentsClientRef.current = new google.payments.api.PaymentsClient({
        environment: process.env.NEXT_PUBLIC_GOOGLE_PAY_ENV || 'TEST'
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.onload = () => {
      if (window.google && window.google.payments && window.google.payments.api.PaymentsClient) {
        setIsGooglePayLoaded(true);
        paymentsClientRef.current = new google.payments.api.PaymentsClient({
          environment: process.env.NEXT_PUBLIC_GOOGLE_PAY_ENV || 'TEST'
        });
      } else {
        console.error('Google Pay SDK loaded but required objects not available');
        setIsGooglePayLoaded(false);
      }
    };
    script.onerror = () => {
      console.error('Failed to load Google Pay script');
      setIsGooglePayLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize component
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (err) {
        console.error('Error parsing cart items:', err);
      }
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/productdata');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Buy Now click
  const handleBuyClick = (product) => {
    if (!userData) {
      alert('Please log in to make a purchase');
      return;
    }

    setSelectedProduct(product);
    setPaymentStatus('ready');
    setPaymentMessage('Complete your purchase with Google Pay');

    if (isGooglePayLoaded && paymentsClientRef.current) {
      initializeGooglePayButton(product);
    }
  };

  // Initialize Google Pay button
  const initializeGooglePayButton = (product) => {
    if (!paymentsClientRef.current) {
      console.error('PaymentsClient not initialized');
      return;
    }

    paymentsClientRef.current.isReadyToPay(baseRequest)
      .then(response => {
        if (response.result) {
          const button = paymentsClientRef.current.createButton({
            onClick: () => initiatePayment(product),
            buttonType: 'buy',
            buttonColor: 'black'
          });

          if (googlePayButtonRef.current) {
            googlePayButtonRef.current.innerHTML = '';
            googlePayButtonRef.current.appendChild(button);
          }
        } else {
          throw new Error('Google Pay is not available');
        }
      })
      .catch(err => {
        console.error('Google Pay readiness error:', err);
        handlePaymentError(err);
      });
  };

  // Initiate payment flow
  const initiatePayment = async (product) => {
    try {
      setPaymentStatus('processing');
      setPaymentMessage('Processing your payment...');

      const paymentDataRequest = {
        ...baseRequest,
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: product.price.toString(),
          currencyCode: 'USD',
          countryCode: 'US'
        }
      };

      const paymentData = await paymentsClientRef.current.loadPaymentData(paymentDataRequest);
      const result = await processPayment(paymentData, product);

      if (result.success) {
        setPaymentStatus('success');
        setPaymentMessage('Payment successful! Thank you for your purchase.');

        setTimeout(() => {
          setPaymentStatus('idle');
          setSelectedProduct(null);
        }, 3000);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (err) {
      handlePaymentError(err);
    }
  };

  // Process payment with backend
  const processPayment = async (paymentData, product) => {
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentData,
          orderDetails: {
            amount: product.price,
            products: [{
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              clerk_id: product.clerk_id
            }],
            currency: 'USD',
            customer: userData.name || 'Anonymous Customer',
            clerk_id: userData.clerk_id,
            clerk_id_seller: product.clerk_id,
            status: 'completed',
            shipping_address: 'Digital Delivery'
          }
        })
      });
      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      return await response.json();
    } catch (err) {
      throw new Error('Failed to process payment');
    }
  };

  // Handle payment errors
  const handlePaymentError = (error) => {
    console.error('Payment Error:', error);
    setPaymentStatus('error');
    setPaymentMessage(error.message || 'Payment failed. Please try another method.');
  };

  // Handle Order button click
  const handleOrderClick = (product) => {
    if (!userData) {
      alert('Please log in to place an order');
      return;
    }
    setSelectedProduct(product);
    setIsOrdering(true);
    setOrderSuccess(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle bid amount change
  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  // Handle Place Bid click
  const handlePlaceBidClick = (product) => {
    if (!userData) {
      alert('Please log in to place a bid');
      return;
    }
    window.location.href = `/products/${product.id}`;
  };

  // Submit bid
  const submitBid = async () => {
    try {
      setIsBidding(true);
      setError(null);

      if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
        throw new Error('Please enter a valid bid amount');
      }

      const response = await fetch('/api/place-bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
          clerkId: userData.clerk_id,
          bidAmount: parseFloat(bidAmount),
          userName: userData.name || 'Anonymous Bidder',
          userEmail: userData.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place bid');
      }

      // Update the product in state with the new bid
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === selectedProduct.id
            ? {
                ...product,
                currentbid: parseFloat(bidAmount),
                bidders: (product.bidders || 0) + 1
              }
            : product
        )
      );

      setBidSuccess(true);
    } catch (error) {
      console.error('Bid error:', error);
      setError(error.message);
    } finally {
      setIsBidding(false);
    }
  }

  // Confirm order (continued)
  const confirmOrder = async () => {
    try {
      if (!userData) {
        throw new Error('You must be logged in to place an order');
      }

      const orderData = {
        clerk_id: userData.clerk_id,
        clerkid_seller: selectedProduct.clerk_id,
        customer: userData.name || 'Anonymous Customer',
        amount: selectedProduct.price * orderDetails.quantity,
        products: [{
          id: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          quantity: orderDetails.quantity,
          clerk_id: selectedProduct.clerk_id
        }],
        shipping_address: orderDetails.shippingAddress,
        notes: orderDetails.notes,
        status: 'pending',
        currency: 'USD'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      setOrderSuccess(true);
      setIsOrdering(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Order error:', error);
      setError(error.message);
    }
  };

  // Handle Add to Cart button click
  const handleAddToCart = (product) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [...existingCartItems, product];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    alert('Product added to cart!');
  };

  // Render order form
  const renderOrderForm = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Place Order</h3>
            <button
              onClick={() => setIsOrdering(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Product:</p>
            <p className="font-medium">{selectedProduct?.title}</p>
            <p className="text-blue-600 font-bold mt-1">${selectedProduct?.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={orderDetails.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea
                name="shippingAddress"
                value={orderDetails.shippingAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                name="notes"
                value={orderDetails.notes}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={confirmOrder}
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render payment modal
  const renderPaymentModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Complete Purchase</h3>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setPaymentStatus('idle');
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Product:</p>
            <p className="font-medium">{selectedProduct?.title}</p>
            <p className="text-blue-600 font-bold mt-1">${selectedProduct?.price.toFixed(2)}</p>
          </div>

          {paymentStatus === 'processing' && (
            <div className="flex flex-col items-center justify-center py-4">
              <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-center text-gray-700">{paymentMessage}</p>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{paymentMessage}</p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{paymentMessage}</p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'ready' && (
            <div>
              <p className="text-gray-700 mb-4 text-center">{paymentMessage}</p>
              <div ref={googlePayButtonRef} className="flex justify-center"></div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Secure payment processing by Google Pay
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-800">
      {/* Order Modal */}
      {isOrdering && renderOrderForm()}

      {/* Payment Modal */}
      {selectedProduct && paymentStatus !== 'idle' && renderPaymentModal()}

      {/* Order Success Message */}
      {orderSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Order placed successfully! Thank you for your purchase.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (products.length > 0 ? (
        <div className="w-full px-2 lg:px-4 xl:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              product.title && product.description && product.price && product.image ? (
                <div
                  key={product.id}
                  className="relative group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all duration-300"
                >
                  {/* Auction badge */}
                  {product.sale_type === 'auction' && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-xs font-bold px-3 py-1 rounded-full z-10 text-white shadow-sm">
                      AUCTION
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-1 transition-colors">{product.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    {product.sale_type === 'auction' ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current Bid:</span>
                          <span className="text-lg font-bold text-yellow-600">
                            ${product.currentbid ? product.currentbid.toFixed(2) : product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Bidders:</span>
                          <span className="text-yellow-600">{product.bidders || 0}</span>
                        </div>
                        <button
                          onClick={() => handlePlaceBidClick(product)}
                          className="w-full mt-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-md text-sm font-medium transition-colors text-white"
                        >
                          Place Bid
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBuyClick(product)}
                            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium transition-colors text-white"
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={() => handleOrderClick(product)}
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors text-gray-800"
                          >
                            Order
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md text-sm font-medium transition-colors text-white"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No products available</h3>
          <p className="text-gray-500">Check back later for new inventory</p>
        </div>
      ))}
    </div>
  );
};

export default CyberpunkMarketplace;
