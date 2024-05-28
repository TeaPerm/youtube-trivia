import React from "react";

interface ImageCardProps {
  image: string;
  duration: string;
}

const ImageCard = ({ image, duration }: ImageCardProps) => {
  return (
    <div className="relative inline-block">
      <img className="rounded-3xl" src={image} />
      <div>
        <div className="absolute bottom-0 right-0 mr-4 mb-2 text-white font-bold px-1 rounded-xl bg-black bg-opacity-40 text-opacity-85 text-center">
          {duration}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
