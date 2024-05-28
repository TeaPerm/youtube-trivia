import GameOverButton from "@/components/GameOverButton";
import { LoadableButton } from "@/components/LoadableButton";
import { useGame } from "@/hooks/useGame";
import useRandomVideos from "@/hooks/useRandomVideos";
import { motion } from "framer-motion";
import { useState } from "react";

interface GameOverProps {
  setShowGameOver: (show: boolean) => void;
}

const GameOver = ({ setShowGameOver }: GameOverProps) => {
  const { backToMenu, score, youtuber, startGame } = useGame();
  const [isLoading, setIsLoading] = useState(false);
  const { randomVideosMutation } = useRandomVideos();

  async function playAgain() {
    setIsLoading(true);
    await randomVideosMutation.mutateAsync(youtuber);
    startGame();
    setShowGameOver(false);
  }

  return (
    <motion.div
      transition={{ type: "tween" }}
      initial={{ y: window.innerWidth }}
      animate={{ y: 0 }}
      className="w-screen z-[9999] h-screen p-4 overflow-hidden flex flex-col items-center bg-black text-white"
    >
      <div className="mt-24 text-xl font-bold">You scored:</div>
      <div className="font-bold text-[50px] text-customYellow">{score}</div>
      <div className="text-center mb-4">
        That's not a good score! The average score is 3.2.
        <br />
        Quick, click Play Again and we will pretend we didn't see that score!
      </div>
      <div className="space-x-4 flex">
        <GameOverButton text="Back to menu" onClick={backToMenu} />
        <LoadableButton
          loading={isLoading}
          onClick={playAgain}
          className="font-bold text-md text-white bg-transparent rounded-3xl border-white hover:bg-white hover:text-black w-48 h-14 border-2"
        >
          Play again
        </LoadableButton>
      </div>
    </motion.div>
  );
};

export default GameOver;
