
import React from 'react';

/**
 * Reusable Testimonial Card Component
 * @param {string} quote - The client's testimonial text
 * @param {string} name - The name of the client
 * @param {string} role - The job title or role
 * @param {string} image - The URL for the avatar
 * @param {number} stars - Number of stars (default: 5)
 */
export default function TestimonialCard({ quote, name, role, image, stars = 5 }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      {/* Dynamic Star Rendering */}
      <div className="flex text-yellow-400 mb-4">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="material-symbols-outlined text-sm">star</span>
        ))}
      </div>

      <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
        "{quote}"
      </p>

      <div className="flex items-center gap-3">
        {/* Avatar Div with fixed React style object */}
        <div 
          role="img"
          aria-label={name}
          className="size-10 rounded-full bg-slate-200 bg-cover bg-center ring-2 ring-primary/10" 
          style={{ backgroundImage: `url(${image})` }}
        />
        <div>
          <h5 className="text-slate-900 dark:text-white font-bold text-sm">{name}</h5>
          <p className="text-slate-500 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}