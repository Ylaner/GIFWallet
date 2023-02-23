import { messageHandler } from "../controllers/messageControll";
export const messageRouter = async function (ctx: any) {
  try {
    await messageHandler(ctx);
  } catch (err) {
    console.log(err);
  }
};
