'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './categoryFilter.module.css';

export default function CategoryFilter({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref para el menú desplegable

     // Efecto para obtener las categorías desde la API
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://api-backend-vgwb.onrender.com/categories');
            const data = await response.json() as { name: string }[]; // Define el tipo de cada elemento
            setCategories(data.map((category) => category.name));
        };
    
        fetchCategories();
    }, []);

    // Cerrar el menú al hacer clic fuera ( cerrar si se clica fuera)
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

    // Selección de categoría
    const handleCategoryChange = (category: string) => {
        onCategorySelect(category); 
        setIsOpen(false); // Cierra el menú después de seleccionar
        window.location.href = `/?page=1&category=${category}`; // Redirige y pasa el filtro a la URL
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            {/* Botón para abrir/cerrar el menú */}
            <button 
                onClick={toggleDropdown} 
                className={`${styles.button} ${isOpen ? styles.active : ''}`}
            >
                <Image
                    src="/ic_categories.png"
                    alt="Menu de categorías"
                    width={24}
                    height={24}
                />
                <span>MENU</span>
            </button>
            {/* Menú desplegable si `isOpen` es `true` */}
            {isOpen && (
                <div className={styles.menu}>
                    <ul className={styles.menuList}>
                        {/* Opción para todas las categorías */}
                        <li
                            onClick={() => handleCategoryChange('')}
                            className={`${styles.menuItem} ${styles.allCategories}`}
                        >
                            All the categories
                        </li>
                        {/* Opciones para las categorías de la API */}
                        {categories.map((category) => (
                            <li
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={styles.menuItem}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

