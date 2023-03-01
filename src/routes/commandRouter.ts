import { Bot } from "grammy";
import { addController } from "../controllers/commandControll";
import { sendMessage } from "../controllers/handlerFactory";

export const commandRouter = async (ctx: any, route: string) => {
  try {
    switch (route) {
      case "add":
        await addController(ctx);
        break;
      default:
        break;
    }
  } catch (err) {
    throw err;
  }
};
