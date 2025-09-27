import PaymentNavbar from "@/components/navigation/PaymentNavbar";
import Footer from "@/components/footer/Footer";

export default function PaymentLayout({ children }) {
  return (
    <>
      <PaymentNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
