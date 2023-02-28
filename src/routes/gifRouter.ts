import {
  cantSaveNewGifMessage,
  saveNewGifOnDatabase,
} from "../controllers/gifControll";

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export const gifRouter = async function (ctx: any) {
  try {
    console.log("gifRouter triggerd");
    switch (ctx.user.userOnStage?.stageName) {
      case ctx.stageEnums.GIF_PENDING:
        saveNewGifOnDatabase(ctx);
        break;
      case ctx.stageEnums.EDIT:
        saveNewGifOnDatabase(ctx);
        break;
      case ctx.stageEnums.NEW:
        saveNewGifOnDatabase(ctx);
        break;
      case ctx.stageEnums.GIF_SAVED:
        saveNewGifOnDatabase(ctx);
        break;
      default:
        cantSaveNewGifMessage(ctx);
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
