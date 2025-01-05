'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            router.push('/login'); // Redirige a la página de login si no hay token
        }
    }, [router]);

    return (
        <div className="mt-28 max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
            {isLoggedIn ? (
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome to Your Account</h2>
                    <p className="text-center text-gray-600">You are successfully logged in!</p>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
