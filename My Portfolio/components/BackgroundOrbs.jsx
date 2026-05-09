'use client';

import { useEffect, useState } from 'react';

const STAR_COUNT = 40;

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function BackgroundOrbs() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      top: seededRandom(i * 3) * 100,
      left: seededRandom(i * 7) * 100,
      size: 2 + seededRandom(i * 11) * 3,
      twinkleDuration: 2 + seededRandom(i * 13) * 4,
      twinkleDelay: seededRandom(i * 17) * 5,
      driftDuration: 4 + seededRandom(i * 19) * 6,
      driftDelay: seededRandom(i * 23) * 4,
    }));
    setStars(generated);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,90,180,0.55) 0%, rgba(30,90,180,0.25) 45%, transparent 70%)',
        filter: 'blur(25px)',
        top: '-80px',
        left: '-60px',
        animation: 'orbFloat1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(60,130,210,0.5) 0%, rgba(60,130,210,0.2) 45%, transparent 70%)',
        filter: 'blur(20px)',
        top: '30%',
        right: '-60px',
        animation: 'orbFloat2 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(40,80,160,0.5) 0%, rgba(40,80,160,0.2) 45%, transparent 70%)',
        filter: 'blur(22px)',
        bottom: '-50px',
        left: '30%',
        animation: 'orbFloat3 26s ease-in-out infinite',
      }} />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 0%, rgba(91,155,213,0.8) 60%, transparent 100%)',
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(91,155,213,0.4)`,
            animation: `starTwinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite, starDrift ${star.driftDuration}s ease-in-out ${star.driftDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
