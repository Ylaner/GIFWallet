import {
  cantSaveNewGifMessage,
  saveNewGifOnDatabase,
} from "../controllers/gifControll";

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifRouter = async function (ctx: any) {
  try {
    console.log("gifRouter triggerd");
    const gif = ctx.message.animation;
    switch (ctx.user.userOnStage?.stageName) {
      case ctx.stageEnums.GIF_PENDING:
        await saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.EDIT:
        await saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.NEW:
        await saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.GIF_SAVED:
        await saveNewGifOnDatabase(ctx, gif);
        break;
      default:
        cantSaveNewGifMessage(ctx);
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
