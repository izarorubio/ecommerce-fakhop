'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";  // Usamos useRouter para redirigir

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();  // hook para redirigir

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api-backend-vgwb.onrender.com/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email, contraseña: password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Login successful!');
                localStorage.setItem('token', data.token);  // Guardamos el token
                router.push('/welcome');  // Redirigimos a la página de bienvenida
            } else {
                setMessage(data.error || 'Failed to log in.');
            }
        } catch (error) {
            console.error(error)
            setMessage('An error occurred. Please try again.');
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white dark:bg-[#1f1f1f] border-2 border-[#772E3F] dark:border-[#FA8B5F]">
                <h2 className="text-4xl font-bold text-center text-[#772E3F] dark:text-[#FA8B5F] mb-3">Login</h2>
                <p className="text-center text-gray-600 dark:text-white mb-8">Enter your account to get started</p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 dark:bg-[#1f1f1f] border border-[#772E3F] dark:border-[#FA8B5F] focus:ring-2 focus:ring-[#772E3F] dark:focus:ring-[#FA8B5F]"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 dark:bg-[#1f1f1f] border border-[#772E3F] dark:border-[#FA8B5F] focus:ring-2 focus:ring-[#772E3F] dark:focus:ring-[#FA8B5F]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold border-2 border-[#7aa580] bg-[#7aa5807b] text-[#3e7746] dark:text-[#c4ebc9] hover:bg-[#7aa580] hover:text-white dark:hover:text-white hover:border-[#7aa580] transition-all"
                    >
                        Log In
                    </button>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
}

