import { gifHandler } from "../controllers/gifControll";
export const gifRouter = async function (ctx: any) {
  try {
    await gifHandler(ctx);
  } catch (err) {
    console.log(err);
  }
};
