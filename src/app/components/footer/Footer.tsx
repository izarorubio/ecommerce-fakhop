'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#2c1419] dark:bg-[#0c1c32] text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Contenedor principal dividido en 3 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Columna 1: Información del sitio */}
                    <div>
                        <Link href="/">
                            <h1 className="font-[Lovan] font-bold text-[32px] text-[#FA8B5F] hover:text-[#FA705F] transition-all">
                                FAKHOP
                            </h1>
                        </Link>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Your go-to platform for quality products and an exceptional shopping experience.
                            Stay connected and explore what FAKHOP has to offer.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces útiles (conducen páginas que no existen (error 404))*/}
                    <div>
                        <h2 className="font-semibold text-lg mb-4 text-[#FA8B5F]">Quick Links</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="hover:text-[#FA8B5F] transition-all text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-[#FA8B5F] transition-all text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="hover:text-[#FA8B5F] transition-all text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#FA8B5F] transition-all text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Redes sociales */}
                    <div>
                        <h2 className="font-semibold text-lg mb-4 text-[#FA8B5F]">Follow Us</h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Stay updated with our latest news and promotions. Follow us on social media:
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#FA8B5F] hover:bg-[#FA705F] transition-all text-white"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#FA8B5F] hover:bg-[#FA705F] transition-all text-white"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#FA8B5F] hover:bg-[#FA705F] transition-all text-white"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#FA8B5F] hover:bg-[#FA705F] transition-all text-white"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Línea horizontal */}
                <hr className="border-t border-gray-600 my-8" />

                {/* Sección 2: */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Derechos reservados */}
                    <p className="text-sm text-center text-gray-400">
                        &copy; {new Date().getFullYear()} FAKHOP. All rights reserved.
                    </p>
                    {/* Navegación extra (conducen páginas que no existen (error 404)) */}
                    <div className="space-x-4 mt-4 md:mt-0">
                        <Link href="/faq" className="text-sm text-gray-400 hover:text-[#FA8B5F] transition-all">
                            FAQ
                        </Link>
                        <Link href="/support" className="text-sm text-gray-400 hover:text-[#FA8B5F] transition-all">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
