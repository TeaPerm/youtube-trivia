import { counterDuration } from "@/lib/constants";
import { formatViews } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";

interface NumberCounterProps {
  toValue: string;
}

function NumberCounter({ toValue }: NumberCounterProps) {
  const countAnimation = useSpring({
    number: parseInt(toValue),
    from: { number: 0 },
    config: {
      duration: counterDuration,
    },
  });

  return (
    <animated.div className="flex flex-col justify-center items-center z-50">
      <animated.div
        className=" text-customYellow font-bold text-[50px] animate-fade-up animate-ease-in animate-fill-forwards"
        style={{ zIndex: 9999 }}
      >
        {countAnimation.number.to((val) => `${formatViews(Math.floor(val))}`)}
      </animated.div>
      <div className="flex justify-center font-medium text-md animate-fade-up animate-ease-in animate-fill-forwards">
        views
      </div>
    </animated.div>
  );
}

export default NumberCounter;
