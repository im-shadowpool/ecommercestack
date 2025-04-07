// app/create-product/[slug]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddSize from "@/components/admin-components/AddSize";

export default function EditProductSizesPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/slug/${params.slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleAddOrUpdateSize = async (sizeData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}/sizes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sizeData),
        }
      );

      if (response.ok) {
        alert("Size saved successfully!");
        router.refresh(); // Refresh the page to show the updated sizes
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert("Failed to save size");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Sizes for {product.productTitle}</h1>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Existing Sizes</h2>
        {product.sizes.map((size, index) => (
          <div key={index} className="p-2 border rounded">
            <p>Size: {size.size}</p>
            <p>Price: ${size.price}</p>
            <p>SKU Code: {size.skuCode}</p>
            <button
              onClick={() => {
                setEditingSize(size);
                setIsAddSizeModalOpen(true);
              }}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setEditingSize(null);
            setIsAddSizeModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Size
        </button>
      </div>

      <AddSize
        isOpen={isAddSizeModalOpen}
        onClose={() => setIsAddSizeModalOpen(false)}
        onSubmit={handleAddOrUpdateSize}
        initialData={editingSize}
      />
    </div>
  );
}