import {
  canSaveNewGif,
  createGif,
  searchForGIF,
} from "../controllers/gifControll";
import { GIFClass } from "../utils/gifClass";
import { GIFType } from "../utils/types";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifRouter = async function (ctx: any) {
  try {
    console.log("gifRouter triggerd");
    //Can save new gif or Edit?
    const canSaveNewGIF = await canSaveNewGif(ctx);
    if (!canSaveNewGIF) return;
    //Check the gif not saved before

    const gifQuery: GIFType = await searchForGIF(
      ctx.message?.animation?.file_unique_id,
      ctx.user._id
    );

    const gif = new GIFClass(
      gifQuery?.gifId,
      gifQuery?.gifUniqueId,
      gifQuery?.userObjectId,
      gifQuery?.userId,
      gifQuery?.key
    );
    const isItGifOnDatabase = await gif.isItGifOnDatabase(ctx);
    //If gif is exist before send the menu
    if (isItGifOnDatabase) {
      await gif.editGif(ctx);
      return;
    }
    await createGif(ctx);
  } catch (err) {
    console.log(err);
  }
};
