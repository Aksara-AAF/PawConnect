import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Navbar ditaruh di sini agar hanya muncul di rute (main) */}
            <div className="flex-none z-50 bg-white sticky top-0 shadow-sm">
                <Navbar />
            </div>

            <main className="flex-1 relative">
                {children}
            </main>

            {/* Footer ditaruh di sini */}
            <Footer />
        </div>
    );
}