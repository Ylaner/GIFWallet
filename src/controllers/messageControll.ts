import { sendMessage } from "./handlerFactory";
import { searchForGIF } from "./gifControll";
import { GIFType } from "../utils/types";
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
export const addKey = async (ctx: any) => {
  console.log("addKey triggerd");
  const newUser = ctx.user;
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
};

export const updateKey = async (ctx: any) => {
  console.log("updateKey triggerd");
  const newUser = ctx.user;
  const gif = await searchForGIF(newUser.userOnStage.details, newUser._id);
  const newGif: GIFType = gif.toObject();
  const keys2 = ctx.message.text.split(" ");
  newGif.key = keys2;
  await gif.updateOne(newGif);
  await sendMessage(ctx, "Your gif is edited");
  newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
  newUser.userOnStage.details = null;
  await ctx.user.updateOne(newUser);
};
