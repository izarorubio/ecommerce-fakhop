'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";  // Para redirigir

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); // hook para redirigir

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api-backend-vgwb.onrender.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email, contraseña: password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Account created successfully!');
                localStorage.setItem('token', data.token); // Guardamos el token
                router.push('/welcome');  // Redirigimos a la página de bienvenida
            } else {
                setMessage(data.error || 'Failed to create account.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="mt-28 max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Sign Up
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
}
