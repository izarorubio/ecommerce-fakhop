'use client';

import useFetch from "@/app/hooks/useFetch";
import ProductCard from "../productCard/ProductCard";
import LoadingView from "@/app/utils/LoadingView";
import ErrorView from "@/app/utils/ErrorView";
import { Product } from "@/app/interfaces/product.interface";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from './productList.module.css';

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

    if (loading) return <LoadingView />;
    if (error) return <ErrorView message="No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde." />;

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
            <div className="flex justify-center mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => window.location.href = `/?page=${page - 1}&category=${category}`}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <button
                    disabled={page * pageSize >= products.length}
                    onClick={() => window.location.href = `/?page=${page + 1}&category=${category}`}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ml-4"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

