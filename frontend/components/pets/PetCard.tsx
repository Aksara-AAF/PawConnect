import React from 'react';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Pet } from '../../lib/mockData';

export function PetCard({ pet }: { pet: Pet }) {
  const getGenderColor = (gender: string) => {
    return gender === 'Jantan' ? 'info' : 'warning';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Tersedia') return 'success';
    if (status === 'Diproses') return 'warning';
    return 'default';
  };

  return (
    <Link href={`/pets/${pet.id}`}>
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border-transparent hover:border-amber-200 dark:hover:border-amber-900/50">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={pet.image_url} 
            alt={`Foto ${pet.name}`}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <Badge variant={getStatusColor(pet.status)} className="shadow-sm backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-none">
              {pet.status}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-5 flex-1 flex flex-col relative z-20 bg-white dark:bg-zinc-950">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-amber-500 transition-colors">{pet.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{pet.species} • {pet.age}</p>
            </div>
            <Badge variant={getGenderColor(pet.gender)}>{pet.gender}</Badge>
          </div>
          
          <div className="mt-auto pt-4 space-y-2.5">
            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
              {pet.location}
            </div>
            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              <Clock className="w-4 h-4 mr-2 text-zinc-400" />
              Diunggah oleh {pet.uploader_name}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
