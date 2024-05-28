import ScoreDisplay from "@/components/ScoreDisplay";
import SecondVideo from "@/components/SecondVideo";
import VsCircle from "@/components/VsCircle";
import { useGame } from "@/hooks/useGame";
import { circleDuration } from "@/lib/constants";
import { useState } from "react";
import GameOver from "./GameOver";

const Game = () => {
  const { videos, currentIndex, nextVideo, score, setScore } = useGame();
  const firstVideo = videos[currentIndex];
  const secondVideo = videos[currentIndex + 1];
  const [correctGuess, setCorrectGuess] = useState<boolean | null>(null);
  const [slideLeft, setSlideLeft] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  console.log(currentIndex)

  console.log(currentIndex + 1, " ", parseInt(firstVideo.viewCount));
  console.log(currentIndex + 2, " ", parseInt(secondVideo.viewCount));

  const handleGuess = (isHigher: boolean) => {
    if (
      (isHigher &&
        parseInt(firstVideo.viewCount) < parseInt(secondVideo.viewCount)) ||
      (!isHigher &&
        parseInt(firstVideo.viewCount) > parseInt(secondVideo.viewCount))
    ) {
      setCorrectGuess(true);
      setTimeout(() => {
        setSlideLeft(true);
        setScore(score + 1);
      }, circleDuration + 100);
      setTimeout(() => {
        nextVideo();
        setCorrectGuess(null);
      }, circleDuration + 1000);
    } else {
      setCorrectGuess(false);
      setTimeout(() => {
        setShowGameOver(true);
      }, circleDuration);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative flex-col sm:flex">
      <div className={`absolute w-screen sm:flex`}>
        {videos.map((video, index) => (
          <div
            key={video.videoId}
            className="flex h-1/2 sm:h-screen w-full sm:w-1/2 flex-shrink-0"
          >
            <SecondVideo
              firstVideo={videos[index - 1] || videos[index]}
              secondVideo={videos[index]}
              onGuess={handleGuess}
              slideLeft={slideLeft}
              isFirst={index === 0}
            />
          </div>
        ))}
      </div>
      {showGameOver === true && <GameOver setShowGameOver={setShowGameOver} />}
      <VsCircle correctGuess={correctGuess} />
      <ScoreDisplay />
    </div>
  );
};

export default Game;
