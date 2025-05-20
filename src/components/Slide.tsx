import { useEffect, useRef, useState } from "react";
import slide1 from "../assets/Slides/slide1.jpg";
import slide2 from "../assets/Slides/slide2.jpg";
import slide3 from "../assets/Slides/slide3.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  { id: 0, title: "Slide 1", url: slide1 },
  { id: 1, title: "Slide 2", url: slide2 },
  { id: 2, title: "Slide 3", url: slide3 },
];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetInterval();
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Touch & Mouse handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const x =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchStartX.current = x;
    touchEndX.current = null;
    if ("buttons" in e && e.buttons === 1) {
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e || isDragging.current) {
      const x =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      touchEndX.current = x;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        nextSlide(); // sola kaydırıldı
      } else if (diff < -50) {
        prevSlide(); // sağa kaydırıldı
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    isDragging.current = false;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden z-20 text-sm lg:text-3xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => {
        // Fare dışına çıkarsa drag işlemini iptal et
        if (isDragging.current) {
          handleTouchEnd();
        }
      }}
      style={{
        userSelect: "none",
        cursor: isDragging.current ? "grabbing" : "grab",
      }}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover rounded-sm lg:rounded-2xl"
            draggable={false} // img drag olmasın, sadece kaydırma olsun
          />
        </div>
      ))}

      {/* Next & Prev Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white z-10 cursor-pointer"
      >
        <FaArrowLeft className="hover:text-blue-400" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white z-10 cursor-pointer"
      >
        <FaArrowRight className="hover:text-blue-400" />
      </button>
    </div>
  );
};

export default Slide;
