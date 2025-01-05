'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            router.push('/login'); // Redirige a la página de login si no hay token
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-center">
            {isLoggedIn ? (
                <>
                    <h1 className="font-[Lovan] font-bold text-[56px] text-center text-black dark:text-white">WELCOME TO FAKHOP</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-200 mb-10">You are successfully logged in. Reload the page to complete the process and enjoy shopping.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="py-3 px-6 font-semibold border-2 border-[#772E3F] dark:border-[#FA8B5F] bg-[#9553633c] dark:bg-[#ff966c56] text-[#772E3F] dark:text-[#FA8B5F] hover:bg-[#772E3F] dark:hover:bg-[#FA8B5F] hover:text-white dark:hover:text-white hover:border-[#772E3F] dark:hover:border-[#FA8B5F] transition-all"
                    >
                        Go to Homepage
                    </button>
                </>
            ) : (
                <p className="text-gray-600">Redirecting...</p>
            )}
        </div>
    );
}