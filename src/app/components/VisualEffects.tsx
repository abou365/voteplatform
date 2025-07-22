"use client";

import React, { useEffect, useRef } from "react";

interface VisualEffectsProps {
  children: React.ReactNode;
  effect?: "particles" | "gradient" | "depth" | "none";
  intensity?: "low" | "medium" | "high";
}

export default function VisualEffects({ 
  children, 
  effect = "none",
  intensity = "medium" 
}: VisualEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (effect === "particles" && containerRef.current) {
      createParticles();
    }
  }, [effect]);

  const createParticles = () => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = intensity === "high" ? 50 : intensity === "medium" ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(99,102,241,${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
        z-index: 1;
      `;
      container.appendChild(particle);
    }
  };

  const getEffectClass = () => {
    switch (effect) {
      case "particles":
        return "particles-effect";
      case "gradient":
        return "gradient-effect";
      case "depth":
        return "depth-effect";
      default:
        return "";
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`visual-effects ${getEffectClass()} ${intensity}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

// Styles pour les effets visuels
const visualStyles = `
  .visual-effects {
    position: relative;
  }
  
  .particles-effect {
    position: relative;
  }
  
  .gradient-effect {
    background: linear-gradient(45deg, #f8fafc, #e0e7ff, #c7d2fe, #a5b4fc);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
  }
  
  .depth-effect {
    perspective: 1000px;
  }
  
  .depth-effect > * {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }
  
  .depth-effect:hover > * {
    transform: translateZ(20px);
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* Effet de glassmorphism */
  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
  }
  
  /* Effet de néon */
  .neon-effect {
    box-shadow: 
      0 0 5px rgba(99,102,241,0.5),
      0 0 10px rgba(99,102,241,0.3),
      0 0 15px rgba(99,102,241,0.1);
  }
  
  /* Effet de morphing */
  .morph-effect {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .morph-effect:hover {
    border-radius: 20px;
    transform: scale(1.02);
  }
`;

// Injecter les styles
if (typeof document !== "undefined") {
  const styleId = "visual-effects-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = visualStyles;
    document.head.appendChild(style);
  }
} 