import { useRef, useEffect, useState } from 'react';

export default function GlowCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const card = cardRef.current;
    card?.addEventListener('mousemove', handleMouseMove);
    return () => card?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative glass-card overflow-hidden group ${className}`}
      style={{
        background: `
          radial-gradient(
            circle 600px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 240, 255, 0.1),
            transparent 80%
          ),
          rgba(17, 17, 20, 0.4)
        `,
        transition: 'background 0.05s ease-out',
      }}
    >
      {children}
    </div>
  );
}
