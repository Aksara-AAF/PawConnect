'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint, Heart, Search, Menu, LayoutDashboard, LogOut, User, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Cek login status dari local storage (disimpan saat login sukses)
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            setUserName(JSON.parse(user).name);
        }
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await fetchApi('/auth/logout', { method: 'POST' });
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-teal-950/80 border-b border-teal-100 dark:border-teal-900 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <PawPrint className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-teal-950 dark:text-white">
                                PawConnect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/pets" className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/pets' ? 'text-orange-500' : 'text-teal-800 hover:text-orange-500 dark:text-teal-100'}`}>
                            <Search className="w-4 h-4" />
                            Katalog
                        </Link>
                        <Link href="/donate" className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/donate' ? 'text-orange-500' : 'text-teal-800 hover:text-orange-500 dark:text-teal-100'}`}>
                            <Heart className="w-4 h-4" />
                            Donasi
                        </Link>
                        
                        <div className="h-4 w-px bg-teal-100 dark:bg-teal-800 mx-2"></div>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/dashboard' ? 'text-orange-500' : 'text-teal-800 hover:text-orange-500 dark:text-teal-100'}`}>
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-900/50 px-3 py-1.5 rounded-full border border-teal-100 dark:border-teal-800">
                                    <User className="w-4 h-4 text-teal-600" />
                                    <span className="text-xs font-bold text-teal-900 dark:text-teal-100">{userName}</span>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-teal-600 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm font-medium text-teal-800 hover:text-orange-500 dark:text-teal-100 transition-colors px-4">
                                    Masuk
                                </Link>
                                <Link href="/register" className="text-sm font-bold bg-teal-900 text-white dark:bg-orange-500 px-6 py-2.5 rounded-full hover:bg-teal-800 dark:hover:bg-orange-600 transition-all shadow-md hover:shadow-lg active:scale-95">
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-teal-800 dark:text-teal-100 hover:bg-teal-50 dark:hover:bg-teal-900 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-teal-950 border-t border-teal-100 dark:border-teal-900 px-4 py-6 space-y-4 animate-fade-in">
                    <Link 
                        href="/pets" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-800 dark:text-teal-100 font-bold hover:bg-teal-50 dark:hover:bg-teal-900"
                    >
                        <Search className="w-5 h-5 text-orange-500" /> Katalog
                    </Link>
                    <Link 
                        href="/donate" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-800 dark:text-teal-100 font-bold hover:bg-teal-50 dark:hover:bg-teal-900"
                    >
                        <Heart className="w-5 h-5 text-orange-500" /> Donasi
                    </Link>
                    
                    {isLoggedIn && (
                        <Link 
                            href="/dashboard" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-800 dark:text-teal-100 font-bold hover:bg-teal-50 dark:hover:bg-teal-900"
                        >
                            <LayoutDashboard className="w-5 h-5 text-orange-500" /> Dashboard
                        </Link>
                    )}

                    <div className="pt-4 border-t border-teal-100 dark:border-teal-900 flex flex-col gap-3">
                        {isLoggedIn ? (
                            <button 
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="flex items-center justify-center gap-2 w-full py-4 bg-red-50 text-red-600 rounded-xl font-bold"
                            >
                                <LogOut className="w-5 h-5" /> Keluar
                            </button>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center text-teal-800 font-bold hover:bg-teal-50 rounded-xl">
                                    Masuk
                                </Link>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center bg-orange-500 text-white font-bold rounded-xl shadow-lg">
                                    Daftar Sekarang
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}