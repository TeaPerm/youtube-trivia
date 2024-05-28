import { Button } from "./ui/button";

interface GameOverButtonProps {
  text: string;
  onClick: () => void;
}

const GameOverButton = ({ text, onClick }: GameOverButtonProps) => {
  return (
    <Button
      variant="outline"
      className="font-bold text-md text-white bg-transparent rounded-3xl border-white hover:bg-white w-48 h-14 border-2"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default GameOverButton;
