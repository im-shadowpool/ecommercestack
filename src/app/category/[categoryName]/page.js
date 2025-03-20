import ProductListing from "@/app/components/my-components/product-listing/ProductListing";
import { toTitleCase } from "@/lib/utils";
import { notFound } from "next/navigation";



export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
    if(!res.ok){
        return [];
    } 
    const {categories} = await res.json();

    return categories.map(category => ({
        slug: category.replace(/\s+/g, "-"),
    }));
}




export default async function CategoryBySlug({params}) {

    const {categoryName} = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/slug/${categoryName}`, {next: {revalidate: 3000}} );

    if(!res.ok){
        return notFound();
    }

    const { products } = await res.json();

    // console.log(categoryName);
    
    const categoryEditedName = toTitleCase(categoryName.replace(/-/g, " "));

    return(
        <>
        
        <div className="bg-white px-8">
            <div className="container mx-auto py-12">
            <div className="mx-auto flex flex-col gap-2">
            <h2 className="text-3xl font-semibold text-egreen-800">
              Category: {categoryEditedName}
            </h2>
            {/* breadcrumbs */}
            <div className="flex gap-2">
              <span className="text-egray-700">Home</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">Category</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">{categoryEditedName}</span>
            </div>
          </div>
            </div>
        </div>
        <div className="container  px-8">
        <ProductListing products={products} />
        </div>
        </>
    );
}

