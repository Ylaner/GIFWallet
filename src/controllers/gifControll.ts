import { sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { menuCRUD } from "../utils/Menu";
import { GIFType } from "../Types/Types";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifHandler = async function (ctx: any) {
  try {
    console.log("Gif controll triggerd");
    const stageName = ctx.user.userOnStage.stageName;
    //booleans
    const isItGifPending = stageName === ctx.stageEnums.GIF_PENDING;
    const isItEDIT = stageName === ctx.stageEnums.EDIT;
    //////////////////////////////////////////////////////////
    //Can save new gif?
    if (isItGifPending === false && isItEDIT === false) {
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
    const gif: GIFType = await searchForGIF(
      ctx.message?.animation?.file_unique_id,
      ctx.user._id
    );
    if (gif) {
      console.log("SUUUUUUUUUUUU");
      await sendMessage(
        ctx,
        `This Gif was saved before with the key: ${gif.key} `,
        menuCRUD
      );
      return;
    }
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
