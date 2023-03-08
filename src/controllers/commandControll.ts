import { saveNewGifOnDatabase } from "./gifControll";
import { sendMessage } from "./handlerFactory";

export const addController = async (ctx: any) => {
  try {
    const data = ctx.message!;
    const gif = data.reply_to_message?.animation;
    if (gif) return;
    if (data.chat.type === "private") {
      await sendMessage(ctx, "This commend is only for the groups.");
      return;
    }
    if (!data.reply_to_message) {
      await sendMessage(ctx, "Please reply on a gif.");
      return;
    }
    let key;
    key = data.text.split("/add ")[1]?.split(" ");
    if (!key) {
      await sendMessage(ctx, "please send your key after /add");
      return;
    }
    await saveNewGifOnDatabase(ctx, gif, key);
  } catch (err) {
    console.error(err);
  }
};

export const startController = async (ctx: any) => {
  try {
    const data = ctx.message!;
    if (data.chat.type === "private") {
      await sendMessage(ctx, "Welcome, Send a GIF for start");
    } else {
      await sendMessage(
        ctx,
        "Use /add method to save GIF and use @GIFWallet_bot To find your GIF"
      );
    }
  } catch (err) {
    console.error(err);
  }
};
