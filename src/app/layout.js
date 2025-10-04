import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GlobalToast from "@/components/toast/GlobalToast";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Videobelajar",
  description: "Modern Elearning Platform",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${poppins.variable} antialiased`}>
        <Providers>
          <main>{children}</main>
          <GlobalToast />
        </Providers>
      </body>
    </html>
  );
}
