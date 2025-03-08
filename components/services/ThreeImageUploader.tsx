"use client";
import React, { useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ColorThreeImageUploaderProps {
  colorthreeimg: string[]; // Using colorthreeimg as the prop name
  onChange: (updatedProps: { colorthreeimg: string[] }) => void;
}

const ColorThreeImageUploader: React.FC<ColorThreeImageUploaderProps> = (props) => {
  const [colorthreeimg, setColorthreeimg] = useState<string[]>(props.colorthreeimg || []); // Initialize with colorthreeimg

  const handleUploadSuccess = (result: any) => {
    const newImage = result.info.secure_url;
    const updatedImages = [...colorthreeimg, newImage]; // Append new image to the list
    
    setColorthreeimg(updatedImages); // Update local state
    props.onChange({ colorthreeimg: updatedImages }); // Pass updated images back to the parent
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = colorthreeimg.filter((_, i) => i !== index); // Remove image by index
    setColorthreeimg(updatedImages); // Update local state
    props.onChange({ colorthreeimg: updatedImages }); // Pass updated images back to the parent
  };

  return (
    <div>
      <span>{`Images for Color 3:`}</span>
      <div>
        {colorthreeimg.map((img, index) => (
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

export default ColorThreeImageUploader;
