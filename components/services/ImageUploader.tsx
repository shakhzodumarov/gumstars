"use client";
import React, { useEffect, useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string | null; // Single image URL instead of an array
  onChange: (updatedProps: { images: string | null }) => void; // Update to pass a single image, or null for removal
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  // Initialize with the passed image
  const [image, setImage] = useState<string | null>(props.images);
  
  // Sync with external props changes
  useEffect(() => {
    console.log("ImageUploader received props.images:", props.images);
    setImage(props.images);
  }, [props.images]);

  const handleUploadSuccess = (result: any) => {
    console.log("Upload Success - Full Result:", result);
    
    // Extract the image URL from the result
    const newImage = result.info?.secure_url;
    console.log('Extracted Image URL:', newImage);
    
    if (newImage) {
      setImage(newImage);
      
      // IMPORTANT: Notify parent component about the new image
      console.log('Updating parent with new image:', newImage);
      props.onChange({ images: newImage });
    } else {
      console.error("No image URL returned from Cloudinary!");
    }
  };

  const handleRemoveImage = () => {
    console.log('Removing Image...');
    setImage(null);
    
    // IMPORTANT: Notify parent component about the removal
    props.onChange({ images: null });
  };

  return (
    <div>
      {image ? (
        <div style={{ marginBottom: '10px' }}>
          <Image 
            src={image} 
            alt="Uploaded preview" 
            width={100} 
            height={100}
            style={{ objectFit: 'cover', marginBottom: '8px' }}
          />
          <div>
            <Button text="Remove" onClick={handleRemoveImage} />
          </div>
        </div>
      ) : (
        <p>No image uploaded yet.</p>
      )}
      
      <CldUploadWidget
        onUpload={handleUploadSuccess}
        uploadPreset="pulpyofficial"
        options={{ maxFiles: 2 }} // Only allow one image
      >
        {({ open }) => (
          <Button text="Upload" onClick={open} />
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
