'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Camera, Target, Calendar, 
  FileText, Layout, Loader2, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function CreateCampaignPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

      // Kirim ke API Backend (Tugas Akbar membuat endpoint ini)
      // await fetchApi('/campaigns', {
      //   method: 'POST',
      //   body: data, // fetchApi harus handle body non-JSON jika dikirim FormData
      // });

      alert('Kampanye donasi berhasil diajukan! Menunggu verifikasi admin.');
      router.push('/donate');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat kampanye. Pastikan data lengkap.');
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

        <div className="bg-white rounded-3xl shadow-xl border border-teal-50 overflow-hidden">
          {/* Header */}
          <div className="bg-teal-900 p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Layout className="w-8 h-8 text-orange-400" /> Buka Penggalangan Dana
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
      </div>
    </div>
  );
}
