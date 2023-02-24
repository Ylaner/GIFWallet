import {
  createGif,
  editAndDeleteGif,
  gifRunValidator,
  isItGifExist,
} from "../controllers/gifControll";
import { GIFType } from "../utils/types";
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifRouter = async function (ctx: any) {
  try {
    console.log("gifRouter triggerd");
    //Can save new gif or Edit?
    if (!gifRunValidator(ctx)) return;
    //Check the gif not saved before
    const gif: GIFType = await isItGifExist(ctx, true);
    //If gif is exist before send the menu
    if (gif) {
      await editAndDeleteGif(ctx, gif);
      return;
    }
    await createGif(ctx);
  } catch (err) {
    console.log(err);
  }
};
