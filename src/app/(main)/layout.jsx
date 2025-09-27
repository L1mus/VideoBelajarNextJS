import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
