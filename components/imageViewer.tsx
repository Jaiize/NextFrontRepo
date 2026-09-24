"use client"

import { Screenshots } from "@/rawg.games.type";
import Image from "next/image";
import { SetStateAction } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";

interface ImageViewProps { 
  images: Screenshots[];
  index: number, 
  setIndex: React.Dispatch<SetStateAction<number>> 
  popOut: boolean,
  setPopOut: (val: boolean | ((val: boolean) => boolean)) => void 
}

const ImageViewer = ({ images, index, popOut, setPopOut, setIndex }: ImageViewProps) => {

  const prev = () => {
    setIndex((i) => i === 0 ? (images.length - 1) : (i -= 1));
  }

  const next = () => {
    setIndex((i) => i === (images.length - 1) ? 0 : (i += 1));
  }


  return (
    <div className={`min-w-full min-h-full fixed inset-0 z-30 transition-transform duration-200 ${popOut ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-50'}`}>
      <div className="relative w-full h-full backdrop-blur-lg">
        <span onClick={() => setPopOut(false)} className="absolute right-10 top-15 max-sm:right-5 hover:cursor-pointer z-40">
          <MdCancel className="h-7 w-7" />
        </span>

        <span onClick={() => prev()} className={`active:h-7 active:w-7 h-9 w-9 active:max-sm:h-4 active:max-sm:w-4 max-sm:h-5 max-sm:w-5 transition-all absolute left-10 top-[50%] z-50 hover:cursor-pointer`}>
          <GrPrevious className="h-full w-full" />
        </span>

          <div className="flex flex-row justify-center items-center w-full h-full pt-10">
            { images && images.map(({ image }, i) => (
              <Image
                key={i}
                loading="eager"
                alt={image}
                width={1920}
                height={1080}
                src={image || "/Nocontent.jpg"}
                className={`${index === i && popOut === true ? "opacity-100" : "opacity-0"} rounded-xl transition-opacity object-contain w-fit xl:h-180 md:h-112 lg:h-140 absolute`}
              />
            ))
            }
          </div>

        <span onClick={() => next() } className="active:h-7 active:w-7 h-9 w-9 active:max-sm:h-4 active:max-sm:w-4 max-sm:h-5 max-sm:w-5 transition-all absolute right-10 top-[50%] z-50 hover:cursor-pointer">
          <GrNext className="h-full w-full" />
        </span>
        
      </div>
    </div>
  );
};

export default ImageViewer;
