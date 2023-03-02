import { createOne, sendMessage } from "./handlerFactory";
import { Gif } from "../models/gifModel";
import { GIFClass } from "../utils/gifClass";
import { GIFType } from "../utils/types";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const saveNewGifOnDatabase = async (
  ctx: any,
  gifSource: any,
  key: undefined | string[] = undefined
) => {
  try {
    const gifRecivedData = gifSource!;
    const gif = new GIFClass({
      gifId: gifRecivedData.file_id,
      gifUniqueId: gifRecivedData.file_unique_id,
      userObjectId: ctx.user._id,
      userId: ctx.user.id,
      key,
    });
    //Check the gif not saved before
    const gifQuery = await searchForGIF(
      gif.getGifUniqueId,
      gif.getUserObjectId
    );
    if (gifQuery) {
      if (key) {
        sendMessage(ctx, "This GIF saved before");
        return;
      }
      const gif = new GIFClass(gifQuery);
      const isItGifOnDatabase = await gif.isItGifOnDatabase(ctx);
      //If gif is exist send the menu
      if (isItGifOnDatabase) {
        await gif.editGif(ctx);
        return;
      }
    } else {
      await createOne(Gif, gif);
      //Update the user stage
      if (!key) {
        //for private
        const newUser: any = ctx.user.toObject();
        newUser.userOnStage = {
          stageName: ctx.stageEnums.WAIT_FOR_INDEX,
          details: gif.getGifUniqueId,
        };
        await ctx.user.updateOne(newUser);
        await sendMessage(ctx, "Please send a message for the gif:");
      } else {
        //for groups
        await sendMessage(ctx, "Saved");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const cantSaveNewGifMessage = async (ctx: any) => {
  try {
    await sendMessage(
      ctx,
      "you've send another gif before,\nplease send a key for that gif first"
    );
  } catch (err) {
    console.error(err);
  }
};

export const searchForGIF = async function (
  gifUniqueId: string,
  userObjectId: string | number,
  index: string | undefined = undefined
) {
  try {
    const gif = await Gif.findOne({
      gifUniqueId,
      userObjectId,
    });
    if (gif) return gif;
    else return undefined;
  } catch (err) {
    console.error(err);
  }
};
