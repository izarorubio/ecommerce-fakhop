'use client';

import { useRouter } from "next/navigation";
import ProductInfo from "@/app/components/productInfo/productInfo";
import RelatedProductList from "@/app/components/relatedProductList/relatedProductList";
import useFetch from "@/app/hooks/useFetch";
import LoadingView from "@/app/utils/LoadingView";
import ErrorView from "@/app/utils/ErrorView";
import { Product } from "@/app/interfaces/product.interface";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const productId = usePathname().split('/').at(-1);
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${productId}`);
    const product: Product = data as any;
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const router = useRouter(); // Para volver a la página anterior

    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde." />;

    const addComment = () => {
        setIsCommenting(true);
        setComments([...comments, newComment]);
        setNewComment('');
        setTimeout(() => setIsCommenting(false), 1000); // Simular la carga de un comentario
    };

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

            <div className="mb-8 p-4 max-w-4xl mx-auto">

                <h2 className="text-xl font-semibold mb-4 text-[#772E3F] dark:text-[#FA8B5F]">COMENTS</h2>

                {/* Línea horizontal */}
                <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] mb-6 max-w-5xl mx-auto" />
                
                {/* Mostrar comentarios */}
                <ul className="mb-4 space-y-2">
                    {comments.length > 0 ? 
                        comments.map((comment, index) => (
                            <li key={index} className="p-3 border-b border-gray-300 rounded-lg">{comment}</li>
                        )) : 
                        <p className="text-gray-500">There are no coments yet</p>
                    }
                </ul>

                {/* Campo para añadir nuevo comentario */}
                <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full mb-2"
                />
                
                {/* Botón de añadir comentario */}
                <button
                    onClick={addComment}
                    className={`px-4 py-2 bg-[#FA705F] text-white rounded ${isCommenting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FA8B5F]'}`}
                    disabled={isCommenting}
                >
                    {isCommenting ? "Writing..." : "Add coment"}
                </button>

                {/* Línea horizontal */}
                <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] my-6 max-w-5xl mx-auto" />
            </div>
            <div className="mx-[180px]">
            {/* Productos relacionados */}
            <RelatedProductList category={product.category} />
            </div>
        </>
    );
}
