"use client";
import React, { useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';


interface ImageUploaderProps {
  images: string[];
  onChange: (updatedProps: { images: string[] }) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const [images, setImages] = useState<string[]>(props.images || []);

  const handleUploadSuccess = (result: any) => {
    const newImages = result.info.secure_url;
    const updatedImages = [...images, newImages];
    
    setImages(updatedImages);
    props.onChange({ images: updatedImages });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    props.onChange({ images: updatedImages });
  };

  return (
    <div>
      <span>Images:</span>
      <div>
        {images.map((img, index) => (
          <div key={index}>
            <Image src={img} alt={`Uploaded preview ${index}`} width={100} height={100} />
            <Button text="Remove" onClick={() => handleRemoveImage(index)} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={handleUploadSuccess}
        uploadPreset="pulpyofficial"
        options={{ maxFiles: 6 }}
      >
        {({ open }) => (
          <Button text="Upload" onClick={open} />
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
