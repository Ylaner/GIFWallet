import { sendMessage } from "../controllers/handlerFactory";
import { addKey, updateKey } from "../controllers/messageControll";
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
export const messageRouter = async function (ctx: any) {
  try {
    console.log("message Router  triggerd");
    const newUser = ctx.user;
    switch (newUser.userOnStage?.stageName) {
      case ctx.stageEnums.MESSAGE_PENDING:
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
    console.log(err);
  }
};
