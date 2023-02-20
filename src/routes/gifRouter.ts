const { gifSave } = require("../controllers/gifControll");

export const gifRouter = async function (ctx: any) {
  await gifSave(ctx);
};
