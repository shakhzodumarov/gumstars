// components/Gallery.tsx
import React from 'react';
import Image from 'next/image';
import styles from './gallery.module.scss';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.galleryItem}>
          <Image src={image} alt={`Gallery image ${index + 1}`} layout="responsive" width={300} height={300} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;


