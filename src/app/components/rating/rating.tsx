import { Rating } from "@/app/interfaces/product.interface";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingComponent({ rating }: { rating: Rating }) {
    const rate = rating.rate;
    const totalStars = 5; // Máximo de 5 estrellas

    return (
        <div className="flex items-center">
            {/* Generamos las estrellas llenas y vacías */}
            {[...Array(totalStars)].map((_, index) => (
                index < rate ? (
                    <FaStar key={index} className="text-black dark:text-white" />
                ) : (
                    <FaRegStar key={index} className="text-black dark:text-white" />
                )
            ))}
            {/* Mostrar la cantidad de reseñas */}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">({rating.count} reviews)</span>
        </div>
    );
}

