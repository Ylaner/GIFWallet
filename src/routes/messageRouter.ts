const { messageControll } = require("../controllers/messageControll");

export const messageRouter = async function (ctx: any) {
  await messageControll(ctx);
};
