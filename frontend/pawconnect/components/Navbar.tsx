import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="text-2xl font-extrabold tracking-tight text-amber-600">
                            PawConnect
                        </Link>
                    </div>

                    {/* Menu Tengah (Desktop) */}
                    <div className="hidden space-x-8 md:flex">
                        <Link href="/" className="font-medium text-gray-600 transition-colors hover:text-amber-600">
                            Beranda
                        </Link>
                        <Link href="/pets" className="font-medium text-gray-600 transition-colors hover:text-amber-600">
                            Katalog Hewan
                        </Link>
                        <Link href="/donate" className="font-medium text-gray-600 transition-colors hover:text-amber-600">
                            Donasi
                        </Link>
                    </div>

                    {/* Menu Kanan (Auth) */}
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="hidden font-medium text-gray-600 transition-colors hover:text-amber-600 md:block">
                            Masuk
                        </Link>
                        <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white transition-colors rounded-full bg-amber-600 hover:bg-amber-700">
                            Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 