'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './categoryFilter.module.css';

export default function CategoryFilter({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCategoryChange = (category: string) => {
        onCategorySelect(category);  // Llama a la función pasada para actualizar el estado en ProductList.tsx
        setIsOpen(false);  // Cierra el menú después de seleccionar
        window.location.href = `/?page=1&category=${category}`; // Redirige y pasa el filtro a la URL
    };

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles.button}>
                <Image
                    src="/ic_categories.png"
                    alt="Menu de categorías"
                    width={24}
                    height={24}
                />
                <span>MENU</span>
            </button>
            {isOpen && (
                <div className={styles.menu}>
                    <ul className={styles.menuList}>
    
                    <li
                            onClick={() => handleCategoryChange('')}
                            className={`${styles.menuItem} ${styles.allCategories}`}
                        >
                            Todas las categorías
                        </li>

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

