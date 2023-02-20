import { EvelateContext } from "../Types/Types";
import { sendMessage } from "./handlerFactory";

exports.userCreate = async (ctx: EvelateContext) => {
  try {
    await sendMessage(ctx, "Welcome! Up and running.");
  } catch (err) {
    console.log(err);
  }
};

// async function myCommands() {
//   await bot.api.setMyCommands([
//     { command: "start", description: "Start the bot" },
//   ]);
// }
// myCommands();
