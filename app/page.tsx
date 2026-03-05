'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Youtube, Facebook, Linkedin, Mail, Twitter, Globe } from 'lucide-react';
import Resume from '../components/Resume';
import Projects from '../components/Projects';

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
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

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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

      {/* Background Canvas (Desktop Only) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none hidden md:block"
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
      <nav
        className={`fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md text-gray-900 px-6 flex justify-center items-center border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-5'
          }`}
      >
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider font-medium text-gray-600">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
          <a href="#education" className="hover:text-black transition-colors">Education</a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Footer) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 py-4 px-6 flex justify-center gap-8 items-center text-sm uppercase tracking-wider font-semibold text-gray-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <a href="#about" className="hover:text-black transition-colors">
          About
        </a>
        <a href="#projects" className="hover:text-black transition-colors">
          Projects
        </a>
        <a href="#experience" className="hover:text-black transition-colors">
          Experience
        </a>
        <a href="#education" className="hover:text-black transition-colors">
          Education
        </a>
      </div>

      {/* Floating Social Buttons */}
      <div
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-[60] transition-all duration-500 opacity-100 translate-x-0"
      >
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={`floating-${link.name}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center p-2.5 md:p-3 rounded-full bg-gradient-to-br ${link.color} shadow-lg transition-all duration-300 hover:-translate-x-1 hover:shadow-xl hover:scale-110 border border-white`}
              title={link.name}
            >
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </a>
          );
        })}
      </div>

      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row min-h-screen pt-20">

        {/* Left Side - Designer */}
        <div className="order-2 md:order-none md:flex-1 relative flex items-center justify-center md:justify-end md:pr-[16vw] xl:pr-[18vw] pt-4 pb-0 px-8 md:p-8 z-10">
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
        <div className="order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 w-full md:w-auto flex flex-col items-center justify-center pt-2 pb-8 md:py-0 gap-6">




          <div className="relative w-[450px] h-[450px] max-w-[100vw] md:w-[min(950px,90vh)] md:h-[min(950px,90vh)] max-h-[100vh]">
            {/* Split Blur Effect */}
            <div className="absolute inset-0 z-0 flex items-center justify-center scale-110 opacity-60">
              <div className="w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-transparent blur-[80px] -translate-x-10 rounded-full mix-blend-multiply"></div>
              <div className="w-full h-full bg-gradient-to-l from-cyan-400 via-blue-500 to-transparent blur-[80px] translate-x-10 rounded-full mix-blend-multiply"></div>
            </div>

            {/* LAYER 1: Shadow for Base text (behind image) */}
            <div className="absolute top-20 md:top-28 left-1/2 -translate-x-1/2 z-[4] text-center w-full pointer-events-none">
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] whitespace-nowrap outline-text-mobile md:outline-text-desktop">
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
              className="relative z-10 object-contain profile-mask select-none pointer-events-none transform-gpu will-change-transform scale-[1.1] md:scale-[1.15] translate-y-4 lg:translate-y-8"
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
              <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest uppercase text-transparent whitespace-nowrap outline-text-front-mobile md:outline-text-front-desktop">
                Content Creator
              </h2>
            </div>
          </div>


        </div>

        {/* Right Side - Coder */}
        <div className="order-3 md:order-none md:flex-1 relative flex items-center justify-center md:justify-start md:pl-[16vw] xl:pl-[18vw] pt-2 pb-8 px-8 md:p-8 z-10">
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
                
                  }
                }
              `}</pre>
            </div>

            <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-100 blur-3xl rounded-full -z-10 opacity-70"></div>
          </div>
        </div>

      </main>

      {/* About Me Section */}
      <section id="about" className="pb-0 pt-10 relative z-30 font-sans">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-sm border border-white/80">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              About Me <span className="text-blue-600">.</span>
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              I am an undergraduate at Wayamba University of Sri Lanka, a programmer, and a photographer working at the intersection of technology and digital media. By combining a strong technical background with a passion for cinematic storytelling, I build digital solutions and content designed to be experienced rather than just consumed. Whether I am developing software or producing high-quality tech reviews and travel vlogs for YouTube.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
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

      {/* Projects Section */}
      <section className="pt-20 pb-14 md:pt-28 md:pb-14 relative z-30">
        <div className="container mx-auto px-6">
          <Projects />
        </div>
      </section>

      {/* Resume Section - Kept existing component */}
      <section className="pt-0 pb-28 md:pt-14 md:pb-20 relative z-30">
        <div className="container mx-auto px-6">
          <Resume />
        </div>
      </section>

      {/* Footer / Copyright */}
      <footer className="w-full text-center py-6 text-gray-400 text-sm md:text-base z-30 relative bg-white pb-24 md:pb-6">
        <p>© 2026 Kaveeth Manodhya. All rights reserved.</p>
      </footer>

    </div>
  );
}