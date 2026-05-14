import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PetFilterProps {
  onSearchChange: (value: string) => void;
  onSpeciesChange: (species: string) => void;
  selectedSpecies: string;
}

export function PetFilter({ onSearchChange, onSpeciesChange, selectedSpecies }: PetFilterProps) {
  const speciesOptions = ['Semua', 'Kucing', 'Anjing', 'Lainnya'];

  return (
    <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 transition-all">
      <div className="flex-1 max-w-md">
        <Input 
          placeholder="Cari nama hewan atau lokasi..." 
          icon={<Search className="w-4 h-4" />}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-zinc-50 dark:bg-zinc-900 border-none"
        />
      </div>
      <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        {speciesOptions.map(species => (
          <Button
            key={species}
            variant={selectedSpecies === species ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onSpeciesChange(species)}
            className="whitespace-nowrap rounded-full font-semibold"
          >
            {species}
          </Button>
        ))}
      </div>
    </div>
  );
}
