'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2c1419] dark:bg-[#0c1c32] text-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-4">
                    <Link href="/">
                        <h1 className="font-[Lovan] font-bold text-[30px] text-[#FA8B5F] hover:text-[#FA705F] transition-all">
                        FAKHOP
                        </h1>
                    </Link>
                    <div className="space-x-10">
                        <Link href="/about" className="text-lg hover:text-[#FA8B5F] transition-all">
                            About Us
                        </Link>
                        <Link href="/privacy-policy" className="text-lg hover:text-[#FA8B5F] transition-all">
                            Privacy Policy
                        </Link>
                    </div>
                    <div>
                        <p className="text-sm text-center text-gray-400">
                            &copy; {new Date().getFullYear()} FAKHOP. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
