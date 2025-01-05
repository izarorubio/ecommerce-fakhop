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
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="mt-28 max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Log In</h2>
            <form onSubmit={handleLogin}>
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
                    className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                    Log In
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
}

