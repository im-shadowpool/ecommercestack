// app/create-product/new-product/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productTitle: "",
    shortDesc: "",
    longDesc: "",
    skuCode: "",
    category: [],
    slug: "",
    product_badges: {
      is_sale: false,
      is_new: false,
      is_popular: false,
      is_best_seller: false,
      is_top_rated: false,
      is_recommended: false,
    },
    available: true,
    sizes: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("product_badges.")) {
      const badgeKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        product_badges: { ...prev.product_badges, [badgeKey]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product created successfully!");
        router.push(`/create-product/${data.product.slug}/edit`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert("Failed to create product");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Creator Form Fields */}
        <div>
          <label className="block text-sm font-medium">Product Title</label>
          <input
            type="text"
            name="productTitle"
            value={formData.productTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">SKU Code</label>
          <input
            type="text"
            name="skuCode"
            value={formData.skuCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category.join(",")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value.split(","),
              }))
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Badges</label>
          {Object.keys(formData.product_badges).map((badge) => (
            <div key={badge} className="flex items-center">
              <input
                type="checkbox"
                name={`product_badges.${badge}`}
                checked={formData.product_badges[badge]}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{badge}</span>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}