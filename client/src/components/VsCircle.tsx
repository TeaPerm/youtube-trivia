import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { circleDuration } from "@/lib/constants";

interface VsCircleProps {
  correctGuess: boolean | null;
}

const VsCircle = ({ correctGuess }: VsCircleProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (correctGuess !== null) {
      setShowResult(true);
      startAnimation();
    }
  }, [correctGuess]);

  const startAnimation = () => {
    setShowResult(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, circleDuration);
    setTimeout(() => {
      setIsVisible(false);
    }, circleDuration);
    setTimeout(() => {
      setShowResult(false);
      setIsVisible(true);
    }, circleDuration+700);
  };

  return (
    <div className="circle-container">
      {isVisible && (
        <div
          className={`circle animate-jump-in animate-duration-500 animate-ease-in-out ${isAnimating ? (correctGuess ? "green-fill " : "red-fill") : ""}`}
          onClick={startAnimation}
        >
          {!showResult && <span className="">VS</span>}
          {showResult && correctGuess && (
            <span className="z-50  animate-jump-in animate-delay-200 animate-duration-500 animate-ease-in-out font-extrabold">
              <Check className="text-white" strokeWidth={5} />
            </span>
          )}
          {showResult && !correctGuess && (
            <span className="z-50 animate-jump-in animate-delay-200 animate-duration-500 animate-ease-in-out font-extrabold">
              <X className="bg-transparent w-10" strokeWidth={7} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default VsCircle;
