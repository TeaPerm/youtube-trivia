import { Triangle } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
}

const CustomButton = ({ text, onClick }: CustomButtonProps) => {
  const moveY = text === "More" ? -5 : 5;

  return (
    <motion.div whileHover={{ y: moveY }} layout>
      <Button
        variant="outline"
        className="font-bold text-md text-customYellow border-white bg-transparent hover:text-black  hover:fill-black rounded-3xl hover:bg-white w-48 h-14 border-2"
        onClick={onClick}
        
      >
        {text}
        <motion.span whileHover={{ y: moveY }}>
          <Triangle
            className={`ml-2 fill-white hover:fill-black hover:animate-spin ${
              text !== "More" ? "rotate-180" : ""
            }`}
          />
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default CustomButton;
