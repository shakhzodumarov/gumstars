"use client";
import { CloseIcon } from "@/components/icons/svgIcons";
import styles from "./gallery.module.scss";
import Image from "next/image";
import { useState } from "react";
import { SK_Box } from "@/components/UI/skeleton";

interface IProps {
  images?: string[];
}

const Gallery = ({ images }: IProps) => {
  const [showZoom, setShowZoom] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100 + "%";
    const y = ((e.clientY - top) / height) * 100 + "%";
    setZoomPosition({ x, y });
  };

  return (
    <div className={styles.gallery}>
      <div 
        className={styles.imageWrapper}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ overflow: "hidden" }}
      >
        {images ? (
          <Image
            src={images[selectedIndex]}
            alt=""
            fill
            sizes="(max-width:500px)"
            className={isHovering ? styles.zoomedImage : ""}
            style={{ transformOrigin: `${zoomPosition.x} ${zoomPosition.y}` }}
            onClick={() => setShowZoom(true)} // To trigger zoom window on image click
          />
        ) : (
          <SK_Box width="90%" height="90%" />
        )}
      </div>
      {images && showZoom ? (
        <div className={styles.zoomWindow}>
          <div className={styles.background} onClick={() => setShowZoom(false)} />
          <div className={styles.mainImage}>
            <button onClick={() => setShowZoom(false)}>
              <CloseIcon width={16} />
            </button>
            <Image src={images[selectedIndex]} alt="" fill sizes="(max-width:700px)" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;

