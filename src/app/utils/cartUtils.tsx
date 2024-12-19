import { Product } from "@/app/interfaces/product.interface";

//Clave usada en localStorage para almacenar carrito
const CART_KEY = "shoppingCart";

//Obtener el carrito desde localStorage
export function getCart(): Product[] {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    }
    return [];
}

//Añadir producto al carrito
export function addToCart(product: Product): void {
    if (typeof window !== "undefined") {
        const cart = getCart();
        const updatedCart = [...cart, product];
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    }
}

//Eliminar producto del carrito
export function removeFromCart(productId: number): void {
    if (typeof window !== "undefined") {
        const cart = getCart();
        const updatedCart = cart.filter((product) => product.id !== productId);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    }
}