import { useMutation } from "@tanstack/react-query";
import { useGame } from "./useGame";
import { API_URL } from "@/lib/constants";

const useRandomVideos = () => {
  const { setVideos, startGame, setYoutuber } = useGame();

  const randomVideosMutation = useMutation({
    mutationFn: (channelName: string) => {
      setYoutuber(channelName);
      return fetch(API_URL + "/random-videos/" + channelName, {
        method: "GET",
      });
    },
    onError: (err: any) => {
      console.error(err);
    },
    onSuccess: async (response) => {
      const videos = await response.json();
      console.log(videos)
      setVideos(videos);
      startGame();
    },
  });

  return {randomVideosMutation};
};

export default useRandomVideos;
