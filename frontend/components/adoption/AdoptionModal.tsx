"use client";

import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
}

export function AdoptionModal({ isOpen, onClose, petName }: AdoptionModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Pengajuan adopsi untuk ${petName} berhasil dikirim! Silakan pantau dashboard Anda.`);
      onClose();
      setReason('');
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Ajukan Adopsi untuk ${petName}`}>
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 mb-6 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          Adopsi hewan adalah komitmen seumur hidup. Pastikan Anda siap secara finansial, waktu, dan mental sebelum mengirim pengajuan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">
            Mengapa Anda ingin mengadopsi {petName}? *
          </label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-500 transition-colors" 
            placeholder="Ceritakan tentang pengalaman Anda pelihara hewan, kondisi rumah, dan alasan memilih hewan ini..."
            required
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            Kirim Pengajuan
          </Button>
        </div>
      </form>
    </Modal>
  );
}
