'use client';

export default function BackgroundOrbs() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* Top-left: deep blue orb */}
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
      {/* Right: lighter sky-blue orb */}
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
      {/* Bottom-center: indigo-blue orb */}
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
    </div>
  );
}
