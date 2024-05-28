import { getRandomVideos } from "./controllers/youtube.js";
import { getChannelId } from "./middlewares/youtubeMiddleware.js";
import { config,app } from './config/config.js';

app.get("/", async (req,res) => {
  res.send("Hello World!")
})

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/random-videos", async (req, res) => {
  try {
    const videos = await getRandomVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the videos.");
  }
});

app.get("/random-videos/:username",getChannelId,  async (req, res) => {
  const channelId = req.channelId;
  try {
    const videos = await getRandomVideos(channelId);
    res.json(videos);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the videos.");
  }
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

export default app;
