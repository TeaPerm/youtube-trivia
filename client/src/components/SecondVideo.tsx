import { VideoResponse } from "@/lib/types";
import CustomButton from "./CustomButton";
import { formatViews } from "@/lib/utils";
import NumberCounter from "./NumberCounter";
import { useState } from "react";
import ImageCard from "./ImageCard";
import { circleDuration, counterDuration } from "@/lib/constants";
import { motion } from "framer-motion";
import { useGame } from "@/hooks/useGame";

interface SecondVideoProps {
  firstVideo: VideoResponse;
  secondVideo: VideoResponse;
  onGuess: (isHigher: boolean) => void;
  slideLeft?: boolean;
  isFirst?: boolean;
}

const SecondVideo = ({
  firstVideo,
  secondVideo,
  onGuess,
  slideLeft,
  isFirst,
}: SecondVideoProps) => {
  const [showCounter, setShowCounter] = useState(isFirst);
  const {score} = useGame()

  function onAnswer(answer: boolean) {
    setShowCounter(true);
    setTimeout(() => {
      onGuess(answer);
    }, counterDuration + 500);
    setTimeout(() => {
    }, counterDuration + circleDuration + 1500);
  }

  const halfScreen = window.innerWidth / 2;

  return (
    <motion.div
      className="flex w-full"
      initial={{ x: 0 }}
      transition={{ type: "tween" }}
      animate={slideLeft  ? { x: -halfScreen*(score) } : {}}
      style={{ backgroundColor: secondVideo.averageColor }}
    >
      <div className="flex-col flex items-center h-full w-full sm:mt-[25%] text-white">
        <ImageCard
          image={secondVideo.thumbnail}
          duration={secondVideo.videoDuration}
        />
        <div className="font-bold text-xl mx-16 text-center">
          "{secondVideo.title}"
        </div>
        <div className="font-medium my-1">has</div>
        <div className="space-y-2 flex flex-col">
          {showCounter ? (
            <div className="flex h-8 justify-center items-center my-4">
              <NumberCounter toValue={secondVideo.viewCount} />
            </div>
          ) : (
            <>
              <CustomButton text="More" onClick={() => onAnswer(true)} />
              <CustomButton text="Less" onClick={() => onAnswer(false)} />
              <div className="flex justify-center font-medium">
                views than {formatViews(firstVideo.viewCount)}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SecondVideo;
