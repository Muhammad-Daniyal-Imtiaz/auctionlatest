'use client';
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        try {
          setCartItems(JSON.parse(storedCartItems));
        } catch (err) {
          console.error("Error parsing cart items:", err);
          localStorage.removeItem("cartItems");
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    // Load cart items initially
    loadCartItems();

    // Listen for changes in local storage from other tabs
    const handleStorageChange = (event) => {
      if (event.key === "cartItems") {
        loadCartItems();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events from the same tab
    const handleCartUpdate = () => loadCartItems();
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Update local storage and dispatch events
  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    // Dispatch a custom event to notify other components in the same tab
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Add item to cart
  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    updateCart(updatedCartItems);
    alert("Added to cart!");
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCartItems);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-md hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M17 13l1.6 8M6 21h12M9 5h6"
          />
        </svg>
        Cart
        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItems.length}
        </span>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-blue-500 border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4 text-white">Your Cart</h3>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-gray-200">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-300 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-200 text-center">Your cart is empty.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;