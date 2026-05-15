"use client";

import React, { useState, useEffect } from 'react';
import { PawPrint, AlertCircle, Loader2, Plus } from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { Pet } from '../../lib/mockData'; // we still use the interface
import { PetCard } from '../../components/pets/PetCard';
import { PetFilter } from '../../components/pets/PetFilter';
import Link from 'next/link';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Semua');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (selectedSpecies !== 'Semua') {
          queryParams.append('species', selectedSpecies);
        }
        
        const res = await fetchApi(`/pets?${queryParams.toString()}`);
        setPets(res.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce or direct fetch
    const timeoutId = setTimeout(() => {
      loadPets();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedSpecies]);

  const filteredPets = pets.filter(pet => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return pet.name?.toLowerCase().includes(lowerQuery) || 
           pet.location?.toLowerCase().includes(lowerQuery);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-teal-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-teal-950 dark:text-white mb-4">
              Temukan Teman <span className="text-orange-500">Berbulu</span>
            </h1>
            <p className="text-teal-900 dark:text-white/90 max-w-2xl text-lg leading-relaxed">
              Setiap hewan berhak mendapatkan rumah yang hangat. Temukan sahabat sejatimu dari puluhan hewan yang menunggu untuk diadopsi.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white font-bold bg-orange-500 px-5 py-2.5 rounded-full shadow-md">
              <PawPrint className="w-5 h-5 animate-pulse" />
              <span>{filteredPets.length} hewan tersedia</span>
            </div>
            <Link href="/pets/new" className="flex items-center gap-2 text-white font-bold bg-teal-700 hover:bg-teal-800 px-5 py-2.5 rounded-full shadow-md transition-colors">
              <Plus className="w-5 h-5" />
              <span>Posting Hewan</span>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10 sticky top-[72px] z-40">
          <PetFilter 
            onSearchChange={setSearchQuery} 
            onSpeciesChange={setSelectedSpecies}
            selectedSpecies={selectedSpecies}
          />
        </div>

        {/* Results Info */}
        {!isLoading && !error && (
          <div className="mb-8">
            <p className="text-teal-800/80 dark:text-teal-400 font-medium">
              Menampilkan <span className="text-teal-950 dark:text-white font-bold">{filteredPets.length}</span> hewan peliharaan
            </p>
          </div>
        )}

        {/* Status & Pet Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
            <p className="text-teal-800 dark:text-teal-400 font-medium">Memuat data hewan...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-teal-950 dark:text-white mb-2">Gagal Memuat Data</h3>
            <p className="text-teal-800/80 dark:text-teal-400 max-w-md">{error}</p>
          </div>
        ) : filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-teal-950 rounded-3xl border border-dashed border-teal-200 dark:border-teal-800 shadow-sm">
            <div className="mx-auto w-20 h-20 bg-teal-50 dark:bg-teal-900 rounded-full flex items-center justify-center mb-6">
              <PawPrint className="w-10 h-10 text-teal-300" />
            </div>
            <h3 className="text-2xl font-bold text-teal-950 dark:text-white mb-3">Tidak ada hewan ditemukan</h3>
            <p className="text-teal-700/70 dark:text-teal-400 max-w-md mx-auto text-lg">
              Maaf, kami tidak dapat menemukan hewan yang cocok dengan filter pencarian Anda. Coba kata kunci yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
