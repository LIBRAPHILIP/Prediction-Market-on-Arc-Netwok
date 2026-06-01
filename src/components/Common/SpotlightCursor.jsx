import { useEffect, useState } from 'react';

export default function SpotlightCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 rounded-full mix-blend-screen"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(
          circle 600px,
          rgba(0, 240, 255, 0.06),
          transparent 70%
        )`,
        width: '1200px',
        height: '1200px',
      }}
    />
  );
}
