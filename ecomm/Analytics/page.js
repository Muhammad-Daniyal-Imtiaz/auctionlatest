'use client';

import { useState, useEffect, useRef } from 'react';
import supabase from '@/app/Supabase/config';
import { BarChart, DonutChart } from '@tremor/react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    totalProducts: 0,
    auctionProducts: 0,
    fixedProducts: 0,
    loading: true,
    error: null,
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        const [
          { count: userCount },
          { count: totalProducts },
          { count: auctionProducts },
          { count: fixedProducts }
        ] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true }).eq('sale_type', 'auction'),
          supabase.from('products').select('*', { count: 'exact', head: true }).eq('sale_type', 'fixed')
        ]);

        setStats({
          userCount: userCount || 0,
          totalProducts: totalProducts || 0,
          auctionProducts: auctionProducts || 0,
          fixedProducts: fixedProducts || 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch data. Please try again later.',
        }));
      }
    };

    fetchStats();
  }, []);

  // Data for charts
  const productDistribution = [
    {
      name: 'Auction',
      value: stats.auctionProducts,
      color: 'emerald',
    },
    {
      name: 'Fixed Price',
      value: stats.fixedProducts,
      color: 'amber',
    },
  ];

  const usersVsProductsData = [
    {
      name: 'Platform Stats',
      Users: stats.userCount,
      Products: stats.totalProducts,
    },
  ];

  if (stats.loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  if (stats.error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-red-50 border border-red-200 text-red-600 rounded-xl max-w-md mx-auto text-center"
      >
        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium">{stats.error}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Platform Analytics
      </motion.h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users"
          value={stats.userCount}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          description="Registered accounts"
        />

        <StatCard 
          title="Total Products"
          value={stats.totalProducts}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          description="Listed items"
        />

        <StatCard 
          title="Auctions"
          value={stats.auctionProducts}
          color="green"
          percentage={(stats.auctionProducts / stats.totalProducts) * 100}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          description="of products"
        />

        <StatCard 
          title="Fixed Price"
          value={stats.fixedProducts}
          color="orange"
          percentage={(stats.fixedProducts / stats.totalProducts) * 100}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          description="of products"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Distribution Donut Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Type Distribution</h3>
          <div className="h-72">
            <DonutChart
              data={productDistribution}
              category="value"
              index="name"
              colors={['emerald', 'amber']}
              valueFormatter={(value) => `${value} items`}
              showAnimation={true}
              animationDuration={2000}
            />
          </div>
        </motion.div>

        {/* Users vs Products Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Users vs Products</h3>
          <div className="h-72">
            <BarChart
              data={usersVsProductsData}
              index="name"
              categories={['Users', 'Products']}
              colors={['blue', 'purple']}
              valueFormatter={(value) => value.toLocaleString()}
              yAxisWidth={60}
              showAnimation={true}
              animationDuration={2000}
              layout="vertical"
              showLegend={true}
            />
          </div>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Ratios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatioCard 
            title="Users per Product"
            value={stats.totalProducts > 0 ? stats.userCount / stats.totalProducts : 0}
            color="blue"
            format="0.00"
          />
          <RatioCard 
            title="Auction Dominance"
            value={stats.totalProducts > 0 ? (stats.auctionProducts / stats.totalProducts) * 100 : 0}
            color="green"
            format="0.0%"
            isPercentage
          />
          <RatioCard 
            title="Listings per User"
            value={stats.userCount > 0 ? stats.totalProducts / stats.userCount : 0}
            color="purple"
            format="0.0"
          />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, color, percentage, icon, description }) {
  const colorClasses = {
    blue: 'border-blue-500 text-blue-600 bg-blue-50',
    purple: 'border-purple-500 text-purple-600 bg-purple-50',
    green: 'border-green-500 text-green-600 bg-green-50',
    orange: 'border-orange-500 text-orange-600 bg-orange-50',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-4xl font-bold mt-2">
            <CountUp 
              end={value} 
              duration={2.5}
              separator=","
            />
          </p>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color]} bg-opacity-30`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {percentage ? (
          <span className="font-medium">
            <CountUp 
              end={percentage} 
              duration={2.5}
              decimals={1}
              suffix="% "
            />
            {description}
          </span>
        ) : description}
      </p>
    </motion.div>
  );
}

function RatioCard({ title, value, color, format, isPercentage = false }) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    green: 'text-green-600 bg-green-50',
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`p-4 rounded-lg ${colorClasses[color]}`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">
        <CountUp 
          end={value} 
          duration={2}
          decimals={isPercentage ? 1 : 2}
          suffix={isPercentage ? '%' : ''}
        />
      </p>
    </motion.div>
  );
}