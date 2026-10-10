'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export default function GameCard({ title, description, imageSrc, link }: GameCardProps) {
  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02] border border-gray-800">
        {/* Card Top */}
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
          
          {/* Card Suit Icons in Corners */}
          <div className="absolute top-2 left-2 text-black text-xl">♠</div>
          <div className="absolute top-2 right-2 text-card-red text-xl">♥</div>
          <div className="absolute bottom-2 left-2 text-card-blue text-xl">♣</div>
          <div className="absolute bottom-2 right-2 text-card-red text-xl">♦</div>
        </div>
        
        {/* Card Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
          <p className="text-black text-sm mb-4">{description}</p>
          <Link href={link}>
            <div className="inline-block bg-white hover:bg-white border border-black text-black font-medium py-2 px-4 rounded-lg transition-colors">
              Play Now
            </div>
          </Link>
        </div>
      </div>
      
      {/* Card Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-card-blue opacity-0 group-hover:opacity-30 rounded-xl blur-sm transition-opacity duration-300"></div>
    </div>
  );
} 