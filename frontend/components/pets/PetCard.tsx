"use client";
import React from 'react';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Pet } from '../../lib/mockData';

export function PetCard({ pet }: { pet: Pet }) {
  const [isHovered, setIsHovered] = React.useState(false);

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
      <Card 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border-transparent hover:border-orange-200 dark:hover:border-orange-900/50 animate-slide-up"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-teal-50 dark:bg-teal-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={pet.image_url} 
            alt={`Foto ${pet.name}`}
            className={`object-cover w-full h-full group-hover:scale-110 transition-all duration-500 ease-out ${isHovered && pet.video_url ? 'opacity-0' : 'opacity-100'}`}
          />
          
          {pet.video_url && isHovered && (
            <video 
              src={pet.video_url} 
              className="absolute inset-0 w-full h-full object-cover z-0 animate-fade-in"
              autoPlay 
              muted 
              loop 
              playsInline
            />
          )}

          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <Badge variant={getStatusColor(pet.status)} className="shadow-sm backdrop-blur-md bg-white/90 dark:bg-teal-950/90 border-none">
              {pet.status}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-5 pt-7 flex-1 flex flex-col relative z-20 bg-white dark:bg-teal-950">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-teal-950 dark:text-teal-50 mb-1 group-hover:text-orange-500 transition-colors">{pet.name}</h3>
              <p className="text-sm text-teal-700/70 dark:text-teal-400 font-medium">{pet.species} • {pet.age}</p>
            </div>
            <Badge variant={getGenderColor(pet.gender)}>{pet.gender}</Badge>
          </div>
          
          <div className="mt-auto pt-4 space-y-2.5">
            <div className="flex items-center text-sm text-teal-800/80 dark:text-teal-400 font-medium">
              <MapPin className="w-4 h-4 mr-2 text-teal-500" />
              {pet.location}
            </div>
            <div className="flex items-center text-sm text-teal-800/80 dark:text-teal-400 font-medium">
              <Clock className="w-4 h-4 mr-2 text-teal-500" />
              Diunggah oleh {pet.uploader_name}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
