import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Tablet } from "lucide-react";

interface ProjectSliderProps {
  images: string[];
  title: string;
}

export default function ProjectSlider({ images, title }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay, images]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
    }),
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="slider-wrapper"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      ref={sliderRef}
    >
      {/* Background Glow */}
      <div className="slider-bg-glow" />

      <div className="tablet-container">
        {/* Tablet Frame - Borderless and Shadowless to blend with page */}
        <div className="tablet-device">
          <div className="tablet-inner-border">
            <div className="tablet-screen">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 },
                    filter: { duration: 0.3 }
                  }}
                  className="slide-content"
                >
                  <img
                    src={images[currentIndex]}
                    className="slide-image"
                    alt={`${title} screenshot ${currentIndex + 1}`}
                  />
                  
                  {/* Subtle Image Overlay */}
                  <div className="image-vignette" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button className="nav-arrow prev" onClick={prevSlide}>
                    <ChevronLeft size={28} />
                  </button>
                  <button className="nav-arrow next" onClick={nextSlide}>
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Bottom Info Bar */}
              <div className="slider-bottom-bar">
                <div className="info-group">
                  <Tablet size={14} className="text-neon-purple" />
                  <span className="slider-title">{title}</span>
                </div>
                <div className="pagination-group">
                  <span className="current-page">{String(currentIndex + 1).padStart(2, '0')}</span>
                  <span className="page-separator">/</span>
                  <span className="total-pages">{String(images.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="thumbnails-strip">
          {images.map((img, i) => (
            <button
              key={i}
              className={`thumb-item ${i === currentIndex ? "active" : ""}`}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
            >
              <img src={img} alt={`thumb ${i}`} />
              <div className="thumb-overlay" />
            </button>
          ))}
        </div>
      )}

      <style>{`
        .slider-wrapper {
          position: relative;
          width: 100%;
          padding: 40px 0;
          perspective: 1000px;
        }

        .slider-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 60%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        .tablet-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tablet-device {
          position: relative;
          width: 100%;
          max-width: 850px;
          aspect-ratio: 16 / 10;
          background: transparent;
          border-radius: 0px;
          padding: 0px;
          border: none;
          box-shadow: none;
        }

        .tablet-inner-border {
          width: 100%;
          height: 100%;
          background: transparent;
          border-radius: 0px;
          padding: 0px;
          border: none;
        }

        .tablet-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          border-radius: 0px;
          overflow: hidden;
        }

        .slide-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .slide-image {
          height: 100%;
          width: 100%;
          object-fit: contain;
          padding: 0px;
        }

        .image-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 70%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
        }

        .nav-arrow:hover {
          background: var(--neon-purple);
          border-color: var(--neon-purple);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
          scale: 1.05;
        }

        .nav-arrow.prev { left: 20px; }
        .nav-arrow.next { right: 20px; }

        .slider-bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 10;
        }

        .info-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .slider-title {
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        .pagination-group {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .current-page { color: var(--neon-purple); }
        .page-separator { opacity: 0.2; }
        .total-pages { opacity: 0.4; font-size: 0.7rem; }

        .device-camera {
          position: absolute;
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: #111;
          border-radius: 50%;
        }

        .device-button {
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          width: 4px;
          height: 36px;
          background: #111;
          border-radius: 2px;
        }

        .thumbnails-strip {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
          padding: 0 20px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .thumbnails-strip::-webkit-scrollbar { display: none; }

        .thumb-item {
          position: relative;
          width: 60px;
          aspect-ratio: 16 / 10;
          border-radius: 6px;
          overflow: hidden;
          background: #111;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          padding: 0;
        }

        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
        }

        .thumb-item.active {
          border-color: var(--neon-purple);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          scale: 1.1;
        }

        .thumb-item.active img { opacity: 1; }

        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: var(--neon-purple);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .thumb-item:hover .thumb-overlay { opacity: 0.1; }

        @media (max-width: 768px) {
          .tablet-device { border-radius: 20px; padding: 8px; }
          .tablet-inner-border { border-radius: 16px; padding: 4px; }
          .tablet-screen { border-radius: 12px; }
          .nav-arrow { width: 40px; height: 40px; }
          .nav-arrow.prev { left: 10px; }
          .nav-arrow.next { right: 10px; }
        }
      `}</style>
    </div>
  );
}
