const {
  inlineQueriesControll,
} = require("../controllers/inlineQueriesControll");

export const inlineQueriesRouter = async function (ctx: any) {
  await inlineQueriesControll(ctx);
};
