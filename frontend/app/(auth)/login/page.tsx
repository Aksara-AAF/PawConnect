'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, PawPrint, ArrowRight, AlertCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetchApi('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            // Simpan data user ke localStorage untuk Navbar & Dashboard
            localStorage.setItem('user', JSON.stringify(res.data));
            
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Login gagal. Periksa email dan password Anda.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sisi Kiri - Gambar & Branding */}
            <div className="relative hidden w-1/2 overflow-hidden bg-teal-900 lg:block">
                <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Anjing peliharaan bahagia"
                    className="absolute inset-0 object-cover w-full h-full opacity-60"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-12 bg-gradient-to-t from-teal-950/90 to-transparent">
                    <Link href="/" className="flex items-center gap-2 text-white w-max hover:opacity-80">
                        <PawPrint className="w-8 h-8 text-orange-500" />
                        <span className="text-2xl font-bold tracking-tight">PawConnect</span>
                    </Link>
                    <div className="max-w-md space-y-4">
                        <h2 className="text-4xl font-bold text-white">Selamat Datang Kembali!</h2>
                        <p className="text-lg text-teal-100">Ribuan sahabat berbulu sedang menunggu untuk bertemu denganmu.</p>
                    </div>
                </div>
            </div>

            {/* Sisi Kanan - Form Login */}
            <div className="flex items-center justify-center w-full px-8 py-12 lg:w-1/2 sm:px-12">
                <div className="w-full max-w-md space-y-8">

                    <div className="text-center lg:text-left">
                        <div className="flex justify-center mb-6 lg:hidden">
                            <Link href="/">
                                <div className="p-3 rounded-full bg-teal-50"><PawPrint className="w-8 h-8 text-teal-600" /></div>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-extrabold text-teal-950">Masuk ke Akun</h1>
                        <p className="mt-2 text-teal-700/70">Masukkan email dan password untuk melanjutkan.</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm animate-shake">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6 mt-8">
                        <div className="space-y-4">
                            {/* Input Email */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-teal-900">Alamat Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>

                            {/* Input Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-teal-900">Kata Sandi</label>
                                    <a href="#" className="text-sm font-semibold text-orange-500 hover:text-orange-600">Lupa sandi?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center w-full gap-2 py-4 text-white transition-all bg-orange-500 rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-500/20 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
                            {!isLoading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <p className="text-center text-teal-700/70">
                        Belum punya akun?{' '}
                        <Link href="/register" className="font-bold text-teal-800 transition-colors hover:text-orange-500">
                            Daftar di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}