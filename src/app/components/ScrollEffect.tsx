"use client";

import React, { useEffect, useRef } from "react";

interface ScrollEffectProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export default function ScrollEffect({ 
  children, 
  className = "", 
  threshold = 0.1, 
  rootMargin = "0px 0px -50px 0px",
  delay = 0
}: ScrollEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("scroll-visible");
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, delay]);

  return (
    <div 
      ref={ref} 
      className={`scroll-effect ${className}`}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}

// Styles globaux pour l'effet de scroll moderne
const scrollStyles = `
  .scroll-effect.scroll-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  /* Animation moderne avec bounce */
  .scroll-effect.scroll-visible.scroll-bounce {
    animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  
  /* Animation de scale avec effet de profondeur */
  .scroll-effect.scroll-visible.scroll-scale {
    animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  /* Animation slide depuis le bas avec fade */
  .scroll-effect.scroll-visible.scroll-from-bottom {
    animation: slideUpFade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  /* Animation slide depuis la gauche */
  .scroll-effect.scroll-visible.scroll-from-left {
    animation: slideRightFade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  /* Animation slide depuis la droite */
  .scroll-effect.scroll-visible.scroll-from-right {
    animation: slideLeftFade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  /* Animation de rotation */
  .scroll-effect.scroll-visible.scroll-rotate {
    animation: rotateIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  /* Animation de typewriter */
  .scroll-effect.scroll-visible.scroll-typewriter {
    animation: typewriter 1.5s steps(40, end) forwards;
  }
  
  /* Animation de glitch */
  .scroll-effect.scroll-visible.scroll-glitch {
    animation: glitch 0.6s ease-in-out forwards;
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(-100px);
    }
    50% {
      opacity: 1;
      transform: scale(1.05) translateY(0);
    }
    70% {
      transform: scale(0.9) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideRightFade {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideLeftFade {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }
  
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
  
  /* Effet de hover sur les cartes */
  .scroll-effect:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
  
  /* Effet de parallax subtil */
  .scroll-effect.scroll-parallax {
    transform: translateZ(0);
    will-change: transform;
  }
`;

// Injecter les styles dans le head
if (typeof document !== "undefined") {
  const styleId = "scroll-effect-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = scrollStyles;
    document.head.appendChild(style);
  }
} 