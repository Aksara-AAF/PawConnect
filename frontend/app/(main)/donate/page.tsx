'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, TrendingUp, Users, Target, Loader2, AlertCircle, PlusCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function DonateCatalogPage() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await fetchApi('/campaigns');
                setCampaigns(res.data || []);
            } catch (err: any) {
                setError(err.message || 'Gagal memuat daftar kampanye.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Hero Section */}
            <div className="relative bg-teal-950 py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Anjing dan Kucing di Shelter"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-rose-500/20 rounded-full mb-6">
                        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Pilih Kampanye <span className="text-orange-400">Donasi</span>
                    </h1>
                    <p className="text-lg md:text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
                        Salurkan bantuanmu langsung ke shelter atau rescuer terverifikasi yang sedang membutuhkan uluran tangan kita saat ini.
                    </p>
                </div>
            </div>

            {/* Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">

                {/* Info Banner */}
                <div className="bg-white rounded-2xl shadow-md border border-teal-50 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-teal-950">100% Aman &amp; Terverifikasi</h3>
                            <p className="text-sm text-teal-700/80">Semua penggalang dana di halaman ini telah melewati proses verifikasi ketat tim PawConnect.</p>
                        </div>
                    </div>
                    <Link
                        href="/donate/new"
                        className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-md whitespace-nowrap shrink-0"
                    >
                        <PlusCircle className="w-5 h-5" /> Buka Penggalangan Dana
                    </Link>
                </div>

                {/* States: Loading / Error / Empty / Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                        <p className="text-teal-800 font-medium">Memuat kampanye...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                        <h3 className="text-xl font-bold text-teal-950 mb-2">Gagal Memuat Data</h3>
                        <p className="text-slate-500 max-w-sm">{error}</p>
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <Heart className="w-16 h-16 text-teal-100 mb-4" />
                        <h3 className="text-xl font-bold text-teal-950 mb-2">Belum Ada Kampanye Aktif</h3>
                        <p className="text-slate-500 mb-6">Jadilah yang pertama membuka penggalangan dana untuk hewan yang membutuhkan!</p>
                        <Link href="/donate/new" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                            Buka Kampanye Pertama
                        </Link>
                    </div>
                ) : (
                    /* Campaign Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map((campaign) => {
                            const collected = Number(campaign.collected_amount) || 0;
                            const target = Number(campaign.target_amount) || 1;
                            const progress = Math.min(Math.round((collected / target) * 100), 100);

                            // Hitung sisa hari dari end_date
                            const endDate = campaign.end_date ? new Date(campaign.end_date) : null;
                            const today = new Date();
                            const daysLeft = endDate
                                ? Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
                                : null;

                            return (
                                <div key={campaign.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-teal-50 flex flex-col group">
                                    <div className="relative h-56 overflow-hidden bg-slate-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={campaign.image_url || 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&q=80'}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-bold text-teal-900">Terverifikasi</span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="text-sm text-teal-600 font-semibold mb-2">{campaign.organizer}</p>
                                        <h3 className="text-xl font-bold text-teal-950 leading-snug mb-4 line-clamp-2 hover:text-orange-500 transition-colors">
                                            {campaign.title}
                                        </h3>

                                        {/* Progress Bar Area */}
                                        <div className="mt-auto space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-bold text-teal-900">Rp {collected.toLocaleString('id-ID')}</span>
                                                    <span className="text-teal-600">terkumpul</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                    <div
                                                        className="bg-orange-500 h-2.5 rounded-full transition-all duration-1000"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs mt-2 text-slate-500">
                                                    <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Target Rp {target.toLocaleString('id-ID')}</span>
                                                    <span className="font-bold text-orange-500">{progress}%</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                                                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-teal-500" /> {campaign.donators_count || 0} donatur</span>
                                                    {daysLeft !== null && (
                                                        <span className="flex items-center gap-1.5">
                                                            <TrendingUp className="w-4 h-4 text-teal-500" />
                                                            {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Berakhir'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Button menuju detail/form donasi */}
                                            <Link href={`/donate/${campaign.id}`} className="block w-full">
                                                <button className="w-full py-3 bg-teal-50 text-teal-700 font-bold rounded-xl hover:bg-teal-700 hover:text-white transition-colors border border-teal-100 mt-2">
                                                    Donasi Sekarang
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}