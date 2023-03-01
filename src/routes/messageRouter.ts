import { sendMessage } from "../controllers/handlerFactory";
import { addKey, updateKey } from "../controllers/messageControll";
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
export const messageRouter = async function (ctx: any) {
  try {
    switch (ctx.user.userOnStage?.stageName) {
      case ctx.stageEnums.WAIT_FOR_INDEX:
        await addKey(ctx);
        break;
      case ctx.stageEnums.EDIT:
        await updateKey(ctx);
        break;
      default:
        await sendMessage(ctx, "Please send your GIF first.");
        break;
    }
  } catch (err) {
    console.error(err);
  }
};
