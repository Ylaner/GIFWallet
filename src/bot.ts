const grammy = require("grammy");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
import { errorHandler } from "./controllers/errorControll.js";
import { userAuth } from "./controllers/authControll";
import { commandRouter } from "./routes/commandRouter";
import { gifRouter } from "./routes/gifRouter";
import { inlineQueriesRouter } from "./routes/inlineQueriesRouter";
import { messageRouter } from "./routes/messageRouter";
import { webhookCallback } from "grammy";

//////////////////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 8443;
process.on("uncaughtException", (err) => {
  console.error(err);
  console.log("UncaughtException error , server going down ...");
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
//////////////////////////////////////////////////////////////////////////////////////////
const telegramToken = process.env.TELEGRAM_API_TOKEN!;
const bot = new grammy.Bot(telegramToken);

errorHandler(bot);
const envDatabase = process.env.DATABASE!;
const DB = envDatabase;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log("REEEEADY TO GOO");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
///////////////////////////////////////////////////////////////////

////////////// Middlewares ////////////////// bot.use(fn(ctx, next))
//Menu

//Auth Control
//After this we pass ctx as EvelateContext Type
bot.use(async (ctx: any, next: Function) => {
  try {
    await userAuth(ctx);
    await next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    throw err;
  }
});

////////////// Commands ////////////////////// bot.command
commandRouter(bot);

///////////////// Listeners //////////////// bot.on("message" , fn() )
bot.on(":animation", async (ctx: any) => {
  try {
    await gifRouter(ctx);
  } catch (err) {
    console.error("Error occurred", err);
  }
});

bot.on("msg:text", async (ctx: any) => {
  await messageRouter(ctx);
});

bot.on("inline_query", async (ctx: any) => {
  await inlineQueriesRouter(ctx);
});

// Start the bot.
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server

  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`listening for requests on port: ${PORT}`);
    });
  });
} else {
  // Use Long Polling for development
  connectDB().then(() => {
    bot.start();
  });
}
