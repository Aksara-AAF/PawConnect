"use client";

import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { fetchApi } from '../../lib/api';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  petId: string;
}

export function AdoptionModal({ isOpen, onClose, petName, petId }: AdoptionModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await fetchApi('/adoptions', {
        method: 'POST',
        body: JSON.stringify({
          pet_id: petId,
          application_reason: reason
        })
      });

      alert(`Pengajuan adopsi untuk ${petName} berhasil dikirim! Silakan pantau dashboard Anda.`);
      setReason('');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Ajukan Adopsi untuk ${petName}`}>
      <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl p-4 mb-6 flex gap-3 text-orange-800 dark:text-orange-200 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          Adopsi hewan adalah komitmen seumur hidup. Pastikan Anda siap secara finansial, waktu, dan mental sebelum mengirim pengajuan.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 mb-6 text-red-800 dark:text-red-200 text-sm">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-teal-950 dark:text-teal-50">
            Mengapa Anda ingin mengadopsi {petName}? *
          </label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex min-h-[120px] w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-sm placeholder:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-teal-800 dark:bg-teal-950 dark:text-white dark:placeholder:text-teal-500 transition-colors" 
            placeholder="Ceritakan tentang pengalaman Anda pelihara hewan, kondisi rumah, dan alasan memilih hewan ini..."
            required
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-teal-100 dark:border-teal-800">
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
