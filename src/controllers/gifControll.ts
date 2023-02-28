import { sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { GIFClass } from "../utils/gifClass";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const saveNewGifOnDatabase = async (ctx: any) => {
  //Check the gif not saved before

  const gifQuery = await searchForGIF(
    ctx.message?.animation?.file_unique_id,
    ctx.user._id
  );
  if (gifQuery) {
    const gif = new GIFClass(gifQuery);
    const isItGifOnDatabase = await gif.isItGifOnDatabase(ctx);
    //If gif is exist before send the menu
    if (isItGifOnDatabase) {
      await gif.editGif(ctx);
      return;
    }
  } else await createGif(ctx);
};
export const cantSaveNewGifMessage = async (ctx: any) => {
  await sendMessage(
    ctx,
    "you've send another gif before,\nplease send a key for that gif first"
  );
};

export const searchForGIF = async function (
  gifUniqueId: string,
  user: string | number,
  index: string | undefined = undefined
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

export const createGif = async (ctx: any) => {
  const newUser: any = ctx.user.toObject();
  const gifId: string = ctx.message?.animation?.file_id!;
  const gifUniqueId: string = ctx.message?.animation?.file_unique_id!;
  console.log(gifId);

  const gif = new GIFClass({
    gifId,
    gifUniqueId,
    userObjectId: ctx.user._id,
    userId: ctx.user.id,
    key: undefined,
  });
  await Gif.create(gif);
  //Update the user stage
  newUser.userOnStage = {
    stageName: ctx.stageEnums.WAIT_FOR_INDEX,
    details: gifUniqueId,
  };
  await ctx.user.updateOne(newUser);
  //   await ctx.replyWithAnimation(ctx.gifData);
  await sendMessage(ctx, "Please send a message for the gif:");
};
