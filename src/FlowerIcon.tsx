import React from 'react';

export function FlowerIcon({ color = '#d946ef', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="4" fill={color} opacity="0.9" />
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#flowerGradient)" transform="rotate(0 16 16)" />
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#flowerGradient)" transform="rotate(72 16 16)" />
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#flowerGradient)" transform="rotate(144 16 16)" />
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#flowerGradient)" transform="rotate(216 16 16)" />
      <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#flowerGradient)" transform="rotate(288 16 16)" />
    </svg>
  );
}

// Nuevo icono para la agenda
export function CalendarIcon({ color = '#d946ef', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="22" rx="4" fill="url(#calendarGradient)" />
      <rect x="6" y="10" width="20" height="16" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="8" y="2" width="2" height="6" rx="1" fill={color} />
      <rect x="22" y="2" width="2" height="6" rx="1" fill={color} />
      <circle cx="11" cy="15" r="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="16" cy="15" r="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="21" cy="15" r="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="11" cy="20" r="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="16" cy="20" r="1.5" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

// Nuevo icono para pacientes
export function PatientsIcon({ color = '#d946ef', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="patientsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="10" r="4" fill="url(#patientsGradient)" />
      <path d="M6 24c0-4 3-7 7-7s7 3 7 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="23" cy="8" r="3" fill={color} fillOpacity="0.7" />
      <path d="M18 22c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" fillOpacity="0.7" />
      <circle cx="16" cy="18" r="1" fill={color} />
      <circle cx="24" cy="20" r="1" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

// Icono de regreso mejorado
export function BackIcon({ color = '#64748b', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
