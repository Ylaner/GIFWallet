import { sendMessage } from "./handlerFactory";
import { searchForGIF } from "./gifControll";
import { GIFType } from "../utils/types";
import { GIFClass } from "../utils/gifClass";
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
export const addKey = async (ctx: any) => {
  try {
    console.log("addKey triggerd");
    const newUser = ctx.user;
    const gif1 = await searchForGIF(newUser.userOnStage.details, newUser._id);
    //Task 2 - Update gif.key
    const keys1 = ctx.message.text.toLowerCase().split(" ");
    const newGif1: GIFType = gif1.toObject();
    newGif1.key = keys1;
    await gif1.updateOne(newGif1);
    //Task 3 - Update user.userOnStage
    newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
    newUser.userOnStage.details = null;
    await ctx.user.updateOne(newUser);
    //Task 4 - Send a message and done
    await sendMessage(ctx, "Your GIF is saved.");
  } catch (err) {
    console.error(err);
  }
};

export const updateKey = async (ctx: any) => {
  try {
    console.log("updateKey triggerd");
    const newUser = ctx.user;
    const newKey = ctx.message.text.toLowerCase().split(" ");
    const gifQuery = await searchForGIF(
      newUser.userOnStage.details,
      newUser._id
    );
    gifQuery.key = newKey;
    const newGif = new GIFClass(gifQuery);
    console.log(newGif);

    await gifQuery.updateOne(newGif);
    await sendMessage(ctx, "Your gif is edited");
    newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
    newUser.userOnStage.details = null;
    await ctx.user.updateOne(newUser);
  } catch (err) {
    console.error(err);
  }
};
