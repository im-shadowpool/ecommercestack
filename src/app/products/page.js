import ProductListing from "@/app/components/my-components/product-listing/ProductListing";
import products from "@/product-data/products.json";


export async function getProducts() {
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
        <div className="container px-12">
             <ProductListing products={productsAPI}  />
        </div>
    ) 
}