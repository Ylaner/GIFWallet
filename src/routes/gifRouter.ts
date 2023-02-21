const { gifSave, gifHandler } = require("../controllers/gifControll");

export const gifRouter = async function (ctx: any) {
  await gifHandler(ctx);
};
