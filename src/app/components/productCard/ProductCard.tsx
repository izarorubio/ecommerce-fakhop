import { Product } from "@/app/interfaces/product.interface";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    const { image, title, category, price } = product;
    return (
        <Link href={`/product/${product.id}`} className="shadow-sm border-2 border-[#772E3F] dark:border-[#FA8B5F]  bg-white dark:bg-black hover:scale-105 hover:bg-[#a17c85] hover:bg-opacity-30 transition-all dark:hover:bg-[#252437] dark:bg-opacity-30 ">
            <img
                src={image}
                alt={title}
                className="w-full h-80 object-cover p-2"
            />
            <div  className="px-4">
                <h2 className="text-base font-semibold h-20 py-4">{title}</h2>
                <p className="text-[#a17c85] py-2 dark:text-[#FA8B5F]" >{`Category: ${category}`}</p>
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-[25px] font-semibold">{`${price}$`}</p>
                    <button className="flex items-center gap-2  text-sm bg-[#772E3F] dark:bg-[#FA8B5F] text-white px-4 py-1 rounded-lg hover:bg-[#FA705F] transition duration-200">
                        <span>Add</span>
                        <img src="/ic_cart.png" alt="Cart Icon" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </Link>
    );
}