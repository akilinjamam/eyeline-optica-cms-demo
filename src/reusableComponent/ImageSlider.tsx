/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


type ImageSliderProps = {
  images: string[];
  autoPlay?: boolean;
  interval?: number; // autoplay interval in ms
  className?: string;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = false,
  interval = 3000,
  className = "",
}) => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const nextSlide = () => {
    setIndex(([prev, _]) => [(prev + 1) % images.length, 1]);
  };

  const prevSlide = () => {
    setIndex(([prev, _]) => [
      prev === 0 ? images.length - 1 : prev - 1,
      -1,
    ]);
  };

  // Auto play
  if (autoPlay && images.length > 1) {
    setTimeout(() => {
      nextSlide();
    }, interval);
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative w-full h-64 md:h-96 overflow-hidden rounded-2xl ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          className="absolute w-full h-full object-contain  rounded-2xl"
        />
      </AnimatePresence>

      {/* Left button */}
      {
        images?.length > 1
        &&
        <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      }

      {/* Right button */}
      {
        images?.length > 1
        &&
        <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      }

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-400/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
