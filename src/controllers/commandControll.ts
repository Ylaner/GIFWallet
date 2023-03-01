import { saveNewGifOnDatabase } from "./gifControll";
import { sendMessage } from "./handlerFactory";

export const addController = async (ctx: any) => {
  try {
    const data = ctx.message!;
    if (data.chat.type === "private") {
      await sendMessage(ctx, "This commend is only for the groups.");
      return;
    }
    if (!data.reply_to_message) {
      await sendMessage(ctx, "Please reply on a gif.");
      return;
    }
    let key;
    const gif = data.reply_to_message.animation;
    key = data.text.split("/add ")[1]?.split(" ");
    console.log(key);
    if (!key) {
      await sendMessage(ctx, "please send your key after /add");
      return;
    }
    console.log(key);
    await saveNewGifOnDatabase(ctx, gif, key);
  } catch (err) {
    console.error(err);
  }
};
