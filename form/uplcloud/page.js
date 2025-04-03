'use client';
import { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

export default function BgRemovalTool() {
  const [publicId, setPublicId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="container">
      <h1>One-Click Background Remover</h1>
      
      {!publicId ? (
        <CldUploadWidget
          uploadPreset="swhoxjky"
          options={{
            sources: ['local'],
            multiple: false,
            maxFiles: 1,
            cropping: false,
            resourceType: 'image'
          }}
          onUploadAdded={() => {
            setIsProcessing(true);
          }}
          onSuccess={(result) => {
            setPublicId(result.info.public_id);
          }}
        >
          {({ open }) => (
            <button 
              className="process-btn"
              onClick={() => open()}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Remove Background from Image'}
            </button>
          )}
        </CldUploadWidget>
      ) : (
        <div className="result-container">
          <div className="image-comparison">
            <div className="image-wrapper">
              <h3>Original</h3>
              <CldImage
                width="500"
                height="350"
                src={publicId}
                alt="Original image"
              />
            </div>
            
            <div className="image-wrapper">
              <h3>Background Removed</h3>
              <CldImage
                width="500"
                height="350"
                src={publicId}
                alt="Background removed"
                removeBackground
                onLoad={() => setIsProcessing(false)}
              />
            </div>
          </div>

          <button 
            className="reset-btn"
            onClick={() => {
              setPublicId('');
              setIsProcessing(false);
            }}
          >
            Process Another Image
          </button>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
        }
        .process-btn, .reset-btn {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 1rem 2rem;
          margin: 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        .process-btn:hover, .reset-btn:hover {
          background: #c53030;
          transform: translateY(-2px);
        }
        .process-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
          transform: none;
        }
        .result-container {
          margin-top: 2rem;
        }
        .image-comparison {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .image-wrapper {
          margin: 1rem 0;
          padding: 1rem;
          background: 
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%, 
              transparent 50%, #f0f0f0 50%, #f0f0f0 75%, 
              transparent 75%, transparent);
          background-size: 20px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .image-wrapper h3 {
          margin-bottom: 1rem;
          color: #2d3748;
        }
      `}</style>
    </div>
  );
}