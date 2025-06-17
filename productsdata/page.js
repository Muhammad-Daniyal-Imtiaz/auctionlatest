'use client';
import { useEffect, useState } from 'react';
import { Pencil, Trash, ImagePlus } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const clerkId = userData?.clerk_id;

        if (!clerkId) {
          console.error('Clerk ID not found');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/pdata?clerk_id=${encodeURIComponent(clerkId)}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          throw new Error(errorData.error || 'Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products || []);

      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedProduct({ ...product });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const clerkId = userData?.clerk_id;
      const userEmail = userData?.email;

      if (!clerkId || !userEmail) {
        console.error('Clerk ID or User Email not found');
        return;
      }

      const response = await fetch('/api/pdata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedProduct,
          clerk_id: clerkId,
          category: editedProduct.category,
          sale_type: editedProduct.sale_type,
          user_email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.product.id ? updatedProduct.product : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/pdata?id=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleImageUpload = async (productId) => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      const response = await fetch(`/api/pdata/image?id=${productId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const { imageUrl } = await response.json();

      const updatedProducts = products.map((product) =>
        product.id === productId
          ? { ...product, images: [...product.images, imageUrl] }
          : product
      );
      setProducts(updatedProducts);
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, imageUrl],
      }));
      setNewImage(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">My Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div className="border rounded-lg overflow-hidden shadow-lg" key={product.id}>
              {editingProduct === product.id ? (
                <div className="p-4">
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <select
                    name="sale_type"
                    value={editedProduct.sale_type}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="auction">Auction</option>
                  </select>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Save
                  </button>
                  <button onClick={() => handleImageUpload(product.id)} className="bg-green-500 text-white px-4 py-2 rounded">
                    <ImagePlus className="mr-2" size={16} /> Upload Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={`Product ${product.name}`}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-gray-900 font-bold mb-4">Price: ${product.price}</p>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(product)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center">
                        <Pencil className="mr-2" size={16} /> Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                        <Trash className="mr-2" size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
