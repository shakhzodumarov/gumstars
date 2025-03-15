"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from "./SoftSkillsSlide.module.scss";
import { useTranslations } from 'next-intl';

const ConnectedDotsAnimation = () => {
  const t = useTranslations('HomePage');
  // State to store dot positions
  const [dots, setDots] = useState([]);
  const [pathProgress, setPathProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 1500, height: 500 });
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const animationComplete = useRef(false);

  // Generate fixed dots
  useEffect(() => {
    // Function to generate fixed, non-crossing dots
    const generateFixedDots = () => {
      const newDots = [
        { id: 0, x: 100, y: 150, label: t('niggaonetenr'), labels: t('niggaonetent') },
        { id: 1, x: 1200, y: 50, label: t('niggaoneteny'), labels: t('niggaonetenu') },
        { id: 2, x: 700, y: 100, label: t('niggaoneteni'), labels: t('niggaoneteno') },
        { id: 3, x: 900, y: 180, label: t('niggaonetenp'), labels: t('niggasinparis') },
        { id: 4, x: 450, y: 20, label: t('niggasinparisone'), labels: t('niggasinparistwo') }
      ];
      
      return newDots;
    };

    // Generate initial dots
    //@ts-ignore
    setDots(generateFixedDots());
    
    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
         //@ts-ignore
        const width = containerRef.current.clientWidth;
        const height = Math.min(600, window.innerHeight - 100);
        setCanvasSize({ width, height });
      }
    };
    
    // Initial size check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (dots.length === 0 || animationComplete.current) return;
    
    let startTime;
    const duration = 8000; // 5 seconds for complete animation
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / duration, 1);
      setPathProgress(progress);
      
      if (progress < 1) {
         //@ts-ignore
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation is complete
        animationComplete.current = true;
      }
    };
     //@ts-ignore
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dots]);

  // Calculate path for SVG that avoids line crossings
  const createPath = () => {
    if (dots.length === 0) return "";
    
    // Create an optimal path that avoids crossings
    // Using a simple nearest-neighbor approach
    const visited = new Set([0]); // Start with the first dot
    const path = [0]; // Path as indices
    
    while (visited.size < dots.length) {
      const lastIndex = path[path.length - 1];
      let bestNextIndex = -1;
      let bestDistance = Infinity;
      
      // Find the closest unvisited dot
      for (let i = 0; i < dots.length; i++) {
        if (!visited.has(i)) {
          const distance = Math.sqrt(
             //@ts-ignore
            Math.pow(dots[i].x - dots[lastIndex].x, 2) + 
             //@ts-ignore
            Math.pow(dots[i].y - dots[lastIndex].y, 2)
          );
          
          if (distance < bestDistance) {
            bestDistance = distance;
            bestNextIndex = i;
          }
        }
      }
      
      path.push(bestNextIndex);
      visited.add(bestNextIndex);
    }
    
    // Create path commands from the optimized path
    const pathCommands = [];
    path.forEach((dotIndex, index) => {
      if (index === 0) {
         //@ts-ignore
        pathCommands.push(`M ${dots[dotIndex].x} ${dots[dotIndex].y}`);
      } else {
         //@ts-ignore
        pathCommands.push(`L ${dots[dotIndex].x} ${dots[dotIndex].y}`);
      }
    });
    
    return pathCommands.join(" ");
  };

  // Calculate animated path length
  const getAnimatedPath = () => {
    if (dots.length === 0) return "";
    
    const path = createPath();
    const fullPath = path;
    
    if (pathProgress >= 1) return fullPath;
    
    const totalLength = calculatePathLength();
    const currentLength = totalLength * pathProgress;
    
    // Optimize path by using nearest neighbor algorithm
    const visited = new Set([0]);
    const pathOrder = [0];
    
    while (visited.size < dots.length) {
      const lastIndex = pathOrder[pathOrder.length - 1];
      let bestNextIndex = -1;
      let bestDistance = Infinity;
      
      for (let i = 0; i < dots.length; i++) {
        if (!visited.has(i)) {
          const distance = Math.sqrt(
             //@ts-ignore
            Math.pow(dots[i].x - dots[lastIndex].x, 2) + 
             //@ts-ignore
            Math.pow(dots[i].y - dots[lastIndex].y, 2)
          );
          
          if (distance < bestDistance) {
            bestDistance = distance;
            bestNextIndex = i;
          }
        }
      }
      
      pathOrder.push(bestNextIndex);
      visited.add(bestNextIndex);
    }
    
    // Calculate points along the path
    let distanceSoFar = 0;
     //@ts-ignore
    const pathCommands = ["M " + dots[pathOrder[0]].x + " " + dots[pathOrder[0]].y];
    
    for (let i = 1; i < pathOrder.length; i++) {
      const fromDot = dots[pathOrder[i - 1]];
      const toDot = dots[pathOrder[i]];
      
      const segmentLength = Math.sqrt(
         //@ts-ignore
        Math.pow(toDot.x - fromDot.x, 2) + Math.pow(toDot.y - fromDot.y, 2)
      );
      
      if (distanceSoFar + segmentLength <= currentLength) {
        // Include the whole segment
         //@ts-ignore
        pathCommands.push(`L ${toDot.x} ${toDot.y}`);
        distanceSoFar += segmentLength;
      } else {
        // Include partial segment
        const remainingLength = currentLength - distanceSoFar;
        const ratio = remainingLength / segmentLength;
         //@ts-ignore
        const partialX = fromDot.x + (toDot.x - fromDot.x) * ratio;
         //@ts-ignore
        const partialY = fromDot.y + (toDot.y - fromDot.y) * ratio;
        
        pathCommands.push(`L ${partialX} ${partialY}`);
        break;
      }
    }
    
    return pathCommands.join(" ");
  };

  // Calculate total path length
  const calculatePathLength = () => {
    // Optimize path by using nearest neighbor algorithm
    const visited = new Set([0]);
    const pathOrder = [0];
    
    while (visited.size < dots.length) {
      const lastIndex = pathOrder[pathOrder.length - 1];
      let bestNextIndex = -1;
      let bestDistance = Infinity;
      
      for (let i = 0; i < dots.length; i++) {
        if (!visited.has(i)) {
          const distance = Math.sqrt(
             //@ts-ignore
            Math.pow(dots[i].x - dots[lastIndex].x, 2) + 
             //@ts-ignore
            Math.pow(dots[i].y - dots[lastIndex].y, 2)
          );
          
          if (distance < bestDistance) {
            bestDistance = distance;
            bestNextIndex = i;
          }
        }
      }
      
      pathOrder.push(bestNextIndex);
      visited.add(bestNextIndex);
    }
    
    // Calculate total length
    let totalLength = 0;
    for (let i = 1; i < pathOrder.length; i++) {
      const fromDot = dots[pathOrder[i - 1]];
      const toDot = dots[pathOrder[i]];
      
      const segmentLength = Math.sqrt(
         //@ts-ignore
        Math.pow(toDot.x - fromDot.x, 2) + Math.pow(toDot.y - fromDot.y, 2)
      );
      
      totalLength += segmentLength;
    }
    
    return totalLength;
  };

  return (
    <div className={styles.guestbed} ref={containerRef}>
      <h1>{t('niggaonetene')}</h1>
      <div className={styles.homeissafe}>
        <svg 
          width={canvasSize.width} 
          height={canvasSize.height} 
        
          
        >
          {/* Animated connecting line */}
          <path
            d={getAnimatedPath()}
            fill="none"
            stroke="#808080"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Dots */}
          {dots.map((dot, index) => (
             //@ts-ignore
            <g key={dot.id} >
              
              {/* Dot */}
              <circle 
               //@ts-ignore
                cx={dot.x}
                 //@ts-ignore
                cy={dot.y}
                r="18"
                fill={index === 0 ? "#07a241" : "#07a241"}
                stroke="#fff"
                strokeWidth="2"
              />
              <br />
          
              <text
               //@ts-ignore
                x={dot.x}
                 //@ts-ignore
                y={dot.y + 130}
                textAnchor="middle"
                fontSize="24"
                fontWeight="700"
                fill="#07a241"
                
               
              >
                {/* @ts-ignore */}
                {dot.label}
              </text>
              <text
               //@ts-ignore
                x={dot.x}
                 //@ts-ignore
                y={dot.y + 160}
                textAnchor="middle"
                fontSize="13"
                fill="#6b7280"
   
  
              >
          
                {/* @ts-ignore */}
                {dot.labels}

              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ConnectedDotsAnimation;