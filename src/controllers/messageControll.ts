import { EvelateContext } from "../Types/Types";

const Gif = require("../models/gifModel");
const { sendMessage } = require("./handlerFactory");

exports.messageControll = async (ctx: EvelateContext) => {
  console.log("message controll triggerd");
  const user = ctx.user;
  if (user.userOnStage?.stageName === ctx.stageEnums.MESSAGE_PENDING) {
    //Task 1 find the gif based of user id and gif id
    const gif = await Gif.findOne({
      userId: user.id,
      gifId: user.userOnStage.details,
    });
    ////Test
    // console.log(`I FOUND THE FUCKING GIF!!!!!!`);
    // console.log(gif);

    //Task 2 - Update gif.key
    gif.key = ctx.message.text;
    await gif.updateOne(gif);
    //Task 3 - Update user.userOnStage
    user.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
    user.userOnStage.details = null;
    await ctx.user.updateOne(user);
    //Task last
    await sendMessage(ctx, "Ur gif was saved.");
  } else await sendMessage(ctx, "Please Send ur gif first.");
};
