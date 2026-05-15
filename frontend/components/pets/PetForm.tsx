"use client";

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function PetForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the API
    alert("Simulasi form disubmit! Data akan dikirim ke backend.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none text-teal-950 dark:text-teal-50">
          Foto Hewan Peliharaan *
        </label>
        
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-300 dark:border-teal-800 border-dashed rounded-3xl cursor-pointer bg-slate-50 dark:bg-teal-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/80 transition-colors overflow-hidden relative group">
            {imagePreview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium flex items-center gap-2"><Camera className="w-5 h-5"/> Ganti Foto</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-16 h-16 bg-white dark:bg-teal-950 rounded-full flex items-center justify-center mb-4 shadow-sm border border-teal-100 dark:border-teal-800">
                  <ImageIcon className="w-8 h-8 text-orange-500" />
                </div>
                <p className="mb-2 text-sm text-teal-800/80 dark:text-teal-400 font-medium">
                  <span className="font-semibold text-orange-600 dark:text-orange-500">Klik untuk unggah</span> atau seret dan lepas
                </p>
                <p className="text-xs text-teal-600 dark:text-teal-500">SVG, PNG, JPG atau GIF (Maks. 5MB)</p>
              </div>
            )}
            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nama Panggilan *" placeholder="Misal: Milo" required />
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Spesies *</label>
          <select className="flex h-11 w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300" required>
            <option value="">Pilih Spesies</option>
            <option value="Kucing">Kucing</option>
            <option value="Anjing">Anjing</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Jenis Kelamin *</label>
          <select className="flex h-11 w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300" required>
            <option value="">Pilih Gender</option>
            <option value="Jantan">Jantan</option>
            <option value="Betina">Betina</option>
          </select>
        </div>
        <Input label="Usia / Umur" placeholder="Misal: 6 Bulan / 2 Tahun" />
        
        <Input className="md:col-span-2" label="Lokasi Peliharaan *" placeholder="Kota, Kecamatan (Misal: Jakarta Selatan, Tebet)" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Deskripsi *</label>
        <textarea 
          className="flex min-h-[120px] w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm placeholder:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:placeholder:text-teal-600 transition-colors" 
          placeholder="Ceritakan kepribadian hewan, bagaimana dia diselamatkan, dll."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-teal-900 dark:text-teal-300">Catatan Kesehatan</label>
        <textarea 
          className="flex min-h-[80px] w-full rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm placeholder:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:placeholder:text-teal-600 transition-colors" 
          placeholder="Riwayat vaksin, alergi, atau kondisi khusus (opsional)"
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" size="lg" className="w-full sm:w-auto shadow-md">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Posting Hewan
        </Button>
      </div>
    </form>
  );
}
