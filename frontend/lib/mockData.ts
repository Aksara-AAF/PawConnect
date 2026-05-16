export interface Pet {
  id: string;
  name: string;
  species: 'Kucing' | 'Anjing' | 'Lainnya';
  gender: 'Jantan' | 'Betina';
  age: string;
  location: string;
  description: string;
  health_notes: string;
  image_url: string;
  video_url?: string;
  status: 'Tersedia' | 'Diproses' | 'Diadopsi';
  uploader_name: string;
  created_at: string;
}

export const mockPets: Pet[] = [
  {
    id: "1",
    name: "Milo",
    species: "Kucing",
    gender: "Jantan",
    age: "1 Tahun",
    location: "Jakarta Selatan",
    description: "Milo adalah kucing oren yang sangat aktif dan suka bermain. Ditemukan di sekitar pasar minggu dan sekarang sedang mencari keluarga baru.",
    health_notes: "Sudah divaksin tahap 1, sehat, bebas kutu.",
    image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
    status: "Tersedia",
    uploader_name: "Budi Santoso",
    created_at: "2026-05-10T08:00:00Z"
  },
  {
    id: "2",
    name: "Bella",
    species: "Anjing",
    gender: "Betina",
    age: "2 Tahun",
    location: "Bandung",
    description: "Bella sangat ramah dengan anak-anak. Dia anjing ras campuran yang diselamatkan dari penampungan liar.",
    health_notes: "Sudah steril dan vaksin lengkap.",
    image_url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
    status: "Tersedia",
    uploader_name: "Siti Aminah",
    created_at: "2026-05-12T10:30:00Z"
  },
  {
    id: "3",
    name: "Luna",
    species: "Kucing",
    gender: "Betina",
    age: "6 Bulan",
    location: "Surabaya",
    description: "Luna agak pemalu di awal, tapi sangat manja kalau sudah kenal. Bulunya sangat halus.",
    health_notes: "Sehat, perlu vaksin rabies bulan depan.",
    image_url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop",
    status: "Diproses",
    uploader_name: "Shelter Harapan",
    created_at: "2026-05-13T14:15:00Z"
  },
  {
    id: "4",
    name: "Max",
    species: "Anjing",
    gender: "Jantan",
    age: "3 Bulan",
    location: "Jakarta Barat",
    description: "Puppy golden retriever mix. Sangat energik dan butuh ruang bermain yang luas.",
    health_notes: "Baru lahir 3 bulan lalu, belum steril.",
    image_url: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=800&auto=format&fit=crop",
    status: "Tersedia",
    uploader_name: "Andi Wijaya",
    created_at: "2026-05-14T09:00:00Z"
  }
];
