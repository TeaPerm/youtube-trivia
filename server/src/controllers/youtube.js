import axios from "axios";
import { config } from "../config/config.js";
import { getAverageColor } from "fast-average-color-node";

export async function getRandomVideos(channelId) {
  try {
    const videos = [];
    const sortingOptions = [
      "date",
      "rating",
      "relevance",
      "title",
      "videoCount",
      "viewCount",
    ];
    const randomSortingOption =
      sortingOptions[Math.floor(Math.random() * sortingOptions.length)];

    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          type: "video",
          maxResults: 50,
          order: randomSortingOption,
          channelId: channelId ?? "",
          key: config.apiKey,
        },
      }
    );

    const selectedVideos = [];
    while (selectedVideos.length < 40) {
      const randomVideo =
        searchResponse.data.items[
          Math.floor(Math.random() * searchResponse.data.items.length)
        ];
      if (!selectedVideos.includes(randomVideo)) {
        selectedVideos.push(randomVideo);
      }
    }

    // Get the IDs of the selected videos
    const videoIds = selectedVideos.map((video) => video.id.videoId).join(",");

    // Fetch details for the selected videos in a single request
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics,contentDetails",
          id: videoIds,
          key: config.apiKey,
        },
      }
    );

    for (const videoDetail of detailsResponse.data.items) {

      const videoDetails = {
        title: videoDetail.snippet.title,
        averageColor: await getAverageColorFromImageUrl(
          videoDetail.snippet.thumbnails.medium.url
        ),
        videoId: videoDetail.id,
        videoDuration: convertDuration(videoDetail.contentDetails.duration),
        viewCount: videoDetail.statistics.viewCount,
        thumbnail: videoDetail.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${videoDetail.id}`,
      };
      videos.push(videoDetails);
    }

    return videos;
  } catch (error) {
    console.error("Error fetching random videos:", error);
    throw error;
  }
}

async function getAverageColorFromImageUrl(imageUrl) {
  try {
    return (await getAverageColor(imageUrl)).hex;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to calculate average color");
  }
}

function convertDuration(duration) {
  // Parse the duration string
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  // Extract hours, minutes, and seconds
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  // Format the duration string
  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += hours + ":";
  }
  formattedDuration += (minutes < 10 ? "0" : "") + minutes + ":";
  formattedDuration += (seconds < 10 ? "0" : "") + seconds;

  return formattedDuration;
}
