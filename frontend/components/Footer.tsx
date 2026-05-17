'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PawPrint, Heart, Mail, Globe, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                const user = JSON.parse(stored);
                setIsAdmin(user.role === 'admin');
            } catch {
                setIsAdmin(false);
            }
        }
    }, []);

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="p-2 bg-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <PawPrint className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">PawConnect</span>
                        </Link>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
                            Platform yang menghubungkan hewan peliharaan terlantar dengan keluarga baru yang penuh kasih sayang. Bersama kita bisa memberikan mereka kesempatan kedua.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">
                                <Globe className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">
                                <Mail className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">
                                <Phone className="w-4 h-4" />
                            </a>
                            {/* Tombol Admin — hanya tampil jika role === 'admin' */}
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
                                    title="Admin Panel"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Platform</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/pets" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Katalog Hewan</Link>
                            </li>
                            <li>
                                <Link href="/donate" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Bantu Donasi</Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Dashboard User</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6">PROYEK AKHIR SBD</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Dibuat oleh:<br/>
                            Akbar, Daffa, Nabil, &amp; Zhafarrel.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 dark:text-zinc-500 text-sm">
                        © {new Date().getFullYear()} PawConnect. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}