"use client";
import React, { useEffect, useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string | null;
  onChange: (updatedProps: { images: string | null }) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const [image, setImage] = useState<string | null>(props.images);
  
  useEffect(() => {
    console.log("ImageUploader received props.images:", props.images);
    setImage(props.images);
  }, [props.images]);

  const handleUploadSuccess = (result: any) => {
    console.log("Upload Success - Full Result:", result);
    
    const newImage = result.info?.secure_url;
    console.log('Extracted Image URL:', newImage);
    
    if (newImage) {
      setImage(newImage);
      
      // Use setTimeout to ensure this happens after any other state updates
      setTimeout(() => {
        console.log('Calling onChange with new image:', newImage);
        props.onChange({ images: newImage });
      }, 0);
    } else {
      console.error("No image URL returned from Cloudinary!");
    }
  };

  const handleRemoveImage = () => {
    console.log('Removing Image...');
    setImage(null);
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
            style={{ objectFit: 'cover', marginBottom: '8px', borderRadius: '4px' }}
          />
          <div>
            <Button text="Remove Image" onClick={handleRemoveImage} />
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: '#666' }}>No image uploaded yet.</p>
      )}
      
      <CldUploadWidget
        onSuccess={handleUploadSuccess}
        uploadPreset="pulpyofficial"
        options={{ 
          maxFiles: 1,
          resourceType: 'image',
          clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
          maxImageFileSize: 5000000,
        }}
      >
        {({ open }) => (
          <Button 
            text={image ? "Change Image" : "Upload Image"} 
            onClick={() => {
              console.log('Upload button clicked');
              open();
            }} 
          />
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;