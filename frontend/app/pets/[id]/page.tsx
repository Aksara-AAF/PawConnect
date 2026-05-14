"use client";

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Info, ShieldCheck, HeartPulse, ArrowLeft } from 'lucide-react';
import { mockPets } from '../../../lib/mockData';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { AdoptionModal } from '../../../components/adoption/AdoptionModal';
import Link from 'next/link';

export default function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pet = mockPets.find(p => p.id === resolvedParams.id);

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <h2 className="text-2xl font-bold mb-4">Hewan tidak ditemukan</h2>
        <Button onClick={() => router.push('/pets')}>Kembali ke Katalog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Image Header */}
      <div className="w-full h-[50vh] relative bg-zinc-900">
        <div className="absolute top-6 left-6 z-20">
          <Link href="/pets">
            <Button variant="secondary" size="sm" className="rounded-full backdrop-blur-md bg-black/30 hover:bg-black/50 border border-white/10 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={pet.image_url} 
          alt={pet.name} 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/20 to-transparent dark:from-zinc-950 dark:via-zinc-950/20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="success" className="text-sm px-3 py-1">{pet.status}</Badge>
                <Badge variant={pet.gender === 'Jantan' ? 'info' : 'warning'} className="text-sm px-3 py-1">{pet.gender}</Badge>
                <span className="text-zinc-500 font-medium">• {pet.species}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6">
                {pet.name}
              </h1>

              <div className="flex flex-wrap gap-6 text-zinc-600 dark:text-zinc-400 font-medium pb-8 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-zinc-400" />
                  {pet.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-zinc-400" />
                  Usia {pet.age}
                </div>
              </div>

              <div className="pt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold flex items-center mb-3">
                    <Info className="w-5 h-5 mr-2 text-amber-500" />
                    Tentang {pet.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {pet.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold flex items-center mb-3">
                    <HeartPulse className="w-5 h-5 mr-2 text-rose-500" />
                    Catatan Kesehatan
                  </h3>
                  <div className="bg-rose-50 dark:bg-rose-500/10 rounded-2xl p-5 border border-rose-100 dark:border-rose-500/20">
                    <p className="text-rose-900 dark:text-rose-200 font-medium">
                      {pet.health_notes || "Tidak ada catatan kesehatan khusus."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-24">
              <h3 className="text-xl font-bold mb-2">Tertarik mengadopsi?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Bantu {pet.name} mendapatkan kasih sayang yang layak. Pengajuan Anda akan direview oleh uploader.
              </p>
              
              <Button 
                size="lg" 
                className="w-full text-base mb-6 shadow-md"
                onClick={() => setIsModalOpen(true)}
              >
                Ajukan Adopsi
              </Button>
              
              <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Diunggah oleh</p>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">{pet.uploader_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <AdoptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        petName={pet.name} 
      />
    </div>
  );
}
