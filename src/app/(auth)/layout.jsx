import Navbar from "@/components/navigation/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar navType="default" />
      <main>{children}</main>
    </>
  );
}
