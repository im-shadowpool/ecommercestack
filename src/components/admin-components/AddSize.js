// components/AddSize.js
"use client";

import { useState } from "react";

export default function AddSize({ isOpen, onClose, onSubmit, initialData }) {
  const [sizeData, setSizeData] = useState(
    initialData || {
      size: "",
      price: 0,
      skuCode: "",
      productTitle: "",
      shortDesc: "",
      images: [],
      single_item_badges: {
        is_new: false,
        is_popular: false,
        is_best_seller: false,
        is_top_rated: false,
        is_recommended: false,
      },
      variants: {
        is_in_stock: true,
        discount_percentage: 0,
        is_sale: false,
      },
      stock_item: {
        min_qty: 1,
        max_qty: 100,
      },
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("single_item_badges.")) {
      const badgeKey = name.split(".")[1];
      setSizeData((prev) => ({
        ...prev,
        single_item_badges: { ...prev.single_item_badges, [badgeKey]: checked },
      }));
    } else if (name.startsWith("variants.")) {
      const variantKey = name.split(".")[1];
      setSizeData((prev) => ({
        ...prev,
        variants: { ...prev.variants, [variantKey]: value },
      }));
    } else if (name.startsWith("stock_item.")) {
      const stockKey = name.split(".")[1];
      setSizeData((prev) => ({
        ...prev,
        stock_item: { ...prev.stock_item, [stockKey]: value },
      }));
    } else {
      setSizeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sizeData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-[80%] overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Size" : "Add New Size"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={sizeData.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={sizeData.price}
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
              value={sizeData.skuCode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Title</label>
            <input
              type="text"
              name="productTitle"
              value={sizeData.productTitle}
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
              value={sizeData.shortDesc}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Images (Comma Separated URLs)</label>
            <input
              type="text"
              name="images"
              value={sizeData.images.join(",")}
              onChange={(e) =>
                setSizeData((prev) => ({ ...prev, images: e.target.value.split(",") }))
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Single Item Badges</label>
            {Object.keys(sizeData.single_item_badges).map((badge) => (
              <div key={badge} className="flex items-center">
                <input
                  type="checkbox"
                  name={`single_item_badges.${badge}`}
                  checked={sizeData.single_item_badges[badge]}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{badge}</span>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium">Variants</label>
            <div>
              <label className="block text-sm font-medium">Is In Stock</label>
              <input
                type="checkbox"
                name="variants.is_in_stock"
                checked={sizeData.variants.is_in_stock}
                onChange={handleChange}
                className="mr-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Discount Percentage</label>
              <input
                type="number"
                name="variants.discount_percentage"
                value={sizeData.variants.discount_percentage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Is Sale</label>
              <input
                type="checkbox"
                name="variants.is_sale"
                checked={sizeData.variants.is_sale}
                onChange={handleChange}
                className="mr-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Stock Item</label>
            <div>
              <label className="block text-sm font-medium">Min Quantity</label>
              <input
                type="number"
                name="stock_item.min_qty"
                value={sizeData.stock_item.min_qty}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Quantity</label>
              <input
                type="number"
                name="stock_item.max_qty"
                value={sizeData.stock_item.max_qty}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {initialData ? "Update Size" : "Add Size"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}