'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import CategoryFilter from '../categoryFilter/CategoryFilter';
import AccountMenu from '../accountMenu/AccountMenu';
import styles from './header.module.css';
import { getCart } from "@/app/utils/cartUtils";
import { Product } from "@/app/interfaces/product.interface";
import CartModal from "../cartModal/CartModal";

export default function Header() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterCategory, setFilterCategory] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState<Product[]>(getCart());
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si el token está presente en localStorage al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Si el token existe, el usuario está autenticado
    }, []);

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

    // Función para manejar el logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        setIsAuthenticated(false); // Actualizar el estado de autenticación
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
                            {/* Si el usuario está autenticado, mostramos el menú de cuenta con "Logout" */}
                            {isAuthenticated ? (
                                <li>
                                    <button 
                                        onClick={handleLogout} 
                                        className="pt-1 pr-4 text-white transition-all hover:border-b-2 border-[#FA8B5F] pb-1"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <AccountMenu />
                                </li>
                            )}

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
