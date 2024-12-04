'use client';

import { useRouter } from "next/navigation";
import ProductInfo from "@/app/components/productInfo/ProductInfo";
import RelatedProductList from "@/app/components/relatedProductList/RelatedProductList";
import useFetch from "@/app/hooks/useFetch";
import LoadingView from "@/app/utils/LoadingView";
import ErrorView from "@/app/utils/ErrorView";
import { Product } from "@/app/interfaces/product.interface";
import { usePathname } from "next/navigation";
import CommentSection from "@/app/components/comments/CommentsSection"

export default function Home() {
    const productId = usePathname().split('/').at(-1);
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${productId}`);
    const product: Product = data as any;
    const router = useRouter(); // Para volver a la página anterior

    //Estados de Cargando y Error
    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="The products could not be loaded. Please try again later." />;

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
                price={product.price} 
                rating={product.rating}
            />

            {/* Sección de Comentarios */}
            <CommentSection initialComments={[]} /> {/* Se pasan los comentarios iniciales como un array vacío */}

            <div className="mx-[180px]">
            {/* Productos relacionados */}
            <RelatedProductList category={product.category} />
            </div>
        </>
    );
}
