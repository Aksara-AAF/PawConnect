'use client';

import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    CheckCircle,
    XCircle,
    Loader2,
    AlertCircle,
    Target,
    FileText,
    UserCheck,
    Building2,
    Phone
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'shelters'>('campaigns');
    const [pendingCampaigns, setPendingCampaigns] = useState<any[]>([]);
    const [pendingShelters, setPendingShelters] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const fetchAllData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [campaignsRes, sheltersRes] = await Promise.all([
                fetchApi('/admin/campaigns/pending'),
                fetchApi('/admin/shelters/pending'),
            ]);
            setPendingCampaigns(campaignsRes.data || []);
            setPendingShelters(sheltersRes.data || []);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data. Pastikan kamu login sebagai admin.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchAllData(); }, []);

    const handleVerifyCampaign = async (id: string) => {
        if (!confirm('Setujui pengajuan kampanye ini?')) return;
        setProcessingId(id);
        try {
            await fetchApi(`/admin/campaigns/${id}/verify`, { method: 'PATCH' });
            setPendingCampaigns(prev => prev.filter(c => c.id !== id));
        } catch (err: any) {
            alert(err.message || 'Gagal memverifikasi kampanye.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleRejectCampaign = async (id: string) => {
        if (!confirm('Tolak dan hapus pengajuan kampanye ini?')) return;
        setProcessingId(id);
        try {
            await fetchApi(`/admin/campaigns/${id}`, { method: 'DELETE' });
            setPendingCampaigns(prev => prev.filter(c => c.id !== id));
        } catch (err: any) {
            alert(err.message || 'Gagal menolak kampanye.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleVerifyShelter = async (id: string) => {
        if (!confirm('Verifikasi akun ini sebagai Shelter Resmi PawConnect?')) return;
        setProcessingId(id);
        try {
            await fetchApi(`/admin/shelters/${id}/verify`, { method: 'PATCH' });
            setPendingShelters(prev => prev.filter(s => s.id !== id));
        } catch (err: any) {
            alert(err.message || 'Gagal memverifikasi shelter.');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Admin */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-teal-950 p-8 rounded-3xl text-white shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-800 rounded-2xl">
                            <ShieldCheck className="w-10 h-10 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold">Panel Utama Admin</h1>
                            <p className="text-teal-200 mt-1">Sistem kendali verifikasi massal PawConnect.</p>
                        </div>
                    </div>
                </div>

                {/* NAVIGATION TAB CONTROLLER */}
                <div className="flex border-b border-slate-200 mb-8 gap-4">
                    <button
                        onClick={() => setActiveTab('campaigns')}
                        className={`pb-4 px-4 font-bold text-lg transition-all border-b-4 ${activeTab === 'campaigns'
                            ? 'border-orange-500 text-teal-950'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Kampanye Pending ({pendingCampaigns.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('shelters')}
                        className={`pb-4 px-4 font-bold text-lg transition-all border-b-4 ${activeTab === 'shelters'
                            ? 'border-orange-500 text-teal-950'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Pengajuan Shelter ({pendingShelters.length})
                    </button>
                </div>

                {/* LOADING / ERROR STATE */}
                {isLoading ? (
                    <div className="flex justify-center py-32"><Loader2 className="w-12 h-12 text-orange-500 animate-spin" /></div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-teal-100">
                        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                        <h3 className="text-xl font-bold text-teal-950 mb-2">Akses Ditolak / Error</h3>
                        <p className="text-slate-600 max-w-sm">{error}</p>
                    </div>
                ) : (
                    <div>
                        {/* TAB 1: VERIFIKASI KAMPANYE */}
                        {activeTab === 'campaigns' && (
                            <div className="space-y-6">
                                {pendingCampaigns.length === 0 ? (
                                    <p className="text-center italic py-12 text-slate-400">Tidak ada antrean kampanye.</p>
                                ) : (
                                    pendingCampaigns.map((campaign) => (
                                        <div key={campaign.id} className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm flex flex-col lg:flex-row gap-8">
                                            <div className="w-full lg:w-72 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                                                <img src={campaign.image_url} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs font-bold text-teal-600 uppercase">Oleh: {campaign.organizer}</span>
                                                <h2 className="text-xl font-bold text-teal-950 mt-1">{campaign.title}</h2>
                                                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl mt-2">"{campaign.description}"</p>
                                            </div>
                                            <div className="flex flex-col justify-center gap-2 lg:w-44 shrink-0">
                                                <button
                                                    onClick={() => handleVerifyCampaign(campaign.id)}
                                                    disabled={processingId === campaign.id}
                                                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all text-sm disabled:opacity-50"
                                                >
                                                    {processingId === campaign.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() => handleRejectCampaign(campaign.id)}
                                                    disabled={processingId === campaign.id}
                                                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white text-red-500 border border-red-200 rounded-xl font-bold hover:bg-red-50 transition-all text-sm disabled:opacity-50"
                                                >
                                                    {processingId === campaign.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                                    Tolak
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* TAB 2: VERIFIKASI AKUN SHELTER */}
                        {activeTab === 'shelters' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pendingShelters.length === 0 ? (
                                    <p className="text-center italic py-12 text-slate-400 col-span-2">Tidak ada pengajuan akun shelter baru.</p>
                                ) : (
                                    pendingShelters.map((shelter) => (
                                        <div key={shelter.id} className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm flex flex-col justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-orange-50 rounded-2xl shrink-0">
                                                    <Building2 className="w-8 h-8 text-orange-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-teal-950 leading-snug">{shelter.name}</h3>
                                                    <p className="text-sm text-slate-500 mt-0.5">{shelter.email}</p>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 bg-slate-50 px-2.5 py-1 rounded-md w-fit">
                                                        <Phone className="w-3.5 h-3.5 text-teal-600" /> {shelter.phone}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-100 pt-4 flex gap-3 mt-2">
                                                <button
                                                    onClick={() => handleVerifyShelter(shelter.id)}
                                                    disabled={processingId === shelter.id}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 text-sm transition-all"
                                                >
                                                    <UserCheck className="w-4 h-4" /> Verifikasi Shelter
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}   