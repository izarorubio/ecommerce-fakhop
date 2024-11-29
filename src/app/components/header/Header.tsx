'use client'

import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CategoryFilter from '../categoryFilter/CategoryFilter';
import styles from './header.module.css';
import useSearchParamsList from "@/app/hooks/useSearchParamsList";

export default function Header() {
    const [filterCategory, setFilterCategory] = useState('');
    const searchParams = useSearchParams();

    // Actualizar la categoría seleccionada desde el Header
    const handleCategorySelect = (category: string) => {
        setFilterCategory(category);
    };

    // Pasar el estado del filtro a ProductList.tsx para filtrar los productos
    const queryPage = searchParams.get('page') || '1';

    return (
        <header className={styles.header}>
            <div className="bg-opacity-30 bg-white dark:bg-opacity-30 dark:bg-black">
                <div className={styles.infoContainer}>
                    {/* Categorías */}
                    <CategoryFilter onCategorySelect={handleCategorySelect} />

                    {/* Logo */}
                    <Link href="/">
                        <h1 className="font-[Lovan] font-bold text-[36px] text-center text-white  hover:text-[#FA8B5F] transition-all duration-100">FAKHOP</h1>
                    </Link>

                    {/* Botones */}
                    <nav>
                        <ul className="flex">
                            <li>
                            <button className="pt-1 pr-4 transition-all hover:border-b-2 border-[#FA8B5F] pb-1">
                                <img src="/ic_account.png" alt="Cart Icon" className="w-6 h-6" />
                            </button>
                            </li>
                            <li>
                                <button className="mr-10 py-1 pl-4 text-white border-l-2 border-l-white hover: transition-all hover:border-b-2 border-[#FA8B5F]">
                                    EN
                                </button>
                            </li>
                            <li>
                            <button className="flex items-center gap-1 bg-opacity-80 bg-[#FA8B5F] text-white px-4 py-1 rounded-lg hover:bg-[#FA705F] transition duration-200">
                                <span>Shop</span>
                                <img src="/ic_cart.png" alt="Cart Icon" className="w-6 h-6" />
                            </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
