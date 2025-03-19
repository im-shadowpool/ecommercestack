import ProductDetails from "@/app/components/my-components/product-single-page/ProductDetails";
import { notFound } from "next/navigation";

// Function to fetch all products (for generating static paths)
async function getAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to fetch a single product by slug
async function getSingleProduct(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/slug/${slug}`, {
      next: { revalidate: 3000 }, // Revalidate every 3000 seconds (ISR)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate static paths at build time
export async function generateStaticParams() {
  const products = await getAllProducts();


  if (!products || products.length === 0) {
    return []; // Return empty array if no products exist
  }

  // Return an array of objects with the dynamic parameter (productName)
  return products.map((product) => ({
    productName: product.slug, // Assuming `slug` is the unique identifier for the product
  }));
}

// ProductPage component
export default async function ProductPage({ params }) {
  // Validate params
  if (!params?.productName) {
    return notFound();
  }

  // Fetch the product data
  const productAPI = await getSingleProduct(params.productName);

  // Handle case where product is not found or an error occurred
  if (!productAPI) {
    return notFound();;
  }

  return (
    <div>
      <ProductDetails productAPI={productAPI} />
    </div>
  );
}