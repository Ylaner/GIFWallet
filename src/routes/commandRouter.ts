import { Bot } from "grammy";
import { addgController } from "../controllers/commandControll";
import { sendMessage } from "../controllers/handlerFactory";

export const commandRouter = async (ctx: any, route: string) => {
  switch (route) {
    case "addg":
      await addgController(ctx);
      break;
    default:
      break;
  }
};
