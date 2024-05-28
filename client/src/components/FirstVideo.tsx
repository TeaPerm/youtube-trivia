import { VideoResponse } from "@/lib/types";
import { formatViews } from "@/lib/utils";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";

interface FirstVideoProps {
  video: VideoResponse;
  slideLeft?: boolean;

}

const FirstVideo = ({ video , slideLeft }: FirstVideoProps) => {

  const halfScreen = window.innerWidth / 2;

  return (
    <motion.div
      className="w-full flex"
      transition={{type: "tween"}}
      animate={slideLeft ? { x: -halfScreen } : {}}
      style={{ backgroundColor: video.averageColor }}
    >
      <div className="flex-col flex items-center w-full mt-[25%] text-white">
        <ImageCard image={video.thumbnail} duration={video.videoDuration}/>
        <div className="font-bold text-xl mx-16 text-center">"{video.title}"</div>
        <div className="font-medium">has</div>
        <div className="text-customYellow -mt-4 font-bold text-[50px]">
          {formatViews(video.viewCount)}
        </div>
        <div className="font-medium">
          views
        </div>
      </div>
    </motion.div>
  );
};

export default FirstVideo;
