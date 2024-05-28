import { useGame } from "@/hooks/useGame";
import { useEffect, useRef } from "react";

const ScoreDisplay = () => {
  const { score } = useGame();
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scoreRef.current) {
      scoreRef.current.classList.add("animate-jump");
      const handleAnimationEnd = () => {
        if (scoreRef.current) {
          scoreRef.current.classList.remove("animate-jump");
        }
      };
      scoreRef.current.addEventListener("animationend", handleAnimationEnd);
      return () => {
        if (scoreRef.current) {
          scoreRef.current.removeEventListener(
            "animationend",
            handleAnimationEnd
          );
        }
      };
    }
  }, [score]);

  return (
    <div
      ref={scoreRef}
      className="absolute flex bottom-0 right-0 m-2 text-white font-bold text-xl"
    >
      Score: {score}
    </div>
  );
};

export default ScoreDisplay;
