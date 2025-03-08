"use client";
import React, { useState } from 'react';
import Button from "@/components/UI/button";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ColorImageUploaderProps {
  coloroneimg: string[]; // Accept coloroneimg as a prop
  onChange: (updatedProps: { coloroneimg: string[] }) => void; // onChange will update coloroneimg
}

const ColorImageUploader: React.FC<ColorImageUploaderProps> = (props) => {
  // Initialize state with the coloroneimg prop
  const [coloroneimg, setColoroneimg] = useState<string[]>(props.coloroneimg || []);

  const handleUploadSuccess = (result: any) => {
    const newImage = result.info.secure_url;
    const updatedImages = [...coloroneimg, newImage]; // Append new image to existing images
    
    setColoroneimg(updatedImages); // Update local state
    props.onChange({ coloroneimg: updatedImages }); // Pass updated images to the parent
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = coloroneimg.filter((_, i) => i !== index); // Remove image by index
    setColoroneimg(updatedImages); // Update local state
    props.onChange({ coloroneimg: updatedImages }); // Pass updated images to the parent
  };

  return (
    <div>
      <span>Images for Color 1:</span>
      <div>
        {coloroneimg.map((img, index) => (
          <div key={index}>
            <Image src={img} alt={`Uploaded preview ${index}`} width={100} height={100} />
            <Button text="Remove" onClick={() => handleRemoveImage(index)} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={handleUploadSuccess}
        uploadPreset="pulpyofficial"
        options={{ maxFiles: 4 }}
      >
        {({ open }) => (
          <Button text="Upload" onClick={open} />
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ColorImageUploader;

