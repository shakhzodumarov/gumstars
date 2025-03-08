"use client";
import React, { useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ColorTwoImageUploaderProps {
  colortwoimg: string[]; // Using colortwoimg as the prop name
  onChange: (updatedProps: { colortwoimg: string[] }) => void;
}

const ColorTwoImageUploader: React.FC<ColorTwoImageUploaderProps> = (props) => {
  const [colortwoimg, setColortwoimg] = useState<string[]>(props.colortwoimg || []); // Initialize with colortwoimg

  const handleUploadSuccess = (result: any) => {
    const newImage = result.info.secure_url;
    const updatedImages = [...colortwoimg, newImage]; // Append new image to the list
    
    setColortwoimg(updatedImages); // Update local state
    props.onChange({ colortwoimg: updatedImages }); // Pass updated images back to the parent
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = colortwoimg.filter((_, i) => i !== index); // Remove image by index
    setColortwoimg(updatedImages); // Update local state
    props.onChange({ colortwoimg: updatedImages }); // Pass updated images back to the parent
  };

  return (
    <div>
      <span>{`Images for Color 2:`}</span>
      <div>
        {colortwoimg.map((img, index) => (
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

export default ColorTwoImageUploader;
