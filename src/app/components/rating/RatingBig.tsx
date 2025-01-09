import { Rating } from "@/app/interfaces/product.interface";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RatingComponent({ rating }: { rating: Rating }) {
    const rate = rating.rate;
    const totalStars = 5; // Máximo de 5 estrellas

    // Simulación de distribución de calificaciones
    const ratingsDistribution = [28, 10, 18, 6, 7];
    // Calcular el porcentaje de cada barra
    const maxCount = Math.max(...ratingsDistribution);
    const getPercentage = (count: number) => (count / maxCount) * 100;

    return (
        <div className="mt-6">
            {/* Calificación promedio */}
            <div className="flex items-center mb-4">
                <div className="flex items-center">
                    {/* Generar estrellas llenas, medias y vacías */}
                    {[...Array(totalStars)].map((_, index) => {
                        if (index < Math.floor(rate)) {
                            return <FaStar key={index} className="text-black dark:text-white" />;
                        } else if (index < rate) {
                            return <FaStarHalfAlt key={index} className="text-black dark:text-white" />;
                        } else {
                            return <FaRegStar key={index} className="text-black dark:text-white" />;
                        }
                    })}
                </div>
                <span className="ml-3 text-2xl font-bold text-black dark:text-white">{rate.toFixed(1)}</span>
            </div>

            {/* Línea divisoria */}
            <hr className="border-gray-300 dark:border-gray-600 my-4" />

            {/* Distribución de calificaciones */}
            <div className="space-y-2">
                {ratingsDistribution.map((count, index) => (
                    <div key={index} className="flex items-center">
                        <span className="flex items-center text-sm text-gray-600 dark:text-gray-300 w-12">
                            {totalStars - index} <FaStar className="ml-1 text-black dark:text-white" />
                        </span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 dark:bg-gray-700 rounded">
                            <div
                                className="h-full bg-black dark:bg-white rounded"
                                style={{ width: `${getPercentage(count)}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
