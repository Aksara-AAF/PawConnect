'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Phone, PawPrint, Heart, Camera } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Register text data:', formData);
        console.log('Profile picture file:', profilePic);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="flex min-h-screen bg-white flex-row-reverse">
            {/* Sisi Kanan - Gambar (Hidden di Mobile) */}
            <div className="relative hidden w-1/2 overflow-hidden bg-orange-900 lg:block">
                <img
                    src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Kucing lucu"
                    className="absolute inset-0 object-cover w-full h-full opacity-60 transform scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-12 bg-gradient-to-t from-orange-950/90 to-transparent">
                    <div className="flex justify-end">
                        <Link href="/" className="flex items-center gap-2 text-white w-max hover:opacity-80">
                            <span className="text-2xl font-bold tracking-tight">PawConnect</span>
                            <PawPrint className="w-8 h-8 text-teal-400" />
                        </Link>
                    </div>
                    <div className="max-w-md space-y-4">
                        <h2 className="text-4xl font-bold text-white">Langkah Kecil, <br />Dampak Besar.</h2>
                        <p className="text-lg text-orange-100 flex items-center gap-2">
                            Gabung komunitas penyayang hewan sekarang <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Sisi Kiri - Form Register */}
            <div className="flex items-center justify-center w-full px-8 py-12 lg:w-1/2 sm:px-12">
                <div className="w-full max-w-md space-y-6">

                    <div className="text-center lg:text-left">
                        <div className="flex justify-center mb-6 lg:hidden">
                            <Link href="/">
                                <div className="p-3 rounded-full bg-orange-50"><PawPrint className="w-8 h-8 text-orange-500" /></div>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-extrabold text-teal-950">Buat Akun Baru</h1>
                        <p className="mt-2 text-teal-700/70">Lengkapi data diri kamu di bawah ini.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5 mt-8">

                        {/* FOTO PROFIL UPLOAD SECTION */}
                        <div className="flex flex-col items-center justify-center mb-6 lg:items-start">
                            <label className="block mb-3 text-sm font-medium text-teal-900">Foto Profil (Opsional)</label>
                            <div className="flex items-center gap-5">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative flex items-center justify-center w-20 h-20 overflow-hidden transition-all border-2 border-dashed rounded-full cursor-pointer bg-slate-50 border-teal-200 hover:border-teal-500 hover:bg-teal-50 group"
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <User className="w-8 h-8 text-teal-300 group-hover:text-teal-500" />
                                    )}

                                    {/* Overlay efek hover */}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="text-sm text-teal-700/70">
                                    <p className="font-semibold text-teal-900">Unggah foto</p>
                                    <p className="text-xs">JPG, PNG maks. 2MB</p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/jpeg, image/png, image/webp"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Input Nama Lengkap */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                    className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Nama Lengkap"
                                />
                            </div>
                        </div>

                        {/* Input Email */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email" name="email" required value={formData.email} onChange={handleChange}
                                    className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Alamat Email (nama@email.com)"
                                />
                            </div>
                        </div>

                        {/* Input No HP */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                                    className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Nomor WhatsApp (0812...)"
                                />
                            </div>
                        </div>

                        {/* Input Password */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-teal-700/50">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password" name="password" required value={formData.password} onChange={handleChange}
                                    className="w-full py-3 pl-12 pr-4 transition-all bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Kata Sandi (Min. 6 karakter)" minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full py-4 text-white transition-all bg-teal-800 rounded-xl hover:bg-teal-900 focus:ring-4 focus:ring-teal-500/20 font-bold disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? 'Mendaftarkan akun...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="text-center text-teal-700/70">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="font-bold text-teal-800 transition-colors hover:text-teal-600">
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}