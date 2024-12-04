'use client';

import useFetch from "@/app/hooks/useFetch";
import ProductCard from "../productCard/ProductCard";
import LoadingView from "@/app/utils/LoadingView";
import ErrorView from "@/app/utils/ErrorView";
import { Product } from "@/app/interfaces/product.interface";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
    const { data, loading, error } = useFetch("https://fakestoreapi.com/products");
    const products = data as Product[] || [];
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('');
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || ''; 

    const pageSize = 9; 

    //Poner el título de la categoría seleccionada
    useEffect(() => {
        if (category === '') {
            setCategoryTitle('Todas las categorías');
        } else {
            setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
        }

        setFilterCategory(category);
    }, [category]);

    const filteredProducts = products
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) && 
                     (!filterCategory || p.category === filterCategory))
        .slice((page - 1) * pageSize, page * pageSize);

    //Estados de Cargando y Error
    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="The products could not be loaded. Please try again later." />;

    return (
        < div className="m-16">
            {/* Sección con Título de Categoría y Barra de Búsqueda */}
            <div className="flex gap-10 justify-between items-center mx-16 mt-[140px] mb-[100px]">
                <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border-b w-1/2"
                />
                <h2 className="text-right text-black dark:text-white text-6xl font-semibold">{categoryTitle}</h2>
                
            </div>
            
            {/* SECCIÓN 2: */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 my-6 mx-16">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {/* PAGINACIÓN */}
            <div className="flex justify-center mt-10">
                <button
                    disabled={page === 1}
                    onClick={() => window.location.href = `/?page=${page - 1}&category=${category}`}
                    className="px-4 py-2 text-white bg-[#FA8B5F] dark:bg-[#772E3F] rounded disabled:opacity-50"
                >
                    🡠 Previous
                </button>
                <button
                    disabled={filteredProducts.length < pageSize || (page - 1) * pageSize + filteredProducts.length >= products.filter(p => (!filterCategory || p.category === filterCategory)).length}
                    onClick={() => window.location.href = `/?page=${page + 1}&category=${category}`}
                    className="px-8 py-2 text-white bg-[#FA8B5F] dark:bg-[#772E3F] rounded disabled:opacity-50 ml-4"
                >
                    Next 🡢
                </button>
            </div>
        </div>
    );
}

