import React from "react";
import Logo from "../navigation/Logo";
import Link from "next/link";
import FooterAccordion from "./FooterAccordion";
import LinkedInIcon from "../icons/LinkedInIcon";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const socialLinks = [
  { href: "#", icon: <LinkedInIcon /> },
  { href: "#", icon: <FacebookIcon /> },
  { href: "#", icon: <InstagramIcon /> },
  { href: "#", icon: <TwitterIcon /> },
];

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-base hover:text-primary-default transition-colors"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12  " style={{ minHeight: "427px" }}>
          {/* === KONTENER ATAS (Mobile & Desktop) === */}
          <div>
            <div className="hidden md:flex justify-between gap-8 pt-12">
              <div className="w-full max-w-sm flex-shrink-0">
                <Logo />
                <p className="mt-6 text-base font-bold leading-relaxed">
                  Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                </p>
                <div className="mt-4 text-base space-y-2">
                  <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
                  <p>+62-877-7123-1234</p>
                </div>
              </div>

              <div className="flex gap-x-8 lg:gap-x-10 content-center">
                <div>
                  <h3 className="font-bold text-base ">Kategori</h3>
                  <div className="flex flex-col space-y-4 mt-6">
                    <FooterLink href="#">Digital & Teknologi</FooterLink>
                    <FooterLink href="#">Pemasaran</FooterLink>
                    <FooterLink href="#">Manajemen Bisnis</FooterLink>
                    <FooterLink href="#">Pengembangan Diri</FooterLink>
                    <FooterLink href="#">Desain</FooterLink>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base ">Perusahaan</h3>
                  <div className="flex flex-col space-y-4 mt-6">
                    <FooterLink href="#">Tentang Kami</FooterLink>
                    <FooterLink href="#">FAQ</FooterLink>
                    <FooterLink href="#">Kebijakan Privasi</FooterLink>
                    <FooterLink href="#">Ketentuan Layanan</FooterLink>
                    <FooterLink href="#">Bantuan</FooterLink>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base ">Komunitas</h3>
                  <div className="flex flex-col space-y-4 mt-6">
                    <FooterLink href="#">Tips Sukses</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Tampilan Mobile */}
            <div className="md:hidden pt-12">
              <Logo />
              <p className="mt-6 text-base leading-relaxed">
                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
              </p>
              <div className="mt-4 text-base space-y-2">
                <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
                <p>+62-877-7123-1234</p>
              </div>
              <div className="mt-6">
                <FooterAccordion title="Kategori">
                  <FooterLink href="#">Digital & Teknologi</FooterLink>
                  <FooterLink href="#">Pemasaran</FooterLink>
                  <FooterLink href="#">Manajemen Bisnis</FooterLink>
                  <FooterLink href="#">Pengembangan Diri</FooterLink>
                  <FooterLink href="#">Desain</FooterLink>
                </FooterAccordion>
                <FooterAccordion title="Perusahaan">
                  <FooterLink href="#">Tentang Kami</FooterLink>
                  <FooterLink href="#">FAQ</FooterLink>
                  <FooterLink href="#">Kebijakan Privasi</FooterLink>
                  <FooterLink href="#">Ketentuan Layanan</FooterLink>
                  <FooterLink href="#">Bantuan</FooterLink>
                </FooterAccordion>
                <FooterAccordion title="Komunitas">
                  <FooterLink href="#">Tips Sukses</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                </FooterAccordion>
              </div>
            </div>
          </div>

          <div className="py-4 border-t border-gray-200 flex flex-col-reverse items-center gap-y-5 sm:flex-row sm:justify-between">
            <p className=" text-sm text-center">
              @2023 Gerobak Sayur All Rights Reserved.
            </p>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-foreground hover:text-primary-default transition-colors p-2 border border-gray-300 rounded-full"
                >
                  {React.cloneElement(link.icon, { className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
