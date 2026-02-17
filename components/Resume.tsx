'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, MapPin, Mail, Calendar, ExternalLink } from 'lucide-react';

export default function Resume() {
  const experiences = [
    {
      company: 'Alpha Crew Photography',
      role: 'Founder & Photographer',
      url: 'https://alphacrewweb.vercel.app',
      logo: '/alpha-crew.png?v=1',
      period: 'January 2023 - Present (3 years 2 months)',
      location: 'Meerigama, Western Province, Sri Lanka',
      description: [
        'Founded and manage Alpha Crew, a creative photography brand focused on event, portrait, and lifestyle photography.',
        'Oversee creative direction, client coordination, and post production editing.',
        'Collaborate with individuals and brands to deliver visually captivating content.',
        "Building Alpha Crew's digital presence through social media and content creation."
      ]
    },
    {
      company: 'Newgen Lanka Healthcare (Pvt) Ltd',
      role: 'Quality Assurance (QA) Trainee',
      url: '',
      logo: '/newgen_lanka.png?v=1',
      period: 'January 2025 - February 2025 (2 months)',
      location: 'Sri Lanka',
      description: [
        'Worked as a Quality Assurance trainee at Newgen Lanka Healthcare, supporting product quality evaluation and documentation processes.',
        'Assisted in maintaining compliance with manufacturing standards and conducted routine inspections to ensure product integrity.',
        'Gained hands on experience in quality management systems and attention to detail within a professional manufacturing environment.'
      ]
    }
  ];

  const education = [
    {
      institution: 'Wayamba University of Sri Lanka',
      degree: 'B.Sc., Applied Sciences',
      logo: '/wayamba_uni.png?v=2',
      period: 'June 2025'
    },
    {
      institution: 'Bandaranayake College - Gampaha',
      degree: 'Secondary Education',
      logo: '/bandaranayake_college.png?v=2',
      period: 'January 2013 - November 2021'
    }
  ];

  const skills = [
    'YouTube Content Creation',
    'Event Photography',
    'Photography',
    'Video Editing',
    'Social Media Management',
    'Creative Direction',
    'Flyer Design',
    'Professional Photo Editing'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-12">

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex gap-4">
                    {exp.logo && (
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white/10 p-1">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end text-sm text-slate-400 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.url && (
                  <div className="pt-4">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 hover:-translate-y-0.5 border border-blue-400/20 group/btn"
                    >
                      <span className="font-medium">Visit Website</span>
                      <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-start gap-4 h-full">
                  {edu.logo && (
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white/10 p-1">
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center min-h-[4rem]">
                    <h3 className="text-lg font-bold text-slate-100 leading-tight mb-1">{edu.institution}</h3>
                    <p className="text-purple-400 font-medium text-sm">{edu.degree}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 pt-2">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Top Skills
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-full text-slate-300 font-medium transition-all duration-300 hover:text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
