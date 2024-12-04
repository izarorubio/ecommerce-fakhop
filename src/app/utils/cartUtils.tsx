import { Product } from "@/app/interfaces/product.interface";

const CART_KEY = "shoppingCart";

export function getCart(): Product[] {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    }
    return [];
}

export function addToCart(product: Product): void {
    if (typeof window !== "undefined") {
        const cart = getCart();
        const updatedCart = [...cart, product];
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    }
}

export function removeFromCart(productId: number): void {
    if (typeof window !== "undefined") {
        const cart = getCart();
        const updatedCart = cart.filter((product) => product.id !== productId);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    }
}

export function clearCart(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(CART_KEY);
    }
}
