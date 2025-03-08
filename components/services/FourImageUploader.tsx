"use client";
import React, { useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ColorFourImageUploaderProps {
  colorfourimg: string[]; // Using colorfourimg as the prop name
  onChange: (updatedProps: { colorfourimg: string[] }) => void;
}

const ColorFourImageUploader: React.FC<ColorFourImageUploaderProps> = (props) => {
  const [colorfourimg, setColorfourimg] = useState<string[]>(props.colorfourimg || []); // Initialize with colorfourimg

  const handleUploadSuccess = (result: any) => {
    const newImage = result.info.secure_url;
    const updatedImages = [...colorfourimg, newImage]; // Append new image to the list
    
    setColorfourimg(updatedImages); // Update local state
    props.onChange({ colorfourimg: updatedImages }); // Pass updated images back to the parent
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = colorfourimg.filter((_, i) => i !== index); // Remove image by index
    setColorfourimg(updatedImages); // Update local state
    props.onChange({ colorfourimg: updatedImages }); // Pass updated images back to the parent
  };

  return (
    <div>
      <span>{`Images for Color 4:`}</span>
      <div>
        {colorfourimg.map((img, index) => (
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

export default ColorFourImageUploader;
