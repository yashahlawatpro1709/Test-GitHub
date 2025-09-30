import React from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "", width = 200, height = 80 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White background rectangle with gold border */}
      <rect
        x="20"
        y="20"
        width="360"
        height="120"
        fill="white"
        stroke="#D4AF37"
        strokeWidth="3"
        rx="8"
      />
      
      {/* AASHNI text */}
      <text
        x="200"
        y="80"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#D4AF37"
        fontSize="42"
        fontFamily="Playfair Display, serif"
        fontWeight="400"
        letterSpacing="8px"
      >
        AASHNI
      </text>
      
      {/* Horizontal line with crown symbol - exact replica of second image */}
      <g>
        {/* Left horizontal line */}
        <line
          x1="60"
          y1="110"
          x2="175"
          y2="110"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        
        {/* Right horizontal line */}
        <line
          x1="225"
          y1="110"
          x2="340"
          y2="110"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        
        {/* Decorative center design - distinct but barely connected shapes */}
        <g transform="translate(200, 110)" fill="#D4AF37">
          {/* Left arrow pointing right, barely touching center */}
          <polygon points="-25,0 -18,-8 -15,-3 -8,0 -15,3 -18,8"/>
          
          {/* Center rhombus - distinct shape */}
          <polygon points="-8,0 0,-10 8,0 0,10"/>
          
          {/* Right arrow pointing left, barely touching center */}
          <polygon points="25,0 18,8 15,3 8,0 15,-3 18,-8"/>
        </g>
      </g>
    </svg>
  )
}

export function LogoMark({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Square background with gold border */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        fill="white"
        stroke="#D4AF37"
        strokeWidth="2"
        rx="4"
      />
      
      {/* A letter */}
      <text
        x="20"
        y="26"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#D4AF37"
        fontSize="20"
        fontFamily="Playfair Display, serif"
        fontWeight="400"
      >
        A
      </text>
    </svg>
  )
}