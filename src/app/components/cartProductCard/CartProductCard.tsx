import { Product } from "@/app/interfaces/product.interface";

interface CartProductCardProps {
    product: Product;
    onRemove: (id: number) => void;
}

export default function CartProductCard({ product, onRemove }: CartProductCardProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                />
                <div>
                    <h3 className="font-medium text-sm">{product.title}</h3>
                    <p className="text-gray-600 text-xs dark:text-gray-400">{`$${product.price}`}</p>
                </div>
            </div>
            <button
                onClick={() => onRemove(product.id)}
                className="text-red-500 text-sm hover:underline"
            >
                Remove
            </button>
        </div>
    );
}

