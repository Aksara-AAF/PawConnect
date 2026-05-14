import Link from 'next/link';
import { PawPrint, Heart, Search, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <PawPrint className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                                PawConnect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/pets" className="text-sm font-medium text-zinc-600 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Katalog
                        </Link>
                        <Link href="/donate" className="text-sm font-medium text-zinc-600 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Donasi
                        </Link>
                        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
                        <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            Masuk
                        </Link>
                        <Link href="/register" className="text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm hover:shadow-md">
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}