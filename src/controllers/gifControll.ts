import { EvelateContext } from "../Types/Types";

const Gif = require("../models/gifModel");
const { wait, sendMessage } = require("./handlerFactory");

exports.gifSave = async function (ctx: EvelateContext) {
  console.log("Gif controll triggerd");
  console.log(ctx.update.message?.animation);

  const stageName = ctx.user.userOnStage.stageName;
  const isItGifPending = stageName == ctx.stageEnums.GIF_PENDING;
  const isItNew = stageName == ctx.stageEnums.NEW;
  const isItGifSaved = stageName == ctx.stageEnums.GIF_SAVED;
  if (isItGifPending == false && isItNew == false && isItGifSaved == false) {
    await sendMessage(ctx, stageName);
    if (stageName == "MESSAGE_PENDING") {
      await sendMessage(
        ctx,
        "you've send another gife before,\nplease send a key for that gif first"
      );
    }
    return;
  }
  if (await isGifExist(ctx)) {
    await sendMessage(ctx, "This Gif was saved before");
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
  await wait(0.5);
  await sendMessage(ctx, "Please send a message for the gif:");
};

const isGifExist = async function (ctx: EvelateContext) {
  const gifUniqueId = ctx.message?.animation?.file_unique_id!;
  const user = ctx.user._id;
  console.log(`gifId : ${gifUniqueId}`);
  console.log(`userId : ${ctx.user._id}`);
  const gif = await Gif.findOne({
    gifUniqueId,
    user,
  });
  console.log(gif);
  if (gif) return true;
  else return false;
};
