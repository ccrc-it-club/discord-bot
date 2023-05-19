const axios = require("axios").default;
const Redis = require("ioredis");
require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

// Define the Facebook page ID and access token
const pageId = process.env.PAGE_ID;
const accessToken = process.env.ACCESS_TOKEN;
const channelId = process.env.CHANNEL_ID;

// Create a Redis client instance
const redisClient = new Redis(process.env.REDIS_URL);
let latestPostId = null;

// Function to retrieve posts from the Facebook page
async function getFacebookPosts(client) {
  try {
    // Check if the latest post ID is available in the cache
    const cachedPostId = await redisClient.get("latestPostId");

    const response = await axios.get(`https://graph.facebook.com/v15.0/${pageId}/posts`, {
      params: {
        access_token: accessToken,
        fields: "id, message, created_time, attachments",
        limit: 1,
      },
    });

    const posts = response.data.data;
    const newLatestPost = posts[0];

    // Check if the latest post ID has changed or is not cached
    if (newLatestPost.id !== cachedPostId) {
      if (newLatestPost.attachments != undefined) {
        const aboutEmbed = new EmbedBuilder()
          .setTitle("CCRC IT CLUB")
          .setURL(`https://facebook.com/${newLatestPost.id}`)
          .setImage(newLatestPost.attachments.data[0].media.image.src)
          .setDescription(newLatestPost.message)
          .setColor(0x3b5998)
          .setTimestamp();
        await client.channels.cache.get(channelId.toString()).send({ embeds: [aboutEmbed] });
      } else {
        const aboutEmbed = new EmbedBuilder()
          .setTitle("CCRC IT CLUB")
          .setURL(`https://facebook.com/${posts[0].id}`)
          .setDescription(posts[0].message)
          .setColor(0x3b5998)
          .setTimestamp();
        await client.channels.cache.get(channelId).send({ embeds: [aboutEmbed] });
      }

      // Update the latest post ID in the cache
      await redisClient.set("latestPostId", newLatestPost.id);
    } else {
      console.log("✅ No new post found.");
    }
  } catch (error) {
    console.error("❌ Error retrieving Facebook posts:", error);
    console.error("❌ Error response:", error.response && error.response.data);
  }
}

module.exports = (client) => {
  // Function to check for new posts every 1 minute
  function checkForNewPosts() {
    console.log("⏰ Checking for new posts...");

    // Check for new posts immediately
    getFacebookPosts(client);

    // Set interval to check for new posts every 1 minute
    setInterval(async () => {
      console.log("\n⏳ After 1 minute:");

      // Check for new posts
      await getFacebookPosts(client);
    }, 60000); // 1 minute interval
  }

  // Start checking for new posts
  checkForNewPosts(client);
};
