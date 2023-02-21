import { EvelateContext } from "../Types/Types";
import { sendMessage } from "./handlerFactory";
import { searchForGIF } from "./gifControll";

export const messageControll = async (ctx: EvelateContext) => {
  console.log("message controll triggerd");
  const user = ctx.user;
  if (user.userOnStage?.stageName === ctx.stageEnums.MESSAGE_PENDING) {
    //Task 1 find the gif based of user id and gif id
    const gif = await searchForGIF(user.userOnStage.details, user._id);
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
    await sendMessage(ctx, "Your GIF is saved.");
  } else await sendMessage(ctx, "Please send your GIF first.");
};
