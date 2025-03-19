// app/create-product/page.js
"use client";

import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create or Edit Product</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push("/create-product/new-product")}
          className="bg-blue-500 text-white px-4 py-2 rounded block w-full text-center"
        >
          Create New Product
        </button>
        <button
          onClick={() => router.push("/create-product/edit-sizes")}
          className="bg-green-500 text-white px-4 py-2 rounded block w-full text-center"
        >
          Edit Product Sizes
        </button>
      </div>
    </div>
  );
}