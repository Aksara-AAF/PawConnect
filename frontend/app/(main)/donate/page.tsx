'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, CreditCard, Coffee, Gift, ArrowRight, Loader2 } from 'lucide-react';

const PRESET_AMOUNTS = [
  { value: 50000, label: 'Rp 50K', icon: Coffee, desc: 'Bisa memberi makan 2 kucing jalanan' },
  { value: 100000, label: 'Rp 100K', icon: Heart, desc: 'Vaksinasi untuk 1 hewan peliharaan' },
  { value: 250000, label: 'Rp 250K', icon: Gift, desc: 'Paket perawatan medis dasar' },
];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(Number(val));
    } else {
      setAmount(0);
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 10000) {
      alert('Minimal donasi adalah Rp 10.000');
      return;
    }
    
    setIsLoading(true);
    // TODO: Integrasi dengan API POST /api/donations (Daffa/Akbar)
    console.log('Data Donasi:', { amount, message });
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Terima kasih atas donasimu! (Ini masih simulasi)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <div className="relative bg-teal-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
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
            Bantu Mereka Mendapatkan <span className="text-orange-400">Kehidupan yang Lebih Baik</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
            100% donasi Anda akan disalurkan langsung ke shelter dan rescuer independen yang terverifikasi di jaringan PawConnect.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Form Donasi (Kiri) */}
          <div className="w-full lg:w-3/5 bg-white rounded-3xl shadow-xl border border-teal-50 p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-teal-950 mb-8">Pilih Nominal Donasi</h2>
            
            <form onSubmit={handleDonate} className="space-y-8">
              {/* Preset Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRESET_AMOUNTS.map((preset) => {
                  const isSelected = amount === preset.value && customAmount === '';
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handlePresetClick(preset.value)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50 shadow-md transform -translate-y-1' 
                          : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                      <span className={`text-lg font-bold ${isSelected ? 'text-orange-600' : 'text-slate-700'}`}>
                        {preset.label}
                      </span>
                      <span className="text-xs text-center mt-2 text-slate-500 leading-tight">
                        {preset.desc}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">Nominal Lainnya</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <span className="text-teal-900 font-bold">Rp</span>
                  </div>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Masukkan nominal..."
                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg font-bold text-teal-950"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full my-6"></div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">Pesan Dukungan (Opsional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan penyemangat untuk shelter dan hewan peliharaan..."
                  rows={4}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none text-teal-900"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || amount < 10000}
                className="w-full flex items-center justify-center gap-2 py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all focus:ring-4 focus:ring-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6 fill-white" />
                    Donasi Rp {amount.toLocaleString('id-ID')} Sekarang
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Trust & Transparansi (Kanan) */}
          <div className="w-full lg:w-2/5 space-y-6 mt-10 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-sm border border-teal-50 p-8">
              <h3 className="text-xl font-bold text-teal-950 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                Donasi Anda Aman
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900">Pembayaran Terverifikasi</h4>
                    <p className="text-sm text-teal-700/70 mt-1">Sistem pembayaran kami dienkripsi dan diproses oleh *payment gateway* resmi berstandar nasional.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900">100% Untuk Hewan</h4>
                    <p className="text-sm text-teal-700/70 mt-1">PawConnect tidak mengambil potongan administrasi dari donasi Anda. Sepenuhnya untuk shelter.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-teal-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-800 rounded-full opacity-50 blur-xl"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Ingin Mengadopsi Saja?</h3>
              <p className="text-teal-100 text-sm mb-6 relative z-10 leading-relaxed">
                Selain donasi dana, memberikan tempat tinggal yang hangat adalah donasi terbaik yang bisa Anda berikan.
              </p>
              <Link href="/pets" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-950 font-bold rounded-xl hover:bg-teal-50 transition-colors relative z-10 w-full justify-center">
                Lihat Katalog Hewan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}