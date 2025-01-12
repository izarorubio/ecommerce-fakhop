'use client';

import { useRouter } from "next/navigation";
import ProductInfo from "@/app/components/productInfo/ProductInfo";
import RelatedProductList from "@/app/components/relatedProductList/RelatetedProductList";
import useFetch from "@/app/hooks/useFetch";
import LoadingView from "@/app/utils/LoadingView";
import ErrorView from "@/app/utils/ErrorView";
import { Product } from "@/app/interfaces/product.interface";
import { usePathname } from "next/navigation";
import CommentSection from "@/app/components/comments/CommentsSection"
import RatingBig from "@/app/components/rating/RatingBig";


export default function Home() {
    const productId = usePathname().split('/').at(-1);
    const { data, loading, error } = useFetch(`https://api-backend-vgwb.onrender.com/products/${productId}`);
    const product: Product | null = data ? (data as unknown as Product) : null;
    const router = useRouter(); // Para volver a la página anterior

    //Estados de Cargando y Error
    if (loading) return <LoadingView />;
    if (error || !product) return <ErrorView message="The products could not be loaded. Please try again later." />;

    return (
        <>
            {/* Botón para volver atrás */}
            <button 
                onClick={() => router.back()} 
                className="mt-[100px] ml-6 absolute top-4 left-4 text-black dark:text-white hover:text-gray-600 transition-all">
                ← Back
            </button>

            <ProductInfo 
                image={product.image} 
                title={product.title} 
                description={product.description} 
                category={product.category}
                price={product.price} 
                rating={product.rating}
            />

            {/* Línea horizontal */}
            <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] my-6 max-w-5xl mx-auto" />

            {/* Sección de Comentarios y Rating */}
            <div className="grid grid-cols-3 gap-10 max-w-5xl mx-auto">
                {/* Sección de Comentarios (2/3 del espacio) */}
                <div className="col-span-2">
                    <CommentSection initialComments={[]} /> {/* Se pasan los comentarios iniciales como un array vacío */}
                </div>

                {/* Rating (1/3 del espacio) */}
                <div className="mt-10 col-span-1">
                    <RatingBig rating={product.rating} />
                </div>
            </div>

            {/* Línea horizontal */}
            <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] my-6 max-w-5xl mx-auto" />

            <div className="pt-4 mx-[180px]">
            {/* Productos relacionados */}
            <RelatedProductList category={product.category} currentProductId={product.id} />
            </div>
        </>
    );
}
