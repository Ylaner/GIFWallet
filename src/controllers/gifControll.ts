import { sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { GIFType } from "../utils/types";
import { userUpdate } from "./authControll";
import { menuCRUD } from "../utils/Menu";
import { GIFClass } from "../utils/gifClass";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const canSaveNewGif = async (ctx: any) => {
  const stageName = ctx.user.userOnStage.stageName;
  //booleans
  const isItGifPending = stageName === ctx.stageEnums.GIF_PENDING;
  const isItEdit = stageName === ctx.stageEnums.EDIT;
  const isItNew = stageName === ctx.stageEnums.NEW;
  const isItGifSaved = stageName === ctx.stageEnums.GIF_SAVED;
  if (!isItGifPending && !isItEdit && !isItNew && !isItGifSaved) {
    await sendMessage(
      ctx,
      "you've send another gif before,\nplease send a key for that gif first"
    );
    return false;
  } else return true;
};

export const isItGifExist = async (ctx: any, returnGif: boolean = false) => {
  const gif = await searchForGIF(
    ctx.message?.animation?.file_unique_id,
    ctx.user._id
  );
  if (gif) {
    if (returnGif) return gif;
    else true;
  } else {
    if (returnGif) return undefined;
    else false;
  }
};

export const searchForGIF = async function (
  gifUniqueId: string,
  user: string | number,
  index = null
) {
  try {
    console.log(`gifId : ${gifUniqueId}`);
    console.log(`userId : ${user}`);
    const gif = await Gif.findOne({
      gifUniqueId,
      user,
    });
    if (gif) return gif;
    else return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const editAndDeleteGif = async (ctx: any, gif: GIFType) => {
  const newUser = ctx.user.toObject();
  newUser.userOnStage = {
    stageName: "EDIT",
    details: gif.gifUniqueId,
  };
  await userUpdate(ctx.user, newUser);
  await sendMessage(
    ctx,
    `This Gif was saved before with the key: ${gif.key} `,
    menuCRUD
  );
};

export const createGif = async (ctx: any) => {
  const newUser: any = ctx.user.toObject();
  const gifId: string = ctx.message?.animation?.file_id!;
  const gifUniqueId: string = ctx.message?.animation?.file_unique_id!;
  const gif = new GIFClass(
    gifId,
    gifUniqueId,
    ctx.user._id,
    ctx.user.id,
    undefined
  );
  await Gif.create(gif);
  //Update the user stage
  newUser.userOnStage = {
    stageName: ctx.stageEnums.MESSAGE_PENDING,
    details: gifUniqueId,
  };
  await ctx.user.updateOne(newUser);
  await sendMessage(ctx, "Thanks");
  //   await ctx.replyWithAnimation(ctx.gifData);
  await sendMessage(ctx, "Please send a message for the gif:");
};
