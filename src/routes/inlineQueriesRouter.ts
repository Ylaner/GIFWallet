import { inlineQueriesControll } from "../controllers/inlineQueriesControll";

export const inlineQueriesRouter = async function (ctx: any) {
  try {
    await inlineQueriesControll(ctx);
  } catch (err) {
    console.error(err);
  }
};
