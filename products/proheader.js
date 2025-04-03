'use client'
import { useState } from 'react';

export default function ProductHeader({ productData, isFavorite, setIsFavorite, selectedShipping }) {
  const BadgePercent = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 13a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
    </svg>
  );

  const Heart = ({ className, filled }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const Star = ({ className, filled }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const TrendingUp = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  const Progress = ({ value, className }) => (
    <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-blue-500 h-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  const shippingPrice = productData.shipping?.options?.[selectedShipping]?.price || 0;
  const originalPrice = productData.original_price || productData.price * 1.2;
  const discount = productData.discount || Math.round(((originalPrice - productData.price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" /> Trending
            </span>
            {discount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <BadgePercent className="h-3 w-3 mr-1" /> {discount}% OFF
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{productData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Product ID: {productData.id} | {productData.condition || 'New'}</p>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(productData.rating || 0) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">{productData.rating?.toFixed(1) || '0.0'}</span>
        <span className="text-sm text-gray-500">({productData.reviews || 0} reviews)</span>
      </div>

      <div className="mt-6 space-y-1">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-gray-900">${productData.price.toFixed(2)}</span>
          {originalPrice > productData.price && (
            <>
              <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="text-lg font-semibold text-green-600">{discount}% off</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {shippingPrice > 0 ? (
            `+ $${shippingPrice.toFixed(2)} shipping`
          ) : (
            'FREE shipping'
          )}
        </p>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 flex items-center gap-3">
        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17-7.17a2 2 0 0 0-2.83 0L2 16V20h4l10.59-10.59a2 2 0 0 0 0-2.82z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">Special Offer</p>
          <p className="text-xs text-blue-600">
            Save ${(originalPrice - productData.price).toFixed(2)} when you buy now!
          </p>
        </div>
      </div>

      {productData.stock !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-700">Available stock: {productData.stock} units</p>
            <p className="text-xs text-gray-500">12 sold in last 24 hours</p>
          </div>
          <Progress value={(productData.stock / 20) * 100} className="h-2" />
        </div>
      )}
    </div>
  );
}
