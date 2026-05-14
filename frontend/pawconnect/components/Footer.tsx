import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 bg-gray-900 border-t border-gray-800">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Kolom 1: Brand */}
                    <div>
                        <span className="text-2xl font-bold text-white">PawConnect</span>
                        <p className="mt-4 text-sm text-gray-400">
                            Platform adopsi dan donasi hewan peliharaan peer-to-peer. <br />
                            Temukan sahabat barumu di sini.
                        </p>
                    </div>

                    {/* Kolom 2: Tautan Cepat */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase">Tautan Cepat</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/pets" className="text-gray-400 hover:text-amber-500">Cari Peliharaan</Link></li>
                            <li><Link href="/donate" className="text-gray-400 hover:text-amber-500">Donasi Shelter</Link></li>
                            <li><Link href="/register" className="text-gray-400 hover:text-amber-500">Daftar Akun</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Info Tim */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase">Proyek Akhir SBD</h3>
                        <p className="mt-4 text-sm text-gray-400">
                            Dibuat oleh:<br />
                            Akbar, Daffa, Nabil, & Zhafarrel.
                        </p>
                    </div>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} PawConnect. Seluruh hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}