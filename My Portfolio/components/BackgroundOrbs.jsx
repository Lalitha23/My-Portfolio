'use client';

export default function BackgroundOrbs() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,155,213,0.45) 0%, rgba(91,155,213,0.1) 40%, transparent 70%)',
        filter: 'blur(40px)',
        top: '-100px',
        left: '-80px',
        animation: 'orbFloat1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,155,213,0.4) 0%, rgba(59,100,180,0.1) 40%, transparent 70%)',
        filter: 'blur(50px)',
        top: '30%',
        right: '-80px',
        animation: 'orbFloat2 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(70,120,200,0.4) 0%, rgba(91,155,213,0.1) 40%, transparent 70%)',
        filter: 'blur(45px)',
        bottom: '-60px',
        left: '30%',
        animation: 'orbFloat3 26s ease-in-out infinite',
      }} />
    </div>
  );
}
