require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// Connecting to OpenAI
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// List of responses when content is empty
const botResponses = [
  "Greetings! How may I assist you today?",
  "Hello there! How can I help you?",
  "Ah, you've summoned me! What can I do for you?",
  "At your service! How may I be of assistance?",
  "I'm here! What would you like to know?",
  "Hello! How can I assist you today?",
  "You called? How may I help you?",
  "Greetings, human! What do you need from me?",
  "Hello, how can I be of service to you?",
  "I'm here and ready to assist! What can I do for you?",
];

async function handleMention(message) {
  // parse content after @CCRC IT CLUB
  const content = message.content.replace(/<@!?\d+>/g, "").trim();

  if (content.length == 0)
    return message.channel.send(botResponses[Math.floor(Math.random() * botResponses.length)]);

  // Sends request to OpenAI
  try {
    const completionPromise = openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
    });

    await message.channel.sendTyping();

    const completion = await completionPromise;

    message.reply(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      message.reply(error.response.data.error.message);
    } else {
      message.reply("Oops something went wrong");
      console.log(error.message);
    }
  }
}
module.exports = { handleMention };
