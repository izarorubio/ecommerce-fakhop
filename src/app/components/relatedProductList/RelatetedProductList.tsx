'use client';

import useFetch from "@/app/hooks/useFetch";
import ProductCard from "../productCard/ProductCard";
import { Product } from "@/app/interfaces/product.interface";

interface RelatedProductListProps {
    category: string;
    currentProductId: number;
}

export default function RelatedProductList({ category, currentProductId }: RelatedProductListProps) {
    const { data, loading, error } = useFetch(`https://api-backend-vgwb.onrender.com/products?category=${category}&limit=4`);
    const products: Product[] = Array.isArray(data) ? data : [];

    // Filtrar el producto seleccionado para que no aparezca en los productos relacionados
    const relatedProducts = products.filter(product => product.id !== currentProductId).slice(0, 3);

    if (loading) return <p className="text-center mt-10">Loading related product...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

    return (
        <div className="mt-6 mb-16 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#772E3F] dark:text-[#FA8B5F] mb-6">YOU WILL ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProducts.length > 0 ? (
                        relatedProducts.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No related products available.</p>
                    )}
            </div>
        </div>
    );
}
