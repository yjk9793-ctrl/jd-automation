'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingAnimation({ text, speed = 100, className = '' }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleProps[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.1,
          color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.y -= particle.speed;
        particle.x += Math.sin(particle.y * 0.01) * 0.5;

        // Reset particle if it goes off screen
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1000})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

interface FloatingElementsProps {
  children: React.ReactNode;
}

export function FloatingElements({ children }: FloatingElementsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        x: isHovered ? (mousePosition.x - window.innerWidth / 2) * 0.02 : 0,
        y: isHovered ? (mousePosition.y - window.innerHeight / 2) * 0.02 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

interface GlowEffectProps {
  children: React.ReactNode;
  intensity?: number;
}

export function GlowEffect({ children, intensity = 0.5 }: GlowEffectProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{
        filter: isVisible ? `drop-shadow(0 0 ${20 * intensity}px rgba(59, 130, 246, ${intensity}))` : 'none',
      }}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function TextReveal({ children, delay = 0, direction = 'up' }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface PulseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PulseButton({ children, onClick, className = '' }: PulseButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isPulsing 
          ? ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)']
          : '0 0 0 0 rgba(59, 130, 246, 0)'
      }}
      transition={{
        boxShadow: {
          duration: 1,
          repeat: isPulsing ? 1 : 0,
          ease: "easeOut"
        }
      }}
    >
      {children}
    </motion.button>
  );
}
