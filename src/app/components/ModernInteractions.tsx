"use client";

import React, { useState, useEffect } from "react";

interface ModernInteractionsProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "rotate";
  loadingState?: boolean;
}

export default function ModernInteractions({ 
  children, 
  className = "", 
  hoverEffect = "lift",
  loadingState = false 
}: ModernInteractionsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getHoverClass = () => {
    switch (hoverEffect) {
      case "lift":
        return "hover-lift";
      case "glow":
        return "hover-glow";
      case "scale":
        return "hover-scale";
      case "rotate":
        return "hover-rotate";
      default:
        return "hover-lift";
    }
  };

  return (
    <div 
      className={`modern-interaction ${getHoverClass()} ${className} ${isLoaded ? "loaded" : ""} ${loadingState ? "loading" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}

// Styles pour les micro-interactions
const interactionStyles = `
  .modern-interaction {
    position: relative;
    overflow: hidden;
  }
  
  .modern-interaction::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  .modern-interaction:hover::before {
    left: 100%;
  }
  
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  
  .hover-glow:hover {
    box-shadow: 0 0 30px rgba(99,102,241,0.3);
    transform: scale(1.02);
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .hover-rotate:hover {
    transform: rotate(2deg) scale(1.02);
  }
  
  .modern-interaction.loaded {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .modern-interaction.loading {
    position: relative;
  }
  
  .modern-interaction.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f4f6;
    border-top: 2px solid #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Effet de focus pour l'accessibilité */
  .modern-interaction:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
  
  /* Animation de pulse pour les éléments importants */
  .modern-interaction.pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

// Injecter les styles
if (typeof document !== "undefined") {
  const styleId = "modern-interactions-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = interactionStyles;
    document.head.appendChild(style);
  }
} 