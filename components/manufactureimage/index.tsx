"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './InteractiveManufacturingImage.module.scss';
import { useTranslations } from 'next-intl';

interface HotspotInfo {
  id: string;
  title: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
  shape: 'rectangle' | 'circle' | 'polygon';
  width?: string;
  height?: string;
  radius?: string;
  points?: string; // For polygon shapes
}

interface InteractiveManufacturingImageProps {
  imageSrc: string;
  imageAlt: string;
}

const InteractiveManufacturingImage: React.FC<InteractiveManufacturingImageProps> = ({
  imageSrc = "/api/placeholder/1200/800",
  imageAlt = "Manufacturing facility layout"
}) => {
  const t = useTranslations('HomePage');
  // Define the four manufacturing sections/hotspots with different shapes
  const hotspots: HotspotInfo[] = [
    {
      id: "raw-materials",
      title: t('niggasinparisthree'),
      description: t('contactLink'),
      position: { top: "40%", left: "8%" },
      shape: 'rectangle',
      width: "20%",
      height: "45%"
    },
    {
      id: "assembly",
      title: t('niggasinparisthreee'),
      description: t('contactLink'),
      position: { top: "40%", left: "92%" },
      shape: 'rectangle',
      width: "8%",
      height: "40%"
    },
    {
      id: "quality-control",
      title: t('homeLink'),
      description: t('contactLink'),
      position: { top: "24%", left: "28%" },
      shape: 'rectangle',
      width: "64%",
      height: "60%"
    },

  ];

  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const hotspotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Render different hotspot shapes
  const renderHotspot = (hotspot: HotspotInfo) => {
    if (hotspot.shape === 'rectangle') {
      return (
        <div
          key={hotspot.id}
          //@ts-ignore
          ref={el => hotspotRefs.current[hotspot.id] = el}
          className={styles.hotspot}
          style={{
            position: 'absolute',
            top: hotspot.position.top,
            left: hotspot.position.left,
            width: hotspot.width,
            height: hotspot.height
          }}
          onMouseEnter={() => setActiveHotspot(hotspot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          <span className={styles.hotspotIndicator}>+</span>
        </div>
      );
    } else if (hotspot.shape === 'circle') {
      return (
        <div
          key={hotspot.id}
          //@ts-ignore
          ref={el => hotspotRefs.current[hotspot.id] = el}
          className={styles.hotspot}
          style={{
            position: 'absolute',
            top: hotspot.position.top,
            left: hotspot.position.left,
            width: hotspot.radius,
            height: hotspot.radius,
            borderRadius: '50%'
          }}
          onMouseEnter={() => setActiveHotspot(hotspot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          <span className={styles.hotspotIndicator}>+</span>
        </div>
      );
    } else if (hotspot.shape === 'polygon') {
      return (
        <div
          key={hotspot.id}
          //@ts-ignore
          ref={el => hotspotRefs.current[hotspot.id] = el}
          className={styles.hotspotPolygon}
          style={{
            position: 'absolute',
            top: hotspot.position.top,
            left: hotspot.position.left,
            width: '100px', // Container size for the SVG
            height: '100px'
          }}
          onMouseEnter={() => setActiveHotspot(hotspot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          <svg width="100%" height="100%" viewBox="0 0 30 30">
            <polygon 
              points={hotspot.points}
              className={styles.polygon}
            />
            <text x="10" y="15" fill="white" fontSize="14">+</text>
          </svg>
        </div>
      );
    }
  };

  // Get the position for the info box
  const getInfoBoxPosition = () => {
    if (!activeHotspot) return {};
    
    const hotspotElement = hotspotRefs.current[activeHotspot];
    if (!hotspotElement) return {};

    const rect = hotspotElement.getBoundingClientRect();
    const containerRect = hotspotElement.offsetParent?.getBoundingClientRect();
    
    if (!containerRect) return {};

    // Position above the hotspot
    return {
      position: 'absolute',
      top: `${rect.top - containerRect.top - 120}px`,
      left: `${rect.left - containerRect.left}px`
    };
  };

  return (
    <div className={styles.container}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.image}
      />
      
      {/* Hotspot overlays */}
      {hotspots.map(renderHotspot)}
      
      {/* Info box */}
      {activeHotspot && (
        <div 
          className={styles.infoBox}
          //@ts-ignore
          style={getInfoBoxPosition()}
        >
          <h3 className={styles.infoTitle}>
            {hotspots.find(h => h.id === activeHotspot)?.title}
          </h3>
          <p className={styles.infoDescription}>
            {hotspots.find(h => h.id === activeHotspot)?.description}
          </p>
          <div className={styles.infoArrow}></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveManufacturingImage;