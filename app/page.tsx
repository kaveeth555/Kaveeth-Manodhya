'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Youtube, Facebook, Linkedin, Mail, Twitter, Globe, Menu, X } from 'lucide-react';
import Resume from '../components/Resume';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Interactive Background Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const spacing = 40;
    const influenceRadius = 250; // Increased for smoother gradient
    const visibilityRadius = 350; // Larger than influence to fade in before moving
    const returnSpeed = 0.02; // Slower for "liquid" feel

    const colors = [
      '239, 68, 68',   // Red-500
      '34, 197, 94',   // Green-500
      '59, 130, 246',  // Blue-500
      '234, 179, 8',   // Yellow-500
      '236, 72, 153',  // Pink-500
      '168, 85, 247',  // Purple-500
      '6, 182, 212',   // Cyan-500
      '249, 115, 22',  // Orange-500
    ];

    class Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouse: { x: number, y: number }) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel mouse (Resistance)
        if (dist < influenceRadius) {
          const force = (influenceRadius - dist) / influenceRadius;
          const angle = Math.atan2(dy, dx);
          // Move away from mouse with eased force
          const easeForce = force * force;
          this.vx -= Math.cos(angle) * easeForce * 2.5;
          this.vy -= Math.sin(angle) * easeForce * 2.5;
        }

        // Return to origin
        this.vx += (this.originX - this.x) * returnSpeed;
        this.vy += (this.originY - this.y) * returnSpeed;

        // Damping
        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(mouse: { x: number, y: number }) {
        if (!ctx) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only draw if within visibility radius
        if (dist < visibilityRadius) {
          // Smooth fade out using eased opacity
          const normalizedDist = dist / visibilityRadius;
          const opacity = Math.max(0, Math.pow(1 - normalizedDist, 2) * 0.85); // Increased max opacity

          if (opacity > 0.01) {
            ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
            ctx.fillRect(this.x - 1, this.y - 3, 2, 6); // Slightly larger lines
          }
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      points = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          points.push(new Point(x, y));
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(point => {
        point.update(mousePos.current);
        point.draw(mousePos.current);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  // Background decorative code snippets
  const codeSnippets = [
    { text: '<Developer />', top: '10%', left: '5%', rotate: '-12deg' },
    { text: 'const creative = true;', top: '25%', right: '10%', rotate: '5deg' },
    { text: 'npm run start', bottom: '15%', left: '8%', rotate: '15deg' },
    { text: 'while(alive) { code(); }', bottom: '30%', right: '5%', rotate: '-5deg' },
    { text: 'git push origin master', top: '15%', right: '25%', rotate: '8deg' },
    { text: 'import { Future } from "react";', top: '40%', left: '15%', rotate: '-3deg' },
    { text: 'console.log("Hello World");', bottom: '40%', right: '20%', rotate: '10deg' },
    { text: 'div { display: flex; }', top: '60%', right: '40%', rotate: '-8deg' },
    { text: 'return <Success />;', bottom: '10%', left: '30%', rotate: '3deg' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden">

      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Decorative Blurred Code Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {codeSnippets.map((item, index) => (
          <div
            key={index}
            className="absolute font-mono text-gray-400 text-lg md:text-2xl font-bold opacity-40 blur-[1px] whitespace-nowrap"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              transform: `rotate(${item.rotate})`,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md text-gray-900 py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold tracking-tight">
          <div className="border-2 border-black rounded-full p-1 w-10 h-10 flex items-center justify-center">
            <span>K</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider font-medium text-gray-600">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
          <a href="#education" className="hover:text-black transition-colors">Education</a>
        </div>

        {/* Social Icons Desktop */}
        <div className="hidden md:flex gap-4">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} className="text-gray-600 hover:text-black transition-colors">
              <link.icon size={18} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden flex flex-col">
          <div className="flex flex-col gap-6 text-xl text-gray-800 uppercase tracking-wider font-medium flex-1">
            <a href="#about" className="hover:text-black" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="hover:text-black" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#education" className="hover:text-black" onClick={() => setMobileMenuOpen(false)}>Education</a>
          </div>
          <div className="flex gap-6 pb-20 justify-center">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.name} href={link.url} className="text-gray-600 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
                  <Icon size={28} />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row min-h-screen pt-20">

        {/* Left Side - Designer */}
        <div className="flex-1 relative flex items-center justify-center md:justify-end md:pr-[25vw] p-8 z-10">
          <div className="text-center md:text-right max-w-sm relative group">

            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-sm">
                designer
              </h1>
              <p className="text-gray-900 font-medium text-sm md:text-base leading-relaxed">
                UI/UX Designer with a passion for designing beautiful and functional user experiences
              </p>
            </div>
            {/* Artistic Paint Splash Decoration */}
            <div className="absolute top-1/2 left-10 w-32 h-32 bg-purple-200 blur-2xl rounded-full -z-10 mix-blend-multiply opacity-70"></div>
          </div>
        </div>

        {/* Center Image & Vlogger */}
        <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 w-full md:w-auto flex flex-col items-center justify-center py-8 md:py-0 gap-6">




          <div className="relative w-[450px] h-[450px] max-w-[100vw] md:w-[min(950px,90vh)] md:h-[min(950px,90vh)] max-h-[100vh]">
            {/* Split Blur Effect */}
            <div className="absolute inset-0 z-0 flex items-center justify-center scale-110 opacity-60">
              <div className="w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-transparent blur-[80px] -translate-x-10 rounded-full mix-blend-multiply"></div>
              <div className="w-full h-full bg-gradient-to-l from-cyan-400 via-blue-500 to-transparent blur-[80px] translate-x-10 rounded-full mix-blend-multiply"></div>
            </div>

            {/* LAYER 1: Shadow for Base text (behind image) */}
            <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-[4] text-center w-full pointer-events-none">
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}>
                Content Creator
              </h2>
            </div>

            {/* LAYER 2: Base White Text (behind image) */}
            <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-[5] text-center w-full pointer-events-none">
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] whitespace-nowrap">
                Content Creator
              </h2>
            </div>

            {/* LAYER 3: The Image */}
            <Image
              src="/profile-v2.png"
              alt="Profile"
              fill
              className="relative z-10 object-contain profile-mask select-none pointer-events-none transform-gpu will-change-transform scale-[1.1] md:scale-[1.15] translate-y-8 lg:translate-y-12"
              priority
            />

            {/* LAYER 4: Blended Text (in front of image) */}
            <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-20 text-center w-full mix-blend-overlay pointer-events-none">
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-white whitespace-nowrap">
                Content Creator
              </h2>
            </div>

            {/* LAYER 5: Stroke Outline (in front of image) */}
            <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-30 text-center w-full pointer-events-none">
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)' }}>
                Content Creator
              </h2>
            </div>
          </div>

          {/* Social Buttons - Original Style */}
          <div className="flex gap-4 mt-4 relative z-50 pt-4 pb-8">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center p-3 rounded-full bg-gradient-to-br ${link.color} shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-110 border border-white transform-gpu will-change-transform`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side - Coder */}
        <div className="flex-1 relative flex items-center justify-center md:justify-start md:pl-[25vw] p-8 z-10">
          <div className="text-center md:text-left max-w-sm relative group">

            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter flex items-center justify-center md:justify-start gap-2">
                <span className="font-mono text-4xl text-blue-700">&lt;</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-700">/coder</span>
                <span className="font-mono text-4xl text-blue-700">&gt;</span>
              </h1>
              <p className="text-gray-900 font-medium text-sm md:text-base leading-relaxed">
                Front End Developer who focuses on writing clean, elegant and efficient code
              </p>
            </div>

            {/* Code Snippet Decoration */}
            <div className="absolute bottom-20 right-10 -z-10 opacity-10 font-mono text-xs hidden md:block text-blue-900">
              <pre>{`
                class Developer {
                  constructor() {
                    this.passion = "code";
                    this.coffee = true;
                  }
                }
              `}</pre>
            </div>

            <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-100 blur-3xl rounded-full -z-10 opacity-70"></div>
          </div>
        </div>

      </main>

      {/* About Me Section */}
      <section id="about" className="py-20 relative z-30 font-sans bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              About Me <span className="text-blue-600">.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              I am an undergraduate at Wayamba University of Sri Lanka, a programmer, and a photographer working at the intersection of technology and digital media. By combining a strong technical background with a passion for cinematic storytelling, I build digital solutions and content designed to be experienced rather than just consumed. Whether I am developing software or producing high-quality tech reviews and travel vlogs for YouTube.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My goal is to merge strategic thinking with creative vision to build truly immersive digital experiences.
            </p>
          </div>

          {/* Second Profile Image */}
          <div className="flex-1 relative w-full aspect-square max-w-[350px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full -rotate-6 transform"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/split_face_v2.png"
                alt="Kaveeth Manodhya - About Me"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section - Kept existing component */}
      <section className="py-20 relative z-30">
        <div className="container mx-auto px-6">
          <Resume />
        </div>
      </section>

    </div>
  );
}