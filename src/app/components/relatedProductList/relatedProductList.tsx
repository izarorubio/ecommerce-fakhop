'use client';

import useFetch from "@/app/hooks/useFetch";
import ProductCard from "../productCard/ProductCard";
import { Product } from "@/app/interfaces/product.interface";

export default function RelatedProductList({ category }: { category: string }) {
    const { data, loading, error } = useFetch(`https://api-backend-vgwb.onrender.com/products?category=${category}&limit=3`);
    const products: Product[] = data as any;

    if (loading) return <p className="text-center mt-10">Loading related product...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

    return (
        <div className="mt-6 mb-16 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#772E3F] dark:text-[#FA8B5F] mb-6">YOU WILL ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
