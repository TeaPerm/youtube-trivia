import axios from "axios";
import { config } from "../config/config.js";

export const getChannelId = async (req, res, next) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).send("Username is required.");
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics",
          forHandle: "@"+username,
          key: config.apiKey,
        },
      }
    );

    if (response.data.items.length === 0) {
      return res.status(404).send("Channel not found.");
    }

    req.channelId = response.data.items[0].id;
    next();
  } catch (error) {
    console.error("Error fetching channel ID:", error);
    res.status(500).send("An error occurred while fetching the channel ID.");
  }
};
