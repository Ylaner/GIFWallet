import { messageControll } from "../controllers/messageControll";
export const messageRouter = async function (ctx: any) {
  try {
    await messageControll(ctx);
  } catch (err) {
    console.log(err);
  }
};
