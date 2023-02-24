import { Bot } from "grammy";
import { sendMessage } from "../controllers/handlerFactory";

export const commandRouter = (bot: Bot) => {
  bot.command("start", async (ctx: any) => {
    try {
    } catch (err) {
      console.log(err);
    }
  });
};
