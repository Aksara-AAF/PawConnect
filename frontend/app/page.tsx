import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getTopPets() {
  try {
    const res = await fetch(`${API_URL}/pets`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).slice(0, 4);
  } catch {
    return [];
  }
}

export default async function Home() {
  const topPets = await getTopPets();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">

      {/* NAVBAR */}
      <div className="flex-none z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 overflow-y-auto snap-y snap-mandatory relative scroll-smooth bg-slate-50">

        {/* 1. HERO SECTION */}
        <section className="snap-start snap-always shrink-0 relative flex flex-col justify-center w-full h-full overflow-hidden bg-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center gap-12 py-12 lg:flex-row">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold rounded-full text-teal-800 bg-teal-50 border border-teal-100 shadow-sm">
                  🐾 Platform Adopsi & Donasi Terpercaya
                </div>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-teal-950">
                  Temukan Sahabat Baru, <br />
                  <span className="text-orange-500">Ubah Kehidupan Mereka.</span>
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg sm:text-xl text-teal-800/80 lg:mx-0">
                  Ribuan hewan peliharaan yang menggemaskan sedang menunggu keluarga yang penuh kasih. Buka hatimu untuk adopsi atau bantu shelter lokal melalui donasi langsung.
                </p>
                <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row lg:justify-start">
                  <Link href="/pets" className="px-8 py-4 text-lg font-bold text-white transition-all shadow-lg rounded-full bg-orange-500 hover:bg-orange-600 hover:-translate-y-1">
                    Mulai Adopsi
                  </Link>
                  <Link href="/donate" className="px-8 py-4 text-lg font-bold transition-all bg-white border-2 rounded-full text-teal-700 border-teal-200 hover:border-teal-600 hover:bg-teal-50">
                    Donasi Shelter
                  </Link>
                </div>
              </div>

              <div className="relative flex-1 w-full max-w-lg lg:max-w-none h-[350px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 transition-transform hover:rotate-0 duration-500">
                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Anjing beagle lucu" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
          {/* Ornamen latar belakang */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
        </section>

        {/* 2. QUICK SEARCH CATEGORIES */}
        <section className="snap-start snap-always shrink-0 relative flex flex-col justify-center w-full h-full bg-teal-900 pb-16">
          <div className="px-4 py-10 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Cari Sahabat Baru Anda</h2>
            <p className="mt-3 text-lg text-teal-100/90">Telusuri hewan peliharaan dari jaringan shelter dan rescuer kami.</p>
          </div>
          <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-6">
              <Link href="/pets?species=Anjing" className="flex flex-col items-center justify-center p-6 transition-all bg-white shadow-lg sm:p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-2 group border border-teal-800">
                <div className="p-4 transition-colors rounded-full bg-teal-50 text-teal-700 group-hover:bg-orange-100 group-hover:text-orange-600">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="mt-4 font-bold text-teal-950 sm:text-lg">Anjing</span>
              </Link>
              <Link href="/pets?species=Kucing" className="flex flex-col items-center justify-center p-6 transition-all bg-white shadow-lg sm:p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-2 group border border-teal-800">
                <div className="p-4 transition-colors rounded-full bg-teal-50 text-teal-700 group-hover:bg-orange-100 group-hover:text-orange-600">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="mt-4 font-bold text-teal-950 sm:text-lg">Kucing</span>
              </Link>
              <Link href="/pets?species=Lainnya" className="flex flex-col items-center justify-center p-6 transition-all bg-white shadow-lg sm:p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-2 group border border-teal-800">
                <div className="p-4 transition-colors rounded-full bg-teal-50 text-teal-700 group-hover:bg-orange-100 group-hover:text-orange-600">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" /></svg>
                </div>
                <span className="mt-4 font-bold text-teal-950 sm:text-lg">Hewan Lainnya</span>
              </Link>
              <Link href="/donate" className="flex flex-col items-center justify-center p-6 transition-all bg-white shadow-lg sm:p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-2 group border border-teal-800">
                <div className="p-4 transition-colors rounded-full bg-teal-50 text-teal-700 group-hover:bg-orange-100 group-hover:text-orange-600">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span className="mt-4 font-bold text-center text-teal-950 sm:text-lg"> Donasi </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. PREVIEW KATALOG */}
        <section className="snap-start snap-always shrink-0 relative flex flex-col justify-center w-full h-full bg-slate-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-teal-950 sm:text-4xl">Sahabat Menunggu Anda</h2>
                <p className="mt-2 text-lg text-teal-700/80">Beberapa hewan peliharaan yang baru saja ditambahkan ke katalog.</p>
              </div>
              <Link href="/pets" className="hidden lg:inline-flex items-center font-bold text-orange-500 hover:text-orange-600 transition-colors">
                Lihat Semua <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {topPets.length > 0 ? topPets.map((pet: any, index: number) => (
                <Link key={pet.id} href={`/pets/${pet.id}`} className={`${index >= 2 ? 'hidden lg:block' : ''} group bg-white rounded-2xl overflow-hidden shadow-md border border-teal-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer`}>
                  <div className="h-40 sm:h-48 overflow-hidden relative bg-teal-900">
                    <img src={pet.image_url} alt={pet.name || pet.species} className="absolute inset-0 w-full h-full object-cover z-10" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-800 z-20">{pet.species}</div>
                  </div>
                  <div className="p-4 sm:p-5 relative z-20 bg-white border-t border-teal-50">
                    <h3 className="text-xl font-bold text-teal-950 group-hover:text-orange-500 transition-colors">{pet.name}</h3>
                    <p className="text-teal-700/70 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {pet.location}
                    </p>
                  </div>
                </Link>
              )) : (
                <div className="col-span-2 lg:col-span-4 text-center py-12 text-teal-700/60 bg-white rounded-2xl border border-dashed border-teal-200">
                  Belum ada hewan tersedia saat ini.
                </div>
              )}
            </div>

            <div className="mt-8 text-center lg:hidden">
              <Link href="/pets" className="inline-block px-6 py-3 font-bold text-orange-500 bg-orange-100/50 rounded-full hover:bg-orange-100 transition-colors">
                Lihat Semua Katalog →
              </Link>
            </div>
          </div>
        </section>

        {/* 4. FEATURES SECTION */}
        <section className="snap-start snap-always shrink-0 relative flex flex-col justify-center w-full h-full bg-teal-50">
          <div className="px-6 py-10 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-teal-950 sm:text-4xl">Mengapa PawConnect?</h2>
              <p className="mt-4 text-lg text-teal-700/80">Membawa kebahagiaan untuk hewan dan manusia melalui sistem yang transparan.</p>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="p-8 transition-all duration-300 bg-white rounded-3xl shadow-sm border border-teal-100 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-950">Adopsi Langsung</h3>
                <p className="mt-3 text-teal-800/80">Hubungi pengunggah hewan secara langsung untuk proses adopsi yang lebih personal dan cepat.</p>
              </div>
              <div className="p-8 transition-all duration-300 bg-white rounded-3xl shadow-sm border border-teal-100 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-teal-100 text-teal-600 shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-950">Donasi Transparan</h3>
                <p className="mt-3 text-teal-800/80">Bantu shelter dengan donasi yang tercatat rapi. Setiap rupiah sangat berarti bagi mereka.</p>
              </div>
              <div className="p-8 transition-all duration-300 bg-white rounded-3xl shadow-sm border border-teal-100 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-11.622 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-950">Lingkungan Aman</h3>
                <p className="mt-3 text-teal-800/80">Identitas dan data pengguna terlindungi untuk menciptakan komunitas penyayang hewan yang aman.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="snap-start snap-always shrink-0 relative flex flex-col justify-center px-6 py-20 overflow-hidden text-center bg-white sm:px-12 lg:px-24 h-full">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-teal-950 sm:text-4xl">Siap Mengubah Kehidupan Mereka?</h2>
            <p className="text-lg text-teal-800/80 sm:text-xl">Buat akun PawConnect sekarang dan mulai perjalananmu mencari sahabat baru.</p>
            <div className="pt-4">
              <Link href="/register" className="inline-block px-10 py-4 text-lg font-bold transition-transform transform bg-orange-500 rounded-full text-white hover:scale-105 shadow-xl hover:bg-orange-600">
                Daftar Sekarang
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #134e4a 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </section>

        {/* 6. FOOTER  */}
        <div className="snap-start shrink-0 bg-zinc-950">
          <Footer />
        </div>

      </main>
    </div>
  );
}