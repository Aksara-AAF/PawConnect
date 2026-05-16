'use client';

import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    PawPrint, 
    MessageSquare, 
    Heart, 
    Trash2, 
    Check, 
    X, 
    Loader2, 
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

type TabType = 'my-pets' | 'incoming-requests' | 'my-requests' | 'my-donations';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('my-pets');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (tab: TabType) => {
        setIsLoading(true);
        setError(null);
        try {
            let endpoint = '';
            switch (tab) {
                case 'my-pets': endpoint = '/users/me/pets'; break;
                case 'incoming-requests': endpoint = '/users/me/incoming'; break;
                case 'my-requests': endpoint = '/users/me/requests'; break;
                case 'my-donations': endpoint = '/users/me/donations'; break;
            }
            const res = await fetchApi(endpoint);
            setData(res.data || []);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const handleAction = async (requestId: string, status: 'Diterima' | 'Ditolak') => {
        try {
            await fetchApi(`/adoptions/${requestId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            alert(`Permintaan berhasil ${status === 'Diterima' ? 'disetujui' : 'ditolak'}`);
            fetchData('incoming-requests');
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDeletePet = async (petId: string) => {
        if (!confirm('Yakin ingin menghapus postingan hewan ini?')) return;
        try {
            await fetchApi(`/pets/${petId}`, { method: 'DELETE' });
            fetchData('my-pets');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-teal-900/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-teal-900 text-white rounded-2xl">
                        <LayoutDashboard className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-teal-950 dark:text-white">Dashboard</h1>
                        <p className="text-teal-700/70 dark:text-teal-400">Kelola aktivitas adopsi dan donasi Anda.</p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-teal-950 p-2 rounded-2xl border border-teal-100 dark:border-teal-800 shadow-sm">
                    {[
                        { id: 'my-pets', label: 'Hewan Saya', icon: PawPrint },
                        { id: 'incoming-requests', label: 'Pengajuan Masuk', icon: MessageSquare },
                        { id: 'my-requests', label: 'Permintaan Saya', icon: ArrowRight },
                        { id: 'my-donations', label: 'Donasi Saya', icon: Heart },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                                : 'text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-teal-950 rounded-3xl border border-teal-100 dark:border-teal-800">
                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                        <p className="text-teal-800 dark:text-teal-400 font-medium">Memuat data...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-teal-950 rounded-3xl border border-teal-100 dark:border-teal-800">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-bold text-teal-950 dark:text-white mb-2">Terjadi Kesalahan</h3>
                        <p className="text-teal-800/80 dark:text-teal-400">{error}</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-teal-950 rounded-3xl border border-dashed border-teal-200 dark:border-teal-800">
                        <p className="text-teal-800/60 dark:text-teal-400 italic">Belum ada data di bagian ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        
                        {/* MY PETS TAB */}
                        {activeTab === 'my-pets' && data.map((pet) => (
                            <div key={pet.id} className="bg-white dark:bg-teal-950 p-4 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                                <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                                    <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-xl font-bold text-teal-950 dark:text-white">{pet.name}</h3>
                                    <p className="text-teal-700/70 dark:text-teal-400">{pet.species} • {pet.location}</p>
                                    <div className="mt-2 inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-full">
                                        Status: {pet.status}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/pets/${pet.id}`} className="p-3 text-teal-600 hover:bg-teal-50 rounded-xl transition-colors">
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>
                                    <button 
                                        onClick={() => handleDeletePet(pet.id)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* INCOMING REQUESTS TAB */}
                        {activeTab === 'incoming-requests' && data.map((req) => (
                            <div key={req.id} className="bg-white dark:bg-teal-950 p-6 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                                                {req.adopter_name?.[0] || '?'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-teal-950 dark:text-white">{req.adopter_name || 'Anonim'}</p>
                                                <p className="text-xs text-teal-500">Ingin mengadopsi <span className="font-bold text-orange-500">{req.pet_name}</span></p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-teal-900/30 p-4 rounded-2xl">
                                            <p className="text-sm text-teal-800 dark:text-teal-200 italic">"{req.application_reason}"</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-2 justify-center">
                                        {req.status === 'Menunggu' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleAction(req.id, 'Diterima')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all"
                                                >
                                                    <Check className="w-4 h-4" /> Terima
                                                </button>
                                                <button 
                                                    onClick={() => handleAction(req.id, 'Ditolak')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
                                                >
                                                    <X className="w-4 h-4" /> Tolak
                                                </button>
                                            </>
                                        ) : (
                                            <div className={`px-4 py-2 rounded-xl font-bold text-center ${
                                                req.status === 'Diterima' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {req.status}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* MY REQUESTS TAB */}
                        {activeTab === 'my-requests' && data.map((req) => (
                            <div key={req.id} className="bg-white dark:bg-teal-950 p-6 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-teal-100">
                                        <img src={req.pet_image_url} alt={req.pet_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-teal-950 dark:text-white">{req.pet_name}</h3>
                                        <p className="text-sm text-teal-700/70 dark:text-teal-400">Oleh: {req.uploader_name}</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                                    req.status === 'Diterima' ? 'bg-emerald-100 text-emerald-600' : 
                                    req.status === 'Menunggu' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                }`}>
                                    {req.status}
                                </div>
                            </div>
                        ))}

                        {/* MY DONATIONS TAB */}
                        {activeTab === 'my-donations' && data.map((donation) => (
                            <div key={donation.id} className="bg-white dark:bg-teal-950 p-6 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-black text-orange-500">
                                        Rp {Number(donation.amount || 0).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-sm text-teal-700/70 dark:text-teal-400">
                                        {donation.created_at ? new Date(donation.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="px-3 py-1 bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-full border border-teal-100 dark:border-teal-800">
                                        {donation.payment_status || 'Pending'}
                                    </div>
                                    <p className="text-xs text-teal-500 mt-2 italic">"{donation.message || '-'}"</p>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}
