'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Camera, Target, Calendar, 
  FileText, Loader2, CheckCircle2,
  ShieldAlert, ShieldCheck, Clock, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function CreateCampaignPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Guard: status verifikasi shelter
  const [shelterStatus, setShelterStatus] = useState<{
    is_verified_shelter: boolean;
    shelter_requested: boolean;
  } | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  
  useEffect(() => {
    fetchApi('/auth/me')
      .then(res => setShelterStatus({
        is_verified_shelter: res.data?.is_verified_shelter ?? false,
        shelter_requested: res.data?.shelter_requested ?? false,
      }))
      .catch(() => setShelterStatus({ is_verified_shelter: false, shelter_requested: false }))
      .finally(() => setCheckingStatus(false));
  }, []);

  // State Form
  const [formData, setFormData] = useState({
    title: '',
    target_amount: '',
    description: '',
    end_date: '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // WAJIB PAKAI FormData karena ada file gambar
      const data = new FormData();
      data.append('title', formData.title);
      data.append('target_amount', formData.target_amount);
      data.append('description', formData.description);
      data.append('end_date', formData.end_date);
      if (imageFile) {
        data.append('campaign_image', imageFile);
      }

      await fetchApi('/campaigns', {
        method: 'POST',
        body: data,
      });

      alert('Kampanye donasi berhasil diajukan! Menunggu verifikasi admin.');
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.message || 'Gagal membuat kampanye. Pastikan semua data terisi dengan lengkap.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <Link href="/donate" className="inline-flex items-center text-teal-700 hover:text-teal-900 font-semibold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Katalog Donasi
        </Link>

        {/* === GATE: Sedang memeriksa status === */}
        {checkingStatus ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
            <p className="text-teal-800 font-medium">Memeriksa status akun...</p>
          </div>

        /* === GATE: Sudah apply tapi menunggu verifikasi === */
        ) : !shelterStatus?.is_verified_shelter && shelterStatus?.shelter_requested ? (
          <div className="bg-white rounded-3xl shadow-xl border border-teal-50 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white flex items-center gap-5">
              <div className="p-3 bg-white/20 rounded-2xl shrink-0"><Clock className="w-10 h-10" /></div>
              <div>
                <h1 className="text-2xl font-extrabold">Pengajuan Sedang Ditinjau</h1>
                <p className="text-orange-100 mt-1 text-sm">Tim PawConnect sedang memverifikasi akun Anda</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-teal-800 leading-relaxed">
                Pengajuan verifikasi shelter Anda <span className="font-bold">sedang dalam antrian peninjauan admin</span>. Proses ini biasanya memakan waktu <strong>1–3 hari kerja</strong>.
                Setelah disetujui, Anda dapat membuka penggalangan dana di sini.
              </p>
              <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-teal-900 text-white font-bold rounded-xl hover:bg-teal-800 transition-colors">
                Pantau Status di Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        /* === GATE: Belum apply sama sekali === */
        ) : !shelterStatus?.is_verified_shelter ? (
          <div className="bg-white rounded-3xl shadow-xl border border-teal-50 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-900 to-teal-800 p-8 text-white flex items-center gap-5">
              <div className="p-3 bg-white/10 rounded-2xl shrink-0"><ShieldAlert className="w-10 h-10 text-slate-300" /></div>
              <div>
                <h1 className="text-2xl font-extrabold">Akses Dibatasi</h1>
                <p className="text-teal-300 mt-1 text-sm">Hanya shelter terverifikasi yang dapat membuka penggalangan dana</p>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                <ShieldCheck className="w-7 h-7 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-teal-900 text-lg">Kenapa Perlu Verifikasi?</h3>
                  <p className="text-slate-600 mt-1 text-sm leading-relaxed">
                    Sistem verifikasi shelter memastikan bahwa semua penggalangan dana di PawConnect dilakukan oleh organisasi atau individu yang <strong>terpercaya dan bertanggung jawab</strong>. Ini melindungi kepercayaan donatur.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-teal-900 mb-3">Cara mendapatkan akses:</h3>
                <ol className="space-y-3">
                  {[
                    'Buka Dashboard Anda',
                    'Pilih tab "Status Shelter"',
                    'Klik "Ajukan Verifikasi Shelter Sekarang"',
                    'Tunggu konfirmasi dari tim PawConnect (1–3 hari kerja)',
                  ].map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-teal-800">
                      <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0 text-xs">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors text-lg shadow-lg">
                <ShieldCheck className="w-5 h-5" /> Ajukan Verifikasi Sekarang
              </Link>
            </div>
          </div>

        /* === FORM: Hanya muncul jika sudah terverifikasi === */
        ) : (

        <div className="bg-white rounded-3xl shadow-xl border border-teal-50 overflow-hidden">
          {/* Header */}
          <div className="bg-teal-900 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-400" /> Buka Penggalangan Dana
            </h1>
            <p className="text-teal-100/80 mt-2">
              Berikan informasi yang jujur dan transparan untuk membantu hewan peliharaan mendapatkan bantuan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* 1. Upload Cover Image */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-teal-950 uppercase tracking-wider">Foto Kampanye</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative h-64 w-full rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/30 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all overflow-hidden ${previewUrl ? 'border-none' : ''}`}
              >
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <Camera className="w-12 h-12 text-teal-300 mx-auto mb-3" />
                    <p className="text-teal-800 font-semibold">Klik untuk unggah foto</p>
                    <p className="text-teal-600/60 text-xs mt-1">Gunakan gambar yang jelas dan menyentuh hati</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
            </div>

            {/* 2. Campaign Title */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" /> Judul Kampanye
              </label>
              <input 
                type="text" name="title" required
                value={formData.title} onChange={handleChange}
                placeholder="Contoh: Bantuan Operasi Kaki Anjing Beagle"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3. Target Amount */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" /> Target Dana (Rp)
                </label>
                <input 
                  type="number" name="target_amount" required
                  value={formData.target_amount} onChange={handleChange}
                  placeholder="Minimal 100.000"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold"
                />
              </div>

              {/* 4. End Date */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" /> Batas Waktu
                </label>
                <input 
                  type="date" name="end_date" required
                  value={formData.end_date} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* 5. Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-teal-950 uppercase tracking-wider">Ceritakan Kisah Mereka</label>
              <textarea 
                name="description" required rows={6}
                value={formData.description} onChange={handleChange}
                placeholder="Jelaskan detail kondisi hewan, rincian biaya yang dibutuhkan, dan kenapa donatur harus membantu..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" disabled={isLoading}
                className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Sedang Mengirim...</>
                ) : (
                  <><CheckCircle2 className="w-6 h-6" /> Ajukan Penggalangan Dana</>
                )}
              </button>
              <p className="text-center text-xs text-teal-700/60 mt-4">
                Dengan menekan tombol di atas, Anda menyatakan bahwa informasi yang diberikan adalah benar dan bersedia mempertanggungjawabkan dana yang terkumpul.
              </p>
            </div>

          </form>
        </div>

        )} {/* end verified ternary */}
      </div>
    </div>
  );
}
