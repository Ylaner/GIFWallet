import { sendMessage } from "./handlerFactory";
import { searchForGIF } from "./gifControll";
import { GIFType } from "../Types/Types";

export const messageHandler = async (ctx: any) => {
  console.log("message controll triggerd");
  const newUser = ctx.user;
  switch (newUser.userOnStage?.stageName) {
    case ctx.stageEnums.MESSAGE_PENDING:
      const gif1 = await searchForGIF(newUser.userOnStage.details, newUser._id);
      //Task 2 - Update gif.key
      const keys1 = ctx.message.text.split(" ");
      const newGif1: GIFType = gif1.toObject();
      newGif1.key = keys1;
      await gif1.updateOne(newGif1);
      //Task 3 - Update user.userOnStage
      newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
      newUser.userOnStage.details = null;
      await ctx.user.updateOne(newUser);
      //Task 4 - Send a message and done
      await sendMessage(ctx, "Your GIF is saved.");
      break;
    case ctx.stageEnums.EDIT:
      const gif2 = await searchForGIF(newUser.userOnStage.details, newUser._id);
      const newGif2: GIFType = gif2.toObject();
      const keys2 = ctx.message.text.split(" ");
      newGif2.key = keys2;
      await gif2.updateOne(newGif2);
      sendMessage(ctx, "Your gif is edited");
      newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
      newUser.userOnStage.details = null;
      await ctx.user.updateOne(newUser);
      break;
    default:
      await sendMessage(ctx, "Please send your GIF first.");
      break;
  }
};
