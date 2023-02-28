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
        saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.EDIT:
        saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.NEW:
        saveNewGifOnDatabase(ctx, gif);
        break;
      case ctx.stageEnums.GIF_SAVED:
        saveNewGifOnDatabase(ctx, gif);
        break;
      default:
        cantSaveNewGifMessage(ctx);
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
