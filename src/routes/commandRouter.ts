import { Bot, Context } from "grammy";

const { sendMessage } = require("../controllers/handlerFactory");

export const commandRouter = (bot: Bot) => {
  bot.command("start", async (ctx: any) => {
    await sendMessage(ctx, "Hello, Send a gif to start!");
  });
};
