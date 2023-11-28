//require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",		//process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

module.exports = { openai };
