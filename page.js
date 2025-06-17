"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import supabase from "./Supabase/config";
import { useUser } from "@clerk/nextjs";
import styles from './LandingPage.module.css';

const products = [
  { id: 1, name: 'Premium Watch', price: 299.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Wireless Headphones', price: 199.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Smartphone Case', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
];

const testimonials = [
  { id: 1, name: 'John Doe', quote: 'The quality exceeded my expectations!', image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Jane Smith', quote: 'Fast shipping and excellent customer service.', image: '/placeholder.svg?height=100&width=100' },
];

const videoSources = [
  '/videos/ew1.mp4',
  '/videos/ev1.mp4',
  '/videos/et1.mp4',
  '/videos/ew1.mp4' // Repeating to demonstrate the cycle
];

const features = [
  {
    icon: <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-400" />,
    title: "Seamless Shopping",
    description: "Intuitive interface designed for effortless browsing and purchasing."
  },
  {
    icon: <Zap className="w-12 h-12 mx-auto mb-4 text-pink-500" />,
    title: "Curated Collections",
    description: "Handpicked items that match your style and preferences."
  },
  {
    icon: <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
    title: "Premium Quality",
    description: "Only the finest products that stand the test of time."
  }
];

const LandingPage = () => {
  const { user, isSignedIn } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRefs = useRef([]);
  const featuresSectionRef = useRef(null);
  const videosSectionRef = useRef(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const handleUserData = async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress;
        const username = user.username || email?.split('@')[0] || null;
        const name = user.fullName || username || email?.split('@')[0];
        const profileImageUrl = user.profileImageUrl || null;

        const { data, error } = await supabase
          .from("users")
          .upsert({
            clerk_id: user.id,
            email: email,
            username: username,
            profile_image_url: profileImageUrl,
            role: "authenticated",
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'clerk_id'
          })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          localStorage.setItem('userData', JSON.stringify({
            clerk_id: user.id,
            id: data.id,
            name: name,
            email: email,
            profile_image_url: profileImageUrl
          }));
        }
      } catch (err) {
        console.error("Error processing user:", err);
      }
    };

    handleUserData();
  }, [isSignedIn, user]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoSources.length);
      setVideoEnded(false);
    }, 500);
  };

  const handleNavClick = (section) => {
    if (section === "features") {
      videosSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        nextSlide();
      } else if (event.key === 'ArrowUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Animation variants for the hero text
  const heroTextVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.8 }
    }
  };

  // Debugging: Log video refs to ensure they are being created correctly
  useEffect(() => {
    console.log("Video refs:", videoRefs.current);
  }, [videoRefs.current]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {/* Enhanced Header with 3D Effect */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={styles.header}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/" className="text-4xl font-bold">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex">
                  {['N', 'e', 'o', 'n', 'N', 'e', 'x', 'u', 's'].map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      animate={{
                        color: [
                          '#3b82f6', // blue
                          '#8b5cf6', // purple
                          '#ec4899', // pink
                          '#f59e0b', // yellow
                          '#10b981', // green
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.1,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </span>
            </Link>
          </motion.div>
          <nav>
            <ul className="flex gap-6">
              {[
                { href: "#features", label: "Features" },
                { href: "./ui/main", label: "Products" },
                { href: "./Uploader", label: "Uploader" },
                { href: "/ecomm", label: "Dashboard" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-gray-300 group transition-all duration-300"
                    onClick={() => handleNavClick(item.href === "#features" ? "features" : null)}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(234, 179, 8, 0.5)",
                          "0 0 20px rgba(234, 179, 8, 0.8)",
                          "0 0 10px rgba(234, 179, 8, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section with Mirror-like Color and Multi-layered Coloring */}
      <motion.section
        className={`${styles.hero} relative overflow-hidden min-h-[50vh]`}
      >
        <div className={`${styles.gridBackground} absolute inset-0`}></div>
        <motion.div
          className={`${styles.gradientBackground} ${styles.animatedGradient} absolute inset-0`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className={`${styles.gradientBackground} ${styles.animatedGradient} absolute inset-0`}
          animate={{
            backgroundPosition: ["100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="container mx-auto px-4 flex flex-col items-center gap-12 relative z-10">
          {/* Content on Right - Permanent Hero Text */}
          <motion.div
            className="w-full text-center"
            initial="visible"
            animate="visible"
            variants={{
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              },
              hidden: {
                opacity: 0,
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
          >
            <motion.h1
              variants={heroTextVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            >
              <div className="flex flex-wrap justify-center">
                {['E', 'l', 'e', 'v', 'a', 't', 'e', ' ', 'Y', 'o', 'u', 'r', ' ', 'S', 'h', 'o', 'p', 'p', 'i', 'n', 'g'].map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={heroTextVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              variants={heroTextVariants}
              className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto"
            >
              Discover premium products with unmatched quality and service.
            </motion.p>

            <motion.div
              variants={heroTextVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105">
                Explore Collection
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold rounded-full border-white/30 hover:bg-white/10 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/70">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 inline-block"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-6 relative z-10">
                  <motion.div
                    className="w-full h-48 relative overflow-hidden rounded-lg mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-semibold mb-2 text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.name}
                  </motion.h3>
                  <motion.p
                    className="text-lg font-medium text-blue-400 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    ${product.price}
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-500 rounded-full shadow-md group-hover:shadow-lg">
                      Add to Cart
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Enhanced Slider */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900/80 to-gray-800/90 relative overflow-hidden">
        <div className={`${styles.gridBackground} absolute inset-0`}></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500 inline-block"
          >
            What Our Customers Say
          </motion.h2>

          <div className="relative max-w-4xl mx-auto h-96">
            <AnimatePresence initial={false} custom={currentSlide}>
              {testimonials.map((testimonial, index) => (
                currentSlide === index && (
                  <motion.div
                    key={testimonial.id}
                    custom={currentSlide}
                    initial={{ opacity: 0, x: index > currentSlide ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: index < currentSlide ? 100 : -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8"
                  >
                    <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-red-600/30"></div>
                    </div>
                    <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-lg max-w-2xl">
                      <p className="text-xl italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-700/90 transition-all duration-300 shadow-lg hover:scale-110 border border-gray-700/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-700/90 transition-all duration-300 shadow-lg hover:scale-110 border border-gray-700/50"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-gray-500/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative" ref={featuresSectionRef}>
        <div className={`${styles.gridBackground} absolute inset-0`}></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 inline-block"
          >
            Features of Neon-Nexus
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-gray-700/50 transition-all duration-300 shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 relative" ref={videosSectionRef}>
        <div className={`${styles.gridBackground} absolute inset-0`}></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 inline-block"
          >
            Our Videos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {videoSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-video"
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[300px] object-contain rounded-lg"
                >
                  <source src={source} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/30"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Gradient Border */}
      <footer className={`${styles.footer} relative overflow-hidden`}>
        <div className={`${styles.footerGridBackground} absolute inset-0`}></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 hover:from-purple-600 hover:to-blue-400 transition-all duration-500 inline-block">
              NeonNexus
            </Link>
          </div>
          <div className="flex justify-center gap-8 mb-8">
            {['Features', 'Products', 'Uploader', 'Testimonials'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                onClick={() => handleNavClick(item === "Features" ? "features" : null)}
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NeonNexus. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
