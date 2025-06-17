'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CyberpunkMarketplace from "./CyberpunkMarketplace.js";
import SearchAmazon from "./amazonsearch/page";

const Header = ({ cartItems, toggleDropdown, isDropdownOpen, removeFromCart }) => {
  return (
    <header className="relative py-2 px-6 border-b border-gray-200 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 shadow-sm">
      {/* Futuristic grid pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000099_1px,transparent_1px),linear-gradient(to_bottom,#00000099_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              width: `${10 + i % 10}px`,
              height: `${10 + i % 10}px`,
              left: `${i * 5}%`,
              top: `${i * 5}%`,
            }}
            animate={{
              y: [0, 20],
              x: [0, 20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-4 md:mb-0"
        >
          <div className="relative bg-gray-300 px-4 py-2 rounded-md shadow-md">
            <motion.h1
              className="text-4xl font-bold text-black px-2 py-1"
              style={{
                WebkitTextStroke: "1px #FFD700",
                color: "black",
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              }}
            >
              Neon-Nexus
            </motion.h1>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {[
            {
              label: "Home",
              path: "http://localhost:3000/",
              icon: (
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
                    d="M3 12l2-2m0 0l7-7 7 7m-9 2v10m4-10v10m5-10h2a2 2 0 012 2v7a2 2 0 01-2 2h-2m-4 0h-4m-4 0H5a2 2 0 01-2-2v-7a2 2 0 012-2h2"
                  />
                </svg>
              ),
            },
            {
              label: "Dashboard",
              path: "http://localhost:3000/ecomm/",
              icon: (
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
                    d="M3 10h11M9 21V3m12 10h-3m-6 8h6m-6-4h6"
                  />
                </svg>
              ),
            },
            {
              label: "Product Upload",
              path: "http://localhost:3000/Uploader",
              icon: (
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
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-4l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
              ),
            },
            {
              label: "About",
              path: "#",
              icon: (
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
                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              ),
            },
          ].map(({ label, path, icon }) => (
            <motion.div
              key={label}
              className="bg-gray-300 px-6 py-3 rounded-lg shadow-md transition-all flex items-center"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 215, 0, 0.9)",
                boxShadow: "0 8px 20px rgba(255, 215, 0, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.a
                href={path}
                className="text-lg font-bold text-gray-800 transition-colors flex items-center"
                whileHover={{
                  color: "red",
                  textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                }}
              >
                {icon}
                {label}
              </motion.a>
            </motion.div>
          ))}
        </nav>

        {/* Cart Section */}
        <div className="ml-auto relative">
          <CartButton cartItems={cartItems} toggleDropdown={toggleDropdown} />
          {isDropdownOpen && (
            <CartDropdown cartItems={cartItems} removeFromCart={removeFromCart} />
          )}
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 px-6 border-t border-gray-200 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-sm">
      <div className="container mx-auto text-center">
        <div className="text-gray-600 text-xs mb-2">
          © {new Date().getFullYear()} CyberMarket | All Rights Reserved
        </div>
        <div className="flex justify-center space-x-4 mt-3">
          <FooterLink icon="github" />
          <FooterLink icon="twitter" />
          <FooterLink icon="discord" />
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ icon }) => {
  return (
    <motion.a
      href="#"
      className="text-gray-500 hover:text-gray-700 transition-colors"
      whileHover={{ y: -2, scale: 1.2, color: "#3b82f6" }}
      whileTap={{ scale: 0.9 }}
    >
      {icon === 'github' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )}
      {icon === 'twitter' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )}
      {icon === 'discord' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3846-.4058-.8742-.6177-.12495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
        </svg>
      )}
    </motion.a>
  );
};

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    'All', 'Electronics', 'Beauty', 'Fashion',
    'Software', 'Hardware'
  ];

  return (
    <div className="flex flex-row gap-4 mb-6 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="relative mt-[-20px] mb-4 max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <motion.input
        type="text"
        className="block w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-sm"
        placeholder="Search for cybernetic enhancements..."
        whileFocus={{
          boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.9)"
        }}
      />
      <motion.button
        className="absolute inset-y-0 right-0 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-r-md text-white font-medium transition-colors flex items-center shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        SEARCH
      </motion.button>
    </div>
  );
};

