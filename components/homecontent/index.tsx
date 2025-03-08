"use client";
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import styles from './WorldMap.module.scss';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Added country information with custom polygon shapes
const countryInfo = {
  "Uzbekistan": {
    description: "Uzbekistan is known for its mosques, mausoleums and other sites linked to the Silk Road.",
    image: "/images/images/uzb.jpg",
    shape: {
      sides: 8, // Octagon
      color: "#2dde82", // Green
      size: 40 // Half the box size (radius)
    }
  },
  "France": {
    description: "France is known for its cuisine, culture, and historic landmarks like the Eiffel Tower.",
    image: "/images/images/paris.jpg",
    shape: {
      sides: 4, // Hexagon
      color: "#2dde82", // Blue
      size: 40
    }
  },
  "Turkey": {
    description: "Turkey is a transcontinental country spanning both Europe and Asia.",
    image: "/images/images/turkey.jpg",
    shape: {
      sides: 14, // 14-sided polygon
      color: "#2dde82", // Yellow
      size: 50
    }
  },
  "China": {
    description: "China is the world's most populous country with a history spanning thousands of years.",
    image: "/images/images/china.jpg",
    shape: {
      sides: 5, // 20-sided polygon
      color: "#2dde82", // Red
      size: 120
    }
  },
  "India": {
    description: "India is known for its diverse culture, cuisine, and architectural wonders like the Taj Mahal.",
    image: "/images/images/india.jpg",
    shape: {
      sides: 10, // Decagon
      color: "#2dde82", // Orange
      size: 50
    }
  },
  "Malaysia": {
    description: "Malaysia is known for its beaches, rainforests, and mix of cultural influences.",
    image: "/images/images/malasiya.jpg",
    shape: {
      sides: 5, // Pentagon
      color: "#2dde82", // Purple
      size: 50
    }
  },
  "Belgium": {
    description: "Belgium is known for its medieval towns, Renaissance architecture, and as headquarters of the EU.",
    image: "/images/images/belgium.jpg",
    shape: {
      sides: 12, // Dodecagon
      color: "#2dde82", // Dark blue
      size: 50
    }
  },
  "Germany": {
    description: "Germany is known for its rich history, technological innovations, and cultural contributions.",
    image: "/images/images/berlin.jpg",
    shape: {
      sides: 5, // Square
      color: "#2dde82", // Teal
      size: 40
    }
  },
  "Switzerland": {
    description: "Switzerland is known for its mountains, lakes, chocolate, and banking system.",
    image: "/images/images/switzerland.jpg",
    shape: {
      sides: 6, // Triangle
      color: "#2dde82", // Dark red
      size: 20
    }
  }
};

const markers = [
  { name: "Uzbekistan", coordinates: [-50.3451, 5.3775] },
  { name: "France", coordinates: [-179.2137, 56.2276] },
  { name: "Turkey", coordinates: [-95.2433, 5.9637] },
  { name: "China", coordinates: [34.1954, -5.8617] },
  { name: "India", coordinates: [-28.9629, -40.5937] },
  { name: "Malaysia", coordinates: [51.9758, -74.2105] },
  { name: "Belgium", coordinates: [-179.9699, 60.5039] },
  { name: "Germany", coordinates: [-160.4515, 60.1657] },
  { name: "Switzerland", coordinates: [-144.2275, 47.8182] }
];

// Function to create polygon points
const createPolygonPoints = (sides, size) => {
  const points = [];
  const angleStep = (Math.PI * 2) / sides;
  
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    //@ts-ignore
    points.push(`${x},${y}`);
  }
  
  return points.join(' ');
};

const WorldMap = () => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedShapes, setEditedShapes] = useState({});
  
  const uzbekistanCoordinates = markers.find(
    (marker) => marker.name === "Uzbekistan"
  )?.coordinates;
  
  // Countries to animate through (excluding Uzbekistan)
  const countriesToAnimate = markers.filter(marker => marker.name !== "Uzbekistan");

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

  // Handle shape editing
  const handleShapeChange = (country, property, value) => {
    setEditedShapes(prev => ({
      ...prev,
      [country]: {
        ...(prev[country] || {}),
        [property]: value
      }
    }));
  };

  // Get shape properties with edits applied
  const getShapeProps = (country) => {
    const defaultProps = countryInfo[country]?.shape || { sides: 4, color: "#000000", size: 50 };
    const editedProps = editedShapes[country] || {};
    
    return {
      ...defaultProps,
      ...editedProps
    };
  };

  return (
    <div className={styles.something__container}>
      <div className={styles.something__mapWrapper}>
        <ComposableMap
          projectionConfig={{ scale: 215 }}
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
            const shouldShowShape = isActive || isHovered;
            const shapeProps = getShapeProps(name);
            
            return (
              <Marker
                key={name}
                coordinates={coordinates}
                //@ts-ignore
                onClick={() => setActiveCountry(name !== "Uzbekistan" ? name : null)}
                //@ts-ignore
                onMouseEnter={() => setHoveredCountry(name)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <g>
                  {/* Custom polygon shape - only visible when active or hovered */}
                  {shouldShowShape && (
                    <g transform={`translate(0, 0)`}>
                      <polygon 
                        points={createPolygonPoints(shapeProps.sides, shapeProps.size)}
                        fill={shapeProps.color}
                        stroke="#000"
                        strokeWidth="1"
                        opacity="0.8"
                        className={styles.something__customShape}
                      />
                    </g>
                  )}
                  
                  {/* Circle background */}
                  <circle
                    r={name === activeCountry || name === "Uzbekistan" ? 15 : 12}
                    fill={name === activeCountry ? "#07a241" : name === "Uzbekistan" ? "#ffffff" : "#07a241"}
                    className={styles.something__marker}
                  />
                  
                  {/* Add image with SVG image element */}
                  <svg x="-10" y="-10" width="20" height="20">
                    <image
                      href={"/images/images/gumstars.png"}
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
                  
                  {/* Country name */}
                  <text
                    textAnchor="middle"
                    y={-18}
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
            <button className={styles.thebutton}>batafsil</button>
          </div>
        )}
        {!activeCountry && (
          <div className={styles.something__infoPlaceholder}>
            <p>Select a country to see information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
