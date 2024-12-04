'use client'

import { useState } from "react";
import Link from 'next/link';
import CategoryFilter from '../categoryFilter/CategoryFilter';
import styles from './header.module.css';
import { getCart } from "@/app/utils/cartUtils";
import { Product } from "@/app/interfaces/product.interface";
import CartModal from "../cartModal/CartModal";

export default function Header() {
    const [filterCategory, setFilterCategory] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState<Product[]>(getCart());


    // Seleccionar y actualizar categoría
    const handleCategorySelect = (category: string) => {
        setFilterCategory(category);
    };

    // Abrir el modal del carrito
    const handleCartClick = () => {
        setCartProducts(getCart());
        setCartOpen(!cartOpen);
    };

     // Actualizar el estado del carrito después de eliminar un producto
    const handleCartUpdate = (updatedCart: Product[]) => {
        setCartProducts(updatedCart);
    };

    return (
        <header className={styles.header}>
            <div className="bg-opacity-30 bg-white dark:bg-opacity-30 dark:bg-black">
                <div className={styles.infoContainer}>
                    {/* Categorías*/}
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
                            <button 
                                className="flex items-center gap-1 bg-opacity-80 bg-[#FA8B5F] text-white px-4 py-1 rounded-lg hover:bg-[#FA705F] transition duration-200"
                                onClick={handleCartClick}
                            >
                                <span>Shop</span>
                                <img src="/ic_cart.png" alt="Cart Icon" className="w-6 h-6" />
                            </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* Modal del carrito */}
            <CartModal
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                products={cartProducts}
                onCartUpdate={handleCartUpdate}
            />
        </header>
    );
}
