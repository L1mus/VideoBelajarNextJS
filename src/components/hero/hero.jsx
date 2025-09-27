import React from "react";
import Button from "../button/Button";

const Hero = () => {
  return (
    <div className="w-full py-10">
      <div
        className="relative w-full bg-cover bg-center rounded-xl overflow-hidden
                   md:h-auto h-100 md:aspect-video lg:aspect-[2.5/1]"
        style={{ backgroundImage: "url('/assets/images/heroimage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div
          className="relative z-10 h-full flex flex-col justify-center text-center text-white 
                   px-5 pt-16 pb-16"
        >
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-xl md:text-4xl leading-tight">
              Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
              Interaktif!
            </h1>
            <p className="text-sm  md:text-base">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
              pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
              berpartisipasi dalam latihan interaktif yang akan meningkatkan
              pemahaman Anda.
            </p>
            <Button
              variant="solid"
              color="primary"
              size="sm"
              className="md:px-6 md:py-3 md:text-base"
            >
              Temukan Video Course untuk Dipelajari!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
