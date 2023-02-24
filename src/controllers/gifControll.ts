import { sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { menuCRUD } from "../utils/Menu";
import { GIFType } from "../Types/Types";
import { userUpdate } from "./authControll";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifRunValidator = async (ctx: any) => {
  const stageName = ctx.user.userOnStage.stageName;
  //booleans
  const isItGifPending = stageName === ctx.stageEnums.GIF_PENDING;
  const isItEdit = stageName === ctx.stageEnums.EDIT;
  const isItNew = stageName === ctx.stageEnums.NEW;
  const isItGifSaved = stageName === ctx.stageEnums.GIF_SAVED;
  if (
    isItGifPending === false &&
    isItEdit === false &&
    isItNew === false &&
    isItGifSaved == false
  ) {
    if (stageName === "MESSAGE_PENDING") {
      await sendMessage(
        ctx,
        "you've send another gif before,\nplease send a key for that gif first"
      );
    }
    return false;
  }
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

export const gifHandler = async function (ctx: any) {
  try {
  } catch (err) {
    console.log(err);
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

  const gifObject: {
    gifId: string;
    gifUniqueId: string;
    userId: any;
    user: any;
    key: null | string;
  } = {
    gifId: gifId,
    gifUniqueId: gifUniqueId,
    userId: ctx.user.id,
    user: ctx.user._id,
    key: null,
  };
  await Gif.create(gifObject);
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
