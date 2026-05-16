"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Image as ImageIcon, CheckCircle2, Loader2, AlertCircle, Video } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { fetchApi } from '@/lib/api';

export function PetForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    gender: '',
    age: '',
    location: '',
    description: '',
    health_notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }
      if (videoFile) {
        data.append('video', videoFile);
      }

      await fetchApi('/pets', {
        method: 'POST',
        body: data,
      });

      alert("Hewan berhasil diposting!");
      router.push('/pets');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Gagal memposting hewan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Image & Video Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium leading-none text-teal-950 dark:text-teal-50">
            Foto Hewan Peliharaan *
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="dropzone-image" className="flex flex-col items-center justify-center w-full h-48 border-2 border-teal-300 dark:border-teal-800 border-dashed rounded-3xl cursor-pointer bg-slate-50 dark:bg-teal-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/80 transition-colors overflow-hidden relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium flex items-center gap-2"><Camera className="w-5 h-5"/> Ganti Foto</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 text-orange-500 mb-2" />
                  <p className="text-xs text-teal-600 dark:text-teal-500 font-medium text-center px-4">
                    <span className="font-semibold text-orange-600">Klik untuk unggah</span> foto
                  </p>
                </div>
              )}
              <input id="dropzone-image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!imagePreview} />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium leading-none text-teal-950 dark:text-teal-50">
            Video (Opsional - Akan play saat dihover)
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="dropzone-video" className="flex flex-col items-center justify-center w-full h-48 border-2 border-teal-300 dark:border-teal-800 border-dashed rounded-3xl cursor-pointer bg-slate-50 dark:bg-teal-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/80 transition-colors overflow-hidden relative group">
              {videoPreview ? (
                <>
                  <video src={videoPreview} className="w-full h-full object-cover" muted loop autoPlay />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium flex items-center gap-2"><Video className="w-5 h-5"/> Ganti Video</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Video className="w-8 h-8 text-teal-500 mb-2" />
                  <p className="text-xs text-teal-600 dark:text-teal-500 font-medium text-center px-4">
                    <span className="font-semibold text-teal-700 dark:text-teal-400">Klik untuk unggah</span> video
                  </p>
                  <p className="text-[10px] text-teal-400 mt-1">Maks. 10MB</p>
                </div>
              )}
              <input id="dropzone-video" type="file" className="hidden" accept="video/*" onChange={handleVideoChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nama Panggilan *" name="name" value={formData.name} onChange={handleChange} placeholder="Misal: Milo" required />
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Spesies *</label>
          <select 
            name="species" 
            value={formData.species} 
            onChange={handleChange}
            className="flex h-11 w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-white" 
            required
          >
            <option value="">Pilih Spesies</option>
            <option value="Kucing">Kucing</option>
            <option value="Anjing">Anjing</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Jenis Kelamin *</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            className="flex h-11 w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-white" 
            required
          >
            <option value="">Pilih Gender</option>
            <option value="Jantan">Jantan</option>
            <option value="Betina">Betina</option>
          </select>
        </div>
        <Input label="Usia / Umur" name="age" value={formData.age} onChange={handleChange} placeholder="Misal: 6 Bulan / 2 Tahun" />
        
        <Input 
          className="md:col-span-2" 
          label="Lokasi Peliharaan *" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          placeholder="Kota, Kecamatan (Misal: Jakarta Selatan, Tebet)" 
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Deskripsi *</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="flex min-h-[120px] w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm placeholder:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-white dark:placeholder:text-teal-600 transition-colors" 
          placeholder="Ceritakan kepribadian hewan, bagaimana dia diselamatkan, dll."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Catatan Kesehatan</label>
        <textarea 
          name="health_notes"
          value={formData.health_notes}
          onChange={handleChange}
          className="flex min-h-[80px] w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm placeholder:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-white dark:placeholder:text-teal-600 transition-colors" 
          placeholder="Riwayat vaksin, alergi, atau kondisi khusus (opsional)"
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" size="lg" className="w-full sm:w-auto shadow-md" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Sedang Memposting...' : 'Posting Hewan'}
        </Button>
      </div>
    </form>
  );
}
