import { LoadableButton } from "@/components/LoadableButton";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRandomVideos from "@/hooks/useRandomVideos";
import { Shuffle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const people = [
  {
    id: 1,
    name: "MrBeast",
    value: "mrbeast",
    designation: "250M+ subscribers",
    image:
      "https://yt3.ggpht.com/fxGKYucJAVme-Yz4fsdCroCFCrANWqw0ql4GYuvx8Uq4l_euNJHgE-w9MTkLQA805vWCi-kE0g=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 2,
    name: "PewDiePie",
    value: "pewdiepie",
    designation: "100M+ subscribers",
    image:
      "https://yt3.ggpht.com/5oUY3tashyxfqsjO5SGhjT4dus8FkN9CsAHwXWISFrdPYii1FudD4ICtLfuCw6-THJsJbgoY=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 3,
    name: "Dude Perfect",
    value: "dudeperfect",
    designation: "60M+ subscribers",
    image:
      "https://yt3.ggpht.com/ytc/AIdro_lnf0k0Vr_bPUzC4OIUIp0hGSvnEnteat4Hq33JMMo6qBI=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 4,
    name: "Azahriah",
    value: "paulsonati",
    designation: "500K+ subscribers",
    image:
      "https://yt3.ggpht.com/ytc/AIdro_mxnzOZJItX3pc3PEIJlBo7J2ipXWWl27ASShw8_OJiR0s=s240-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    id: 5,
    name: "Pamkutya",
    value: "pamkutya",
    designation: "1M+ subscribers",
    image:
      "https://yt3.ggpht.com/ytc/AIdro_ld7dvOSf53eeDWRQosxUv0FhxEFhq3UNNf7wKnWW3PLA=s240-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 6,
    name: "TheVR",
    value: "thevrhu",
    designation: "800K+ subscribers",
    image:
      "https://yt3.ggpht.com/vxo0M9_E808_W-tEtWgsmrBmQLl51MS1pf-I-ZOo7UKNE2KQBySUqGX6HrXUCxMR81xGhQkHbeU=s240-c-k-c0x00ffffff-no-rj",
  },
];

export default function Landing() {
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { randomVideosMutation } = useRandomVideos();

  const { handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
  });

  function onSubmit({ username }: { username: string }) {
    setIsLoading(true);
    randomVideosMutation.mutate(username, {
      onSettled: () => setIsLoading(false),
    });
  }

  const handleRandomClick = (e: any) => {
    e.preventDefault();
    onSubmit({ username: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-screen h-screen flex flex-col justify-center overflow-hidden items-center">
        {/* <img src="public/preview.png" className="h-1/2 bg-contain"/> */}
        <main className="w-full">
          <section className="w-full mx-auto py-20 flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-4xl font-bold text-center text-gray-900">
                Youtube Trivia
              </h1>
              <p>
                Enter your favorite youtuber's name, start a game with random
                videos, or click one of the popular youtuber's icon to start a
                game!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  className="flex-1"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter YouTuber's name"
                  type="text"
                />
                <LoadableButton
                  loading={isLoading}
                  className="bg-red-500"
                  onClick={() => onSubmit({ username: channelName })}
                >
                  Start Game
                </LoadableButton>
                <Button
                  variant="outline"
                  onClick={handleRandomClick}
                >
                  <Shuffle />
                </Button>
              </div>
              <div className="">
                <div className="flex justify-center items-center mb-4 font-bold">
                  Popular Youtubers
                </div>
                <div className="flex flex-row items-center justify-center mb-10 w-full">
                  <AnimatedTooltip
                    items={people}
                    onClick={(username) => {
                      // setChannelName(username);
                      onSubmit({ username });
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </form>
  );
}
