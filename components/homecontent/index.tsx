"use client";
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import styles from './WorldMap.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/routing";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Updated country information with images instead of shapes


const WorldMap = () => {
    const t = useTranslations('HomePage');
  const [activeCountry, setActiveCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(0);

  const countryInfo = {
    [t('collectionwatch')]: {
    description: t('shitbag'),
    image: "/images/images/uzb.jpg",
    flagImage: "/images/images/location.png", // Add country flag or representative image
    size: 40 // Size for the image display
  },
  [t('wideadtitledescone')]: {
    description: t('shitbag'),
    image: "/images/images/paris.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('collectionphones')]: {
    description: t('shitbag'),
    image: "/images/images/turkey.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('callaccessories')]: {
    description: t('shitbag'),
    image: "/images/images/china.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('collectionaccessories')]: {
    description: t('shitbag'),
    image: "/images/images/india.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('callaccessoriesone')]: {
    description: t('shitbag'),
    image: "/images/images/malasiya.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('servislar')]: {
    description: t('shitbag'),
    image: "/images/images/belgium.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('wideadtitledesc')]: {
    description: t('shitbag'),
    image: "/images/images/berlin.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  },
  [t('collectionipad')]: {
    description: t('shitbag'),
    image: "/images/images/switzerland.jpg",
    flagImage: "/images/images/location.png",
    size: 70
  }
};

const markers = [
  { name: t('collectionwatch'), coordinates: [-40.3451, 35.3775] },
  { name: t('wideadtitledescone'), coordinates: [-179.2137, 86.2276] },
  { name: t('collectionphones'), coordinates: [-75.2433, 35.9637] },
  { name: t('callaccessories'), coordinates: [24.1954, 25.8617] },
  { name: t('collectionaccessories'), coordinates: [-18.9629, 10.5937] },
  { name: t('callaccessoriesone'), coordinates: [21.9758, -14.2105] },
  { name: t('servislar'), coordinates: [-169.9699, 95.5039] },
  { name: t('wideadtitledesc'), coordinates: [-145.4515, 80.1657] },
  { name: t('collectionipad'), coordinates: [-134.2275, 67.8182] }
];
  const uzbekistanCoordinates = markers.find(
    (marker) => marker.name === t('collectionwatch')
  )?.coordinates;
  
  // Countries to animate through (excluding Uzbekistan)
  const countriesToAnimate = markers.filter(marker => marker.name !== t('collectionwatch'));

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      //@ts-ignore
      setActiveCountry(countriesToAnimate[animationIndex].name);
      setAnimationIndex((prevIndex) => 
        (prevIndex + 1) % countriesToAnimate.length
      );
    }, 3000); // Change country every 3 seconds
    
    return () => clearInterval(interval);
  }, [animationIndex]);

  return (
    <div className={styles.thehomepage}>
      {/* <img src="
      /images/images/horror.png
      " alt="" 
      className={styles.nimaga}
      /> */}
    <div className={styles.something__container}>
      <div className={styles.something__mapWrapper}>
        <ComposableMap
          projectionConfig={{ scale: 190 }}
          className={styles.something__map}
        >
          {/* Display world map */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={styles.something__geography}
                />
              ))
            }
          </Geographies>

          {/* Mark countries */}
          {markers.map(({ name, coordinates }) => {
            const isActive = name === activeCountry;
            const isHovered = name === hoveredCountry;
            const shouldShowImage = isActive || isHovered;
            const countrySize = countryInfo[name]?.size || 40;
            
            return (
              <Marker
                key={name}
                coordinates={coordinates}
                //@ts-ignore
                onClick={() => setActiveCountry(name !== t('collectionwatch') ? name : null)}
                //@ts-ignore
                onMouseEnter={() => setHoveredCountry(name)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <g>
                  {/* Country image - only visible when active or hovered */}
                  {/* @ts-ignore */}
                  {shouldShowImage && countryInfo[name]?.flagImage && (
                    <g transform={`translate(-${countrySize/2}, -${countrySize/2})`}>
                      <svg width={countrySize} height={countrySize}>
                        <image
                        //@ts-ignore
                          href={countryInfo[name].flagImage}
                          width={countrySize}
                          height={countrySize}
                          clipPath={`url(#imageClip-${name})`}
                        />
                        {/* Define a clip path for the image */}
                        <defs>
                          <clipPath id={`imageClip-${name}`}>
                            <circle cx={countrySize/2} cy={countrySize/2} r={countrySize/2} />
                          </clipPath>
                        </defs>
                      </svg>
                    </g>
                  )}
                  
                  {/* Circle background when no image is shown */}
                  {!shouldShowImage && (
                    <circle
                      r={name === t('collectionwatch') ? 15 : 12}
                      fill={name === t('collectionwatch') ? "#ffffff" : "#07a241"}
                      className={styles.something__marker}
                    />
                  )}
                  
                  {/* Star icon when no image is shown */}
                  {!shouldShowImage && (
                    <svg x="-10" y="-10" width="20" height="20">
                      <image
                        href={"/images/images/stars.png"}
                        width="20"
                        height="20"
                        clipPath={`url(#circleClip-${name})`}
                      />
                      {/* Define a clip path to make the image circular */}
                      <defs>
                        <clipPath id={`circleClip-${name}`}>
                          <circle cx="10" cy="10" r="10" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  
                  {/* Country name */}
                  <text
                    textAnchor="middle"
                    y={shouldShowImage ? -countrySize/2 - 10 : -18}
                    className={name === activeCountry ? `${styles.something__marker} active` : styles.something__marker}
                  >
                    {name}
                  </text>
                </g>
              </Marker>
            );
          })}

          {/* Draw line between Uzbekistan and active country */}
          {activeCountry && uzbekistanCoordinates && (
            <Line
              from={uzbekistanCoordinates}
              to={markers.find((marker) => marker.name === activeCountry)?.coordinates}
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="5,5"
              className={styles.something__line}
            />
          )}
        </ComposableMap>
      </div>
      
      {/* Info box */}
      <div className={styles.something__infoBox}>
        {activeCountry && countryInfo[activeCountry] && (
          <div className={styles.something__infoContent}>
            <h2>{activeCountry}</h2>
            {/* @ts-ignore */}
            {countryInfo[activeCountry].image && (
              <div className={styles.something__flagContainer}>
                <img 
                //@ts-ignore
                  src={countryInfo[activeCountry].image} 
                  alt={`${activeCountry} flag`}
                  className={styles.something__flag}
                />
              </div>
            )}
            {/* @ts-ignore */}
            <p>{countryInfo[activeCountry].description}</p>
            <Link
            href={"/company"}
            >
            <button className={styles.thebutton}>{t('loading')}</button></Link>
          </div>
        )}
        {!activeCountry && (
          <div className={styles.something__infoPlaceholder}>
            <p>Select a country to see information</p>
          </div>
        )}
      </div>
    </div></div>
  );
};

export default WorldMap;
