import { Rating } from "@/app/interfaces/product.interface";
import RatingComponent from "../rating/rating";
import { addToCart } from "@/app/utils/cartUtils"; // Importamos la función para añadir al carrito

export default function ProductInfo({ image, title, description, price, rating }: { image: string, title: string, description: string, price: number, rating: Rating }) {

    const handleAddToCart = () => {
        const product = { image, title, description, price, rating, id: Math.random() }; // Simular un ID para el producto
        addToCart(product);
        alert("Product added to cart!"); // Confirmación al usuario
    };

    return (
        <div className="max-w-7xl mx-auto mt-16 mb-2 p-10 flex flex-col md:flex-row gap-12">
            {/* Imagen del producto */}
            <div className="mt-16 ml-[100px] w-[400px] h-auto">
                <img src={image} alt={title} className="object-contain" />
            </div>

            {/* Detalles del producto */}
            <div className="flex-1 flex flex-col gap-5 border-2 border-[#772E3F] dark:border-[#FA8B5F] mt-16 mr-[100px] p-4">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">{title}</h1>

                {/* Rating */}
                <RatingComponent rating={rating} />

                {/* Línea horizontal */}
                <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] my-4" />

                {/* Descripción */}
                <p className="text-[#772E3F] dark:text-[#FA8B5F]">DESCRIPTION</p>
                <p className="text-gray-600 text-sm dark:text-gray-300">{description}</p>

                {/* Línea horizontal */}
                <hr className="border-t border-[#772E3F] dark:border-[#FA8B5F] my-4" />

                {/* Opción de cantidad */}
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex items-center justify-between w-full">
                        {/* Etiqueta y campo de cantidad */}
                        <div className="flex items-center">
                            <label htmlFor="quantity" className="mr-2 text-[#772E3F] dark:text-[#FA8B5F]">QUANTITY:</label>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                max="10"
                                defaultValue="1"
                                className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg w-16"
                            />
                        </div>

                        {/* Línea vertical */}
                        <div className="h-8 border-l border-[#772E3F] dark:border-[#FA8B5F]"></div>

                        {/* Precio */}
                        <div className="text-2xl font-semibold text-[#FA8B5F] dark:text-white mr-10">
                            ${price}
                        </div>
                    </div>
                </div>

                {/* Botón "Añadir al carrito" */}
                <button
                    onClick={handleAddToCart}
                    className="mt-8 mb-4 mx-16 py-2 font-semibold border-2 border-[#772E3F] dark:border-[#FA8B5F] text-[#772E3F] dark:text-[#FA8B5F] hover:bg-[#FA8B5F] hover:text-white dark:hover:text-white hover:border-[#FA8B5F] transition-all"
                >
                    ADD TO CART
                </button>
            </div>
        </div>
    );
}
