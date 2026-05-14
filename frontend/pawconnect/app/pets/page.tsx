"use client";

import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';
import { mockPets } from '../../lib/mockData';
import { PetCard } from '../../components/pets/PetCard';
import { PetFilter } from '../../components/pets/PetFilter';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Semua');

  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = selectedSpecies === 'Semua' || pet.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
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
            <p className="text-teal-800/80 dark:text-teal-400 max-w-2xl text-lg leading-relaxed">
              Setiap hewan berhak mendapatkan rumah yang hangat. Temukan sahabat sejatimu dari puluhan hewan yang menunggu untuk diadopsi.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white font-bold bg-orange-500 px-5 py-2.5 rounded-full shadow-md hover:bg-orange-600 transition-colors">
            <PawPrint className="w-5 h-5 animate-pulse" />
            <span>{filteredPets.length} hewan tersedia</span>
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

        {/* Grid Section */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