const CartButton = ({ cartItems, toggleDropdown }) => {
  return (
    <motion.button
      className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-md hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg"
      onClick={toggleDropdown}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      key={cartItems.length} // Force re-render when cart items change
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
      <motion.span 
        className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
        key={cartItems.length} // Ensure animation plays when count changes
      >
        {cartItems.length}
      </motion.span>
    </motion.button>
  );
};

const CartDropdown = ({ cartItems, removeFromCart }) => {
  return (
    <motion.div
      className="absolute right-0 mt-2 w-80 bg-blue-500 border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4 text-white">Your Cart</h3>
        {cartItems.length > 0 ? (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
              <motion.li 
                key={`${item.id}-${item.timestamp || Date.now()}`}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
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
                <motion.button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-300 hover:text-red-100 hover:underline text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Remove
                </motion.button>
              </motion.li>
            ))}
            
            {/* Total and checkout button */}
            <motion.div 
              className="pt-3 mt-3 border-t border-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">Total:</span>
                <span className="text-white font-bold">
                  ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </span>
              </div>
              <motion.button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-md text-white font-medium shadow-md"
                whileHover={{ scale: 1.02, backgroundColor: "#0891b2" }}
                whileTap={{ scale: 0.98 }}
              >
                Checkout
              </motion.button>
            </motion.div>
          </ul>
        ) : (
          <motion.p
            className="text-gray-200 text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Your cart is empty.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default function CyberMarket() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
          const parsedItems = JSON.parse(savedCartItems);
          // Ensure we have an array and it's not corrupted
          if (Array.isArray(parsedItems)) {
            setCartItems(parsedItems);
          } else {
            console.error("Invalid cart items format in localStorage");
            localStorage.removeItem('cartItems');
          }
        }
      } catch (error) {
        console.error("Error loading cart items:", error);
        localStorage.removeItem('cartItems');
      }
    };

    loadCartItems();

    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'cartItems') {
        loadCartItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Update local storage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const itemWithTimestamp = {
        ...item,
        timestamp: Date.now(), // Ensure each item has a unique identifier
      };
      return [...prevItems, itemWithTimestamp];
    });
    
    setIsDropdownOpen(true);
    showToast(`${item.title} added to cart!`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showToast = (message) => {
    // In a real implementation, you'd use a toast library
    console.log(message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Futuristic background with grid and light effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
        {/* Grid pattern with subtle texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000001A_1px,transparent_1px),linear-gradient(to_bottom,#0000001A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.05)_0%,_transparent_70%)] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.05)_0%,_transparent_70%)] mix-blend-overlay"></div>
        </div>

        {/* Animated floating elements */}
        {[...Array(20)].map((_, i) => {
          const colors = [
            'bg-cyan-400/20', 'bg-blue-400/20', 'bg-pink-400/20',
            'bg-purple-400/20'
          ];
          const randomColor = colors[i % colors.length];
          const size = 10 + i % 10;
          const blur = 3 + i % 5;

          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${randomColor} blur-sm`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${i * 5}%`,
                top: `${i * 5}%`,
                filter: `blur(${blur}px)`,
              }}
              animate={{
                x: [0, 20],
                y: [0, 20],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Diagonal lines for futuristic effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_45%,_rgba(59,130,246,0.3)_45%,_rgba(59,130,246,0.3)_55%,_transparent_55%)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_45%,_rgba(236,72,153,0.3)_45%,_rgba(236,72,153,0.3)_55%,_transparent_55%)] bg-[size:20px_20px]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header
          cartItems={cartItems}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          removeFromCart={removeFromCart}
        />

        <main className="flex-grow container mx-auto px-6 py-8">
          <div className="bg-white bg-opacity-80 rounded-lg border border-gray-200 p-6 shadow-xl backdrop-blur-sm">
            <SearchBar />

            {/* Categories Section */}
            <CategoryFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* Product Section */}
            <div className="flex gap-4 mt-6">
              <div className="flex-grow w-full bg-gray-500 p-6 rounded-lg shadow-md">
                <CyberpunkMarketplace activeCategory={activeCategory} addToCart={addToCart} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <SearchAmazon />
      </div>
    </div>
  );
}