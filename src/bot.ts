const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
//////////////////////////////////////////////////////////////////////////////////////////

import { Bot, webhookCallback } from "grammy";
import { userAuth } from "./controllers/authControll";
import { errorHandler } from "./controllers/errorControll";
import { saveNewGifOnDatabase } from "./controllers/gifControll";
import { sendMessage } from "./controllers/handlerFactory";
import { Gif } from "./models/gifModel";
import { commandRouter } from "./routes/commandRouter";
import { gifRouter } from "./routes/gifRouter";
import { inlineQueriesRouter } from "./routes/inlineQueriesRouter";
import { messageRouter } from "./routes/messageRouter";
import { menuCRUD } from "./utils/Menu";

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
const bot = new Bot(telegramToken);

errorHandler(bot);
const envDatabase = process.env.DATABASE!;
const DB = envDatabase;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
///////////////////////////////////////////////////////////////////

////////////// Middlewares ////////////////// bot.use(fn(ctx, next))
//Menu
bot.use(menuCRUD);
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

// const deleteData = async function () {
//   try {
//     await Gif.deleteMany();
//     console.log("data succesfully deleted");
//   } catch (error) {
//     console.error(error);
//   }
//   process.exit();
// };
// deleteData();
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

// ctx.update.message = {
//   message_id: 330,
//   from: {
//     id: 5387340288,
//     is_bot: false,
//     first_name: 'Yasin ᅠ',
//     username: 'Y_Laner',
//     language_code: 'en'
//   },
//   chat: { id: -1001575778436, title: 'YlanerShare', type: 'supergroup' },
//   date: 1677587519,
//   message_thread_id: 322,
//   reply_to_message: {
//     message_id: 322,
//     from: {
//       id: 5387340288,
//       is_bot: false,
//       first_name: 'Yasin ᅠ',
//       username: 'Y_Laner',
//       language_code: 'en'
//     },
//     chat: { id: -1001575778436, title: 'YlanerShare', type: 'supergroup' },
//     date: 1677586740,
//     animation: {
//       mime_type: 'video/mp4',
//       duration: 1,
//       width: 480,
//       height: 318,
//       thumb: [Object],
//       file_id: 'CgACAgQAAx0CXex4hAACAUJj_fE6xpR9833MQELgEmhNVGnwygAC2QwAAltQ0VKL8zwYbErSAi4E',
//       file_unique_id: 'AgAD2QwAAltQ0VI',
//       file_size: 8904
//     },
//     document: {
//       mime_type: 'video/mp4',
//       thumb: [Object],
//       file_id: 'CgACAgQAAx0CXex4hAACAUJj_fE6xpR9833MQELgEmhNVGnwygAC2QwAAltQ0VKL8zwYbErSAi4E',
//       file_unique_id: 'AgAD2QwAAltQ0VI',
//       file_size: 8904
//     }
//   },
//   text: '/save',
//   entities: [ { offset: 0, length: 5, type: 'bot_command' } ]
// }
bot.command("save", async (ctx) => {
  const data = ctx.message!;
  if (data.chat.type === "private") {
    await sendMessage(ctx, "This commend is only for the groups.");
    return;
  }
  if (!data.reply_to_message) {
    await sendMessage(ctx, "Please reply on a gif.");
    return;
  }
  let key: string[] = [""];
  const gif = data.reply_to_message.animation;
  key = data.text?.split("/save ")[1].split(" ");
  if (!key[0]) {
    sendMessage(ctx, "please send your key after /save");
    return;
  }
  console.log(key);
  saveNewGifOnDatabase(ctx, gif, key);
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
