'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Layout, Github } from 'lucide-react';

export default function Projects() {
    const projects = [
        {
            title: 'Alpha Crew Website',
            category: 'Web Development',
            url: 'https://alphacrewweb.vercel.app',
            githubUrl: 'https://github.com/kaveeth555/ALPHA-Crew-Website', // Update if necessary
            image: '/alpha-crew.png', // using the existing logo as placeholder, or we can use another image if available
            description: 'The official portfolio website for Alpha Crew Photography. Built to showcase a creative photography brand focused on event, portrait, and lifestyle photography.',
            tags: ['Next.js', 'React', 'Cloudinary', 'Tailwind CSS']
        },
        {
            title: 'Portfolio Website',
            category: 'Web Development',
            url: 'https://kaveeth-manodhya.vercel.app', // You can update this later if incorrect
            githubUrl: 'https://github.com/kaveeth555/Kaveeth-Manodhya', // Update if necessary
            image: '/profile-v2.png', // Or another appropriate image
            description: 'A personal portfolio website showcasing my skills, projects, and professional experience as a developer and designer.',
            tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'] // Or similar tags
        },
        {
            title: 'Kodexlk',
            category: 'Web Development',
            url: 'https://kodexlk.online',
            githubUrl: 'https://github.com/kaveethmanodhya/Kodexlk',
            image: '/kodexlk-logo.webp',
            description: 'A modern, high-performance web platform and admin dashboard built for Kodexlk.',
            tags: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Cloudinary', 'Framer Motion']
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-12">
            <section id="projects" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                        <Layout className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Projects
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-100 shadow-md hover:shadow-xl flex flex-col items-start gap-4"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 w-full space-y-4">
                                <div className="flex items-start gap-4">
                                    {project.image && (
                                        <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 p-2 border border-gray-100">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-contain"
                                                sizes="56px"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{project.title}</h3>
                                        <p className="text-emerald-600 font-medium text-sm mt-1">{project.category}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    {project.url && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-black group/btn text-sm"
                                        >
                                            <span className="font-medium">View Website</span>
                                            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-900 border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:bg-white group/btn text-sm"
                                        >
                                            <span className="font-medium">Source Code</span>
                                            <Github className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
