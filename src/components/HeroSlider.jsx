import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/c53344c5c_Adult-Foster-Care1-AdobeStock_224946364.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/2eb871bda_pexels-kampus-7551644.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6929d81f70c03236c5140dd7/aafcd967f_pexels-vlada-karpovich-5790810.jpg"
];

const transitions = ['grid'];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedCount = useRef(0);
  
  // Preload images on mount
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount.current += 1;
        if (loadedCount.current === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);
  
  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [imagesLoaded]);

  const currentTransition = transitions[currentIndex % transitions.length];

  return (
    <div className="absolute inset-0 overflow-hidden bg-emerald-950">
      {/* Floating shapes background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {currentTransition === 'blinds' && (
          <BlindsTransition key={`blinds-${currentIndex}`} image={images[currentIndex]} />
        )}
        {currentTransition === 'grid' && (
          <GridTransition key={`grid-${currentIndex}`} image={images[currentIndex]} />
        )}
        {currentTransition === 'ken-burns' && (
          <KenBurnsTransition key={`kb-${currentIndex}`} image={images[currentIndex]} />
        )}
      </AnimatePresence>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-20" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BlindsTransition({ image }) {
  const SLICES = 10;
  return (
    <div className="absolute inset-0 flex h-full w-full z-10">
      {[...Array(SLICES)].map((_, i) => (
        <motion.div
          key={i}
          className="h-full relative border-r border-transparent"
          style={{ 
            width: `${100 / SLICES}%`,
            backgroundImage: `url(${image})`,
            backgroundSize: `${SLICES * 100}% 100%`,
            backgroundPosition: `${i * (100 / (SLICES - 1))}% center`
          }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ 
            y: "0%", 
            opacity: 1,
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06 
            }
          }}
          exit={{ 
            y: "100%", 
            opacity: 0,
            transition: { duration: 0.5, delay: i * 0.03 }
          }}
        />
      ))}
    </div>
  );
}

function GridTransition({ image }) {
  const ROWS = 4;
  const COLS = 6;
  
  return (
    <div className="absolute inset-0 flex flex-wrap z-10">
      {[...Array(ROWS * COLS)].map((_, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        return (
          <motion.div
            key={i}
            className="relative border-transparent overflow-hidden"
            style={{
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.5,
                delay: (col + row) * 0.05
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              transition: { duration: 0.3, delay: (col + row) * 0.02 }
            }}
          >
            <img 
              src={image} 
              alt=""
              className="absolute max-w-none"
              style={{
                top: `-${row * 100}%`,
                left: `-${col * 100}%`,
                width: `${COLS * 100}%`,
                height: `${ROWS * 100}%`,
                objectFit: 'cover'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function KenBurnsTransition({ image }) {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: { duration: 1.5, ease: "easeOut" }
      }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8 }
      }}
    />
  );
}