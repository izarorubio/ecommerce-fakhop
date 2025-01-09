'use client';

import { useEffect, useState } from 'react';

import { Product } from "@/app/interfaces/product.interface";
import CartProductCard from "../cartProductCard/CartProductCard";
import { removeFromCart, getCart } from "@/app/utils/cartUtils";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCartUpdate: (updatedCart: Product[]) => void;
    products: Product[];
}

export default function CartModal({ isOpen, onClose, onCartUpdate, products }: CartModalProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Esto se asegura que solo se renderice en el cliente
    }, []);

    if (!isClient) return null;

    if (!isOpen) return null;

    // Eliminar un producto del carrito
    const handleRemoveProduct = (productId: number) => {
        removeFromCart(productId); // Elimina del LocalStorage
        const updatedCart = getCart(); // Obtiene el carrito actualizado
        onCartUpdate(updatedCart); // Actualiza el estado en el componente padre
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Contenedor del modal */}
            <div className="bg-white dark:bg-black p-6 rounded shadow-lg w-[90%] max-w-lg">
                {/* Header del carrito */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✖
                    </button>
                </div>
                {/* Productos */}
                <div className="max-h-[300px] overflow-y-auto border-t border-b dark:border-gray-700">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <CartProductCard
                                key={product.id}
                                product={product}
                                onRemove={handleRemoveProduct}
                            />
                        ))
                    ) : (
                        <p className="text-center py-4">No products in the cart.</p>
                    )}
                </div>
                {/* Si hay productos en el carrito... */}
                {products.length > 0 && (
                    <div className="mt-4">
                        {/* Calcular precio total */}
                        <p className="font-semibold text-right">{`Total: $${products.reduce(
                            (total, product) => total + parseFloat(product.price.toString()), // Asegúrate de convertir el precio a número
                            0
                        ).toFixed(2)}`}</p>
                        {/* Botón de checkout, no es funcional (cierra el carrito) */}
                        <button
                            onClick={onClose}
                            className="mt-4 w-full px-4 py-2 bg-[#FA8B5F] text-white rounded hover:bg-[#FA705F] transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
