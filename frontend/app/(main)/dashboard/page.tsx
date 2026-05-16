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
    ArrowRight,
    Megaphone,
    ShieldCheck,
    ShieldAlert,
    Clock
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

type TabType = 'my-pets' | 'incoming-requests' | 'my-requests' | 'my-donations' | 'my-campaigns' | 'shelter-status';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('my-pets');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shelterStatus, setShelterStatus] = useState<{ is_verified_shelter: boolean; shelter_requested: boolean } | null>(null);
    const [applyLoading, setApplyLoading] = useState(false);

    const fetchData = async (tab: TabType) => {
        setIsLoading(true);
        setError(null);
        try {
            if (tab === 'shelter-status') {
                // Ambil status shelter dari profil user
                const res = await fetchApi('/auth/me');
                setShelterStatus({
                    is_verified_shelter: res.data?.is_verified_shelter ?? false,
                    shelter_requested: res.data?.shelter_requested ?? false,
                });
                setData([]);
            } else {
                let endpoint = '';
                switch (tab) {
                    case 'my-pets': endpoint = '/users/me/pets'; break;
                    case 'incoming-requests': endpoint = '/users/me/incoming'; break;
                    case 'my-requests': endpoint = '/users/me/requests'; break;
                    case 'my-donations': endpoint = '/users/me/donations'; break;
                    case 'my-campaigns': endpoint = '/users/me/campaigns'; break;
                }
                const res = await fetchApi(endpoint);
                setData(res.data || []);
            }
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

    const handleApplyShelter = async () => {
        if (!confirm('Ajukan akun kamu sebagai Shelter Resmi PawConnect? Tim kami akan meninjaunya.')) return;
        setApplyLoading(true);
        try {
            await fetchApi('/users/me/apply-shelter', { method: 'POST' });
            setShelterStatus(prev => prev ? { ...prev, shelter_requested: true } : null);
        } catch (err: any) {
            alert(err.message || 'Gagal mengirim pengajuan.');
        } finally {
            setApplyLoading(false);
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
                
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-900 text-white rounded-2xl">
                            <LayoutDashboard className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-teal-950 dark:text-white">Dashboard</h1>
                            <p className="text-teal-700/70 dark:text-teal-400">Kelola aktivitas adopsi dan donasi Anda.</p>
                        </div>
                    </div>
                    
                    {/* Tombol cepat untuk Verified User membuka donasi baru */}
                    <Link href="/donate/new" className="hidden md:flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition-colors">
                        <Megaphone className="w-5 h-5" /> Buka Penggalangan Dana
                    </Link>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-teal-950 p-2 rounded-2xl border border-teal-100 dark:border-teal-800 shadow-sm overflow-x-auto">
                    {[
                        { id: 'my-pets', label: 'Hewan Saya', icon: PawPrint },
                        { id: 'incoming-requests', label: 'Pengajuan Masuk', icon: MessageSquare },
                        { id: 'my-requests', label: 'Permintaan Saya', icon: ArrowRight },
                        { id: 'my-donations', label: 'Riwayat Donasi', icon: Heart },
                        { id: 'my-campaigns', label: 'Kampanye Saya', icon: Megaphone },
                        { id: 'shelter-status', label: 'Status Shelter', icon: ShieldCheck },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
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
                ) : activeTab === 'shelter-status' ? (
                    /* ─── SHELTER STATUS PANEL ─── */
                    <div className="bg-white dark:bg-teal-950 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm overflow-hidden">

                        {/* Header banner */}
                        <div className="bg-gradient-to-r from-teal-900 to-teal-800 p-8 text-white flex flex-col md:flex-row items-center gap-6">
                            <div className="p-4 bg-teal-700/50 rounded-2xl shrink-0">
                                {shelterStatus?.is_verified_shelter
                                    ? <ShieldCheck className="w-12 h-12 text-emerald-400" />
                                    : shelterStatus?.shelter_requested
                                        ? <Clock className="w-12 h-12 text-orange-400" />
                                        : <ShieldAlert className="w-12 h-12 text-slate-300" />}
                            </div>
                            <div>
                                <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-1">Status Verifikasi Shelter</p>
                                {shelterStatus?.is_verified_shelter ? (
                                    <h2 className="text-3xl font-extrabold text-emerald-400">✓ Terverifikasi Resmi</h2>
                                ) : shelterStatus?.shelter_requested ? (
                                    <h2 className="text-3xl font-extrabold text-orange-300">Menunggu Peninjauan Admin</h2>
                                ) : (
                                    <h2 className="text-3xl font-extrabold">Belum Terverifikasi</h2>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">

                            {/* Sudah verified */}
                            {shelterStatus?.is_verified_shelter && (
                                <div className="flex items-start gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                    <ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-emerald-800 text-lg">Akun Anda Sudah Menjadi Shelter Resmi! 🎉</h3>
                                        <p className="text-emerald-700/80 mt-1 text-sm">Anda kini bisa membuka penggalangan dana, memposting hewan untuk adopsi, dan menerima donasi langsung dari komunitas PawConnect.</p>
                                    </div>
                                </div>
                            )}

                            {/* Sedang menunggu */}
                            {!shelterStatus?.is_verified_shelter && shelterStatus?.shelter_requested && (
                                <div className="flex items-start gap-4 p-5 bg-orange-50 border border-orange-100 rounded-2xl">
                                    <Clock className="w-7 h-7 text-orange-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-orange-800 text-lg">Pengajuan Sedang Ditinjau</h3>
                                        <p className="text-orange-700/80 mt-1 text-sm">Tim PawConnect sedang memverifikasi pengajuan Anda. Proses ini biasanya memakan waktu 1–3 hari kerja. Kami akan menghubungi Anda melalui email jika ada informasi lebih lanjut.</p>
                                    </div>
                                </div>
                            )}

                            {/* Belum apply */}
                            {!shelterStatus?.is_verified_shelter && !shelterStatus?.shelter_requested && (
                                <>
                                    <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <ShieldAlert className="w-7 h-7 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-bold text-slate-700 text-lg">Akun Anda Belum Terverifikasi sebagai Shelter</h3>
                                            <p className="text-slate-500 mt-1 text-sm">Dengan menjadi Shelter Terverifikasi, Anda bisa membuka penggalangan dana resmi dan membangun kepercayaan donatur lebih cepat.</p>
                                        </div>
                                    </div>

                                    <div className="border border-dashed border-teal-200 rounded-2xl p-6">
                                        <h3 className="font-bold text-teal-900 text-lg mb-3">Syarat Pengajuan Verifikasi</h3>
                                        <ul className="space-y-2 text-sm text-teal-700">
                                            {['Akun sudah terdaftar & aktif di PawConnect', 'Memiliki alamat shelter yang dapat diverifikasi', 'Bersedia dihubungi oleh tim PawConnect untuk validasi'].map(s => (
                                                <li key={s} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{s}</li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={handleApplyShelter}
                                            disabled={applyLoading}
                                            className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-teal-900 text-white rounded-2xl font-bold text-lg hover:bg-teal-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                        >
                                            {applyLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                                            {applyLoading ? 'Mengirim Pengajuan...' : 'Ajukan Verifikasi Shelter Sekarang'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-teal-950 rounded-3xl border border-dashed border-teal-200 dark:border-teal-800">
                        <p className="text-teal-800/60 dark:text-teal-400 italic mb-4">Belum ada data di bagian ini.</p>
                        {/* Jika tab aktif adalah Kampanye Saya, tampilkan tombol buat di sini juga */}
                        {activeTab === 'my-campaigns' && (
                            <Link href="/donate/new" className="px-6 py-2 bg-teal-50 text-teal-700 font-bold rounded-lg hover:bg-teal-100 transition-colors border border-teal-200">
                                Mulai Kampanye Pertama Anda
                            </Link>
                        )}
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
                            <div key={donation.id} className="bg-white dark:bg-teal-950 p-6 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-1">
                                        Menyumbang ke: {donation.campaign_title || 'Donasi Umum Shelter'}
                                    </p>
                                    <p className="text-3xl font-black text-orange-500">
                                        Rp {Number(donation.amount || 0).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-sm text-teal-700/70 dark:text-teal-400 mt-1">
                                        {donation.created_at ? new Date(donation.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                    </p>
                                    {donation.message && (
                                        <p className="text-base text-teal-800 dark:text-teal-200 italic mt-3">
                                            &ldquo;{donation.message}&rdquo;
                                        </p>
                                    )}
                                </div>
                                <div className="shrink-0">
                                    <div className={`inline-block px-4 py-1.5 text-sm font-bold rounded-full ${
                                        donation.payment_status === 'Success'
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                                    }`}>
                                        {donation.payment_status === 'Success' ? 'Berhasil' : donation.payment_status || 'Pending'}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* MY CAMPAIGNS TAB (TAB BARU) */}
                        {activeTab === 'my-campaigns' && data.map((campaign) => {
                            const progress = Math.min(Math.round((campaign.collected_amount / campaign.target_amount) * 100), 100) || 0;
                            return (
                                <div key={campaign.id} className="bg-white dark:bg-teal-950 p-6 rounded-3xl border border-teal-100 dark:border-teal-800 shadow-sm flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative">
                                        <img src={campaign.image_url} alt={campaign.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-md bg-white/90 text-teal-900 shadow-sm">
                                            {campaign.is_verified ? 'Verified' : 'Pending'}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-teal-950 dark:text-white mb-3">{campaign.title}</h3>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-bold text-teal-900">Rp {(Number(campaign.collected_amount) || 0).toLocaleString('id-ID')} terkumpul</span>
                                                <span className="text-teal-600">dari Rp {(Number(campaign.target_amount) || 0).toLocaleString('id-ID')}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                <div 
                                                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-1000" 
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                                                <span>{campaign.donators_count || 0} Donatur</span>
                                                <span>Berakhir: {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString('id-ID') : '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col gap-2 justify-center">
                                        <Link href={`/donate/${campaign.id}`} className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-bold rounded-xl text-center hover:bg-teal-100 border border-teal-100">
                                            Lihat Halaman
                                        </Link>
                                        <button className="px-4 py-2 bg-white text-red-500 text-sm font-bold rounded-xl text-center hover:bg-red-50 border border-red-100">
                                            Hapus
                                        </button>
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