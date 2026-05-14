import React from 'react';
import { PetForm } from '../../../components/pets/PetForm';
import { PawPrint } from 'lucide-react';

export default function NewPetPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 mb-6 shadow-sm">
            <PawPrint className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Posting Hewan Baru
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Bantu hewan terlantar menemukan rumah yang layak. Pastikan informasi yang Anda masukkan jujur dan akurat.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800 p-6 md:p-10">
          <PetForm />
        </div>
      </div>
    </div>
  );
}
