'use client';
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useCallback, useEffect } from "react";

const UploadStep = ({
  files,
  setFiles,
  uploadProgress,
  isUploading,
  setUploadProgress,
  setIsUploading,
  setPredictions
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const onDrop = useCallback((acceptedFiles) => {
    try {
      setError(null);

      const validFiles = acceptedFiles.filter(file => {
        if (!file) {
          setError("Invalid file received");
          return false;
        }
        if (!file.type || !file.type.startsWith("image/")) {
          setError(`File ${file.name} is not an image`);
          return false;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError(`File ${file.name} is too large (max ${MAX_FILE_SIZE/1024/1024}MB)`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const newFiles = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        cloudinaryUrl: null,
        isUploading: true
      }));

      setFiles(prev => [...prev, ...newFiles]);
      simulateUpload();
      uploadFilesToCloudinary(newFiles);
    } catch (err) {
      console.error("Error processing files:", err);
      setError("Failed to process uploaded files. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop,
    maxFiles: 10,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (rejectedFiles) => {
      const firstError = rejectedFiles[0]?.errors[0];
      setError(firstError?.message || "Some files were rejected");
    }
  });

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const uploadFilesToCloudinary = async (newFiles) => {
    try {
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i].file;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'swhoxjky');

        const response = await fetch('https://api.cloudinary.com/v1_1/diqlb6j9i/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload to Cloudinary');
        }

        const data = await response.json();

        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const fileIndex = updatedFiles.findIndex(f => f.file === file);
          if (fileIndex !== -1) {
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              cloudinaryUrl: data.secure_url,
              isUploading: false,
            };
          }
          return updatedFiles;
        });
      }
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      setError("Failed to upload images. Please try again.");
      setFiles(prevFiles =>
        prevFiles.map(f =>
          newFiles.some(nf => nf.file === f.file) ? { ...f, isUploading: false } : f
        )
      );
    }
  };

  const removeImage = (index) => {
    if (index < 0 || index >= files.length) return;
    const updatedFiles = [...files];
    if (updatedFiles[index]?.preview) {
      URL.revokeObjectURL(updatedFiles[index].preview);
    }
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3">
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-gray-400" />
          )}
          <div className="space-y-1">
            <h3 className="font-medium text-lg">
              {isDragActive ? 'Drop your files here' : 'Drag and drop files here'}
            </h3>
            <p className="text-sm text-gray-500">
              or <span className="text-primary font-medium">click to browse</span>
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Supported formats: JPEG, PNG, GIF, WEBP (Max {MAX_FILE_SIZE/1024/1024}MB each)
          </p>
        </div>
      </div>

      {/* Upload progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {files.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Uploaded Files ({files.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                files.forEach(file => {
                  if (file?.preview) URL.revokeObjectURL(file.preview);
                });
                setFiles([]);
              }}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {files.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={item.preview}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    {item.isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    )}
                    {item.cloudinaryUrl && !item.isUploading && (
                      <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium truncate">{item.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.isUploading ? "Uploading..." :
                       item.cloudinaryUrl ? "Uploaded to Cloudinary" : "Processing..."}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={item.isUploading}
                  >
                    <X className="h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>No files uploaded yet</p>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadStep;
