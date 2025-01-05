'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Usamos el hook useRouter para redirigir
import styles from './accountMenu.module.css';

export default function AccountMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter(); // hook para redirigir

    // Verificar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Si el token existe, el usuario está autenticado
    }, []);

    // Cerrar el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Manejadores de los clics en los botones de "Sign Up", "Login" y "Log Out"
    const handleSignUpClick = () => {
        router.push('/signup');
        setIsOpen(false);
    };

    const handleLoginClick = () => {
        router.push('/login');
        setIsOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token'); // Eliminar el token
        setIsAuthenticated(false); // Actualizar el estado de autenticación
        router.push('/'); // Redirigir a la página principal
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            {/* Botón para abrir/cerrar el menú */}
            <button
                onClick={toggleDropdown}
                className="pt-1 pr-4 transition-all hover:border-b-2 border-[#FA8B5F] pb-1"
            >
                <img src="/ic_account.png" alt="Account Icon" className="w-6 h-6" />
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className={styles.menu}>
                    <ul className={styles.menuList}>
                        {isAuthenticated ? (
                            <li className={styles.menuItem} onClick={handleLogoutClick}>
                                Log Out
                            </li>
                        ) : (
                            <>
                                <li className={styles.menuItem} onClick={handleSignUpClick}>
                                    Sign Up
                                </li>
                                <li className={styles.menuItem} onClick={handleLoginClick}>
                                    Login
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

