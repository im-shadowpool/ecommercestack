// app/create-product/edit-sizes/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditSizesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?search=${searchQuery}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product Sizes</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <div>
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/create-product/${product.slug}/edit`)}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            >
              {product.productTitle}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}