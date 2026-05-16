'use client';

import { useState, useEffect } from 'react';
import { Heart, CreditCard, History, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function DonatePage() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [donations, setDonations] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetchApi('/users/me/donations');
                setDonations(res.data || []);
            } catch (err) {
                console.error('Failed to fetch donations', err);
            } finally {
                setLoadingHistory(false);
            }
        };
        fetchHistory();
    }, []);

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await fetchApi('/donations', {
                method: 'POST',
                body: JSON.stringify({ amount: Number(amount), message }),
            });
            setSuccess(true);
            setAmount('');
            setMessage('');
            // Refresh history
            const res = await fetchApi('/users/me/donations');
            setDonations(res.data || []);
        } catch (err: any) {
            setError(err.message || 'Gagal mengirim donasi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-teal-900/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold rounded-full text-orange-600 bg-orange-50 border border-orange-100">
                        ❤️ Bantu Shelter Lokal
                    </div>
                    <h1 className="text-4xl font-extrabold text-teal-950 dark:text-white mb-4">
                        Donasi untuk <span className="text-orange-500">Kesejahteraan</span> Hewan
                    </h1>
                    <p className="text-lg text-teal-800/80 dark:text-teal-400">
                        Setiap donasi Anda digunakan untuk biaya makan, perawatan medis, dan operasional shelter mitra kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Form Donasi */}
                    <div className="bg-white dark:bg-teal-950 rounded-3xl p-8 shadow-sm border border-teal-100 dark:border-teal-800">
                        <h2 className="text-2xl font-bold text-teal-950 dark:text-white mb-6 flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-orange-500" />
                            Kirim Donasi
                        </h2>

                        {success && (
                            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <p className="font-medium">Terima kasih! Donasi Anda berhasil dikirim.</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleDonate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-teal-900 dark:text-teal-100">Jumlah Donasi (IDR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500 font-bold">Rp</span>
                                    <input
                                        type="number"
                                        required
                                        min="1000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-teal-900/30 border border-slate-200 dark:border-teal-800 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
                                        placeholder="Min. 1.000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-teal-900 dark:text-teal-100">Pesan (Opsional)</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-4 bg-slate-50 dark:bg-teal-900/30 border border-slate-200 dark:border-teal-800 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
                                    placeholder="Tuliskan pesan penyemangat..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Heart className="w-5 h-5 fill-current" />
                                        Donasi Sekarang
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Riwayat Donasi */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-teal-950 dark:text-white flex items-center gap-2">
                            <History className="w-6 h-6 text-teal-600" />
                            Riwayat Donasi
                        </h2>

                        {loadingHistory ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                            </div>
                        ) : donations.length > 0 ? (
                            <div className="space-y-4">
                                {donations.map((donation: any) => (
                                    <div key={donation.id} className="bg-white dark:bg-teal-950 p-5 rounded-2xl border border-teal-100 dark:border-teal-800 shadow-sm flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-teal-950 dark:text-white text-lg">Rp {Number(donation.amount || 0).toLocaleString('id-ID')}</p>
                                            <p className="text-sm text-teal-700/70 dark:text-teal-400 mt-1 italic">"{donation.message || 'Tanpa pesan'}"</p>
                                            <p className="text-xs text-teal-500 mt-2">{donation.created_at ? new Date(donation.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100 dark:border-emerald-500/20">
                                            {donation.payment_status || 'Pending'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-teal-950/50 rounded-3xl p-12 text-center border-2 border-dashed border-teal-100 dark:border-teal-800">
                                <History className="w-12 h-12 text-teal-200 dark:text-teal-800 mx-auto mb-4" />
                                <p className="text-teal-800/60 dark:text-teal-400">Anda belum pernah melakukan donasi.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}