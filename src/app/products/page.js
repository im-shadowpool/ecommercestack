import ProductListing from "@/components/my-components/product-listing/ProductListing";


export async function getProducts() {
    console.log("Fetching products from API...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
        method: "GET",
        next: {revalidate: 3000},
    });
    return res.json();
}

export default async function ProudctPage() {

    const productsAPI = await getProducts();
    // console.log(productsAPI);

    return(
        <div className="padding-container">
             <ProductListing products={productsAPI}  />
        </div>
    ) 
}