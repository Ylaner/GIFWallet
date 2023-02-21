import { searchForGIF, sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { menu } from "../utils/keyboard";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
exports.gifHandler = async function (ctx: any) {
  console.log("Gif controll triggerd");
  console.log(ctx.update.message?.animation);

  const stageName = ctx.user.userOnStage.stageName;
  //booleans
  const isItGifPending = stageName === ctx.stageEnums.GIF_PENDING;
  const isItNew = stageName === ctx.stageEnums.NEW;
  const isItGifSaved = stageName === ctx.stageEnums.GIF_SAVED;
  //////////////////////////////////////////////////////////
  //Can save new gif?
  if (isItGifPending === false && isItNew === false && isItGifSaved === false) {
    if (stageName === "MESSAGE_PENDING") {
      await sendMessage(
        ctx,
        "you've send another gif before,\nplease send a key for that gif first"
      );
    }
    return;
  }
  /////////////////////////////////////////////////////////////
  //Check the gif not saved before
  if (await searchForGIF(ctx)) {
    await sendMessage(
      ctx,
      "This Gif was saved before, you can change the index or delete this gif ",
      menu
    );
    return;
  }
  const user: any = ctx.user;
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
  user.userOnStage = {
    stageName: ctx.stageEnums.MESSAGE_PENDING,
    details: gifId,
  };
  await user.save();
  await sendMessage(ctx, "Thanks");
  //   await ctx.replyWithAnimation(ctx.gifData);
  await sendMessage(ctx, "Please send a message for the gif:");
};
