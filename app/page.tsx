'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Youtube, Facebook, Linkedin } from 'lucide-react';
import Resume from '../components/Resume';

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let floatingNodes: FloatingNode[] = [];
    const nodeCount = 12;

    class FloatingNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 60 + 40;
        this.hue = Math.random() * 60 + 180;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius || this.x > canvas!.width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > canvas!.height + this.radius) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.15)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 80%, 60%, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      floatingNodes.push(new FloatingNode());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      floatingNodes.forEach(node => {
        node.update();
        node.draw();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/kaveeth555',
      icon: Github,
      color: 'from-slate-600 to-slate-800',
      hoverColor: 'hover:shadow-slate-500/50'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@MrKavvyOfficial',
      icon: Youtube,
      color: 'from-red-600 to-red-800',
      hoverColor: 'hover:shadow-red-500/50'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kaveeth-manodhya-b3917330a',
      icon: Linkedin,
      color: 'from-blue-700 to-blue-900',
      hoverColor: 'hover:shadow-blue-600/50'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61574217495649',
      icon: Facebook,
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:shadow-blue-500/50'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Custom Cursor */}
      <div
        className="pointer-events-none fixed z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
        }}
      >
        <div className="h-6 w-6 rounded-full border-2 border-cyan-400 bg-cyan-400/20 backdrop-blur-sm" />
      </div>

      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 blur-sm"
        style={{ background: 'linear-gradient(135deg, #0a0f23 0%, #1a1f3a 100%)' }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 py-12 md:py-20 px-4">
        <div className="w-full max-w-2xl">
          {/* Glass Card */}
          <div
            className="group relative overflow-hidden rounded-3xl p-1 transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            }}
          >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(100,200,255,0.3), rgba(200,100,255,0.3))',
                filter: 'blur(20px)',
              }}
            />

            <div
              className="relative overflow-hidden rounded-3xl backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Liquid Blob Animation */}
              <div className="absolute -right-20 -top-20 h-64 w-64 animate-blob rounded-full bg-cyan-400/10 mix-blend-overlay blur-3xl filter" />
              <div className="animation-delay-2000 absolute -bottom-20 -left-20 h-64 w-64 animate-blob rounded-full bg-blue-400/10 mix-blend-overlay blur-3xl filter" />
              <div className="animation-delay-4000 absolute left-1/2 top-1/2 h-64 w-64 animate-blob rounded-full bg-purple-400/10 mix-blend-overlay blur-3xl filter" />

              <div className="relative z-10 space-y-8 p-12">
                {/* Header */}
                <div className="space-y-4 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 animate-pulse" />
                    <Image
                      src="/profile.png?v=2"
                      alt="Kaveeth Manodhya"
                      fill
                      className="rounded-full object-cover border-2 border-white/20 relative z-10"
                      priority
                      unoptimized
                    />
                  </div>
                  <h1
                    className="animate-fade-in-up text-5xl font-bold tracking-tight sm:text-6xl"
                    style={{
                      background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #60a5fa 100%)',
                      backgroundSize: '200% auto',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                      animation: 'fade-in-up 0.8s ease-out forwards, gradient-shift 3s ease infinite',
                      fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif',
                      filter: 'drop-shadow(0 0 80px rgba(96, 165, 250, 0.3))',
                    }}
                  >
                    Welcome
                  </h1>
                  <h2
                    className="animate-fade-in-up animation-delay-200 text-4xl font-bold tracking-wide sm:text-5xl"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: '"Outfit", system-ui, sans-serif',
                      animationDelay: '0.2s',
                      letterSpacing: '0.02em',
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    It's Kaveeth Manodhya
                  </h2>
                  <p className="animate-fade-in-up animation-delay-800 text-lg text-slate-300 sm:text-xl max-w-lg mx-auto leading-relaxed"
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      animationDelay: '0.4s',
                    }}
                  >
                    Undergraduate | Photographer | YouTuber
                    <br />
                    <span className="text-sm text-slate-400 mt-2 block">

                    </span>
                  </p>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`animate-fade-in-up group/btn relative flex items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r ${link.color} p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 ${link.hoverColor} hover:shadow-2xl`}
                        style={{
                          animationDelay: `${0.4 + index * 0.1}s`,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-[100%]" />

                        <Icon className="h-7 w-7 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                        <span className="text-xl font-semibold tracking-wide" style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}>
                          {link.name}
                        </span>

                        {/* Arrow Icon */}
                        <svg
                          className="absolute right-5 h-5 w-5 opacity-0 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    );
                  })}
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Resume />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=DM+Sans:wght@400;500&family=Outfit:wght@600&family=Inter:wght@400&family=Playfair+Display:wght@700&display=swap');

        * {
          cursor: none !important;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}