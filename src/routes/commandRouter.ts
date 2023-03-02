import { addController, startController } from "../controllers/commandControll";

export const commandRouter = async (ctx: any, route: string) => {
  try {
    switch (route) {
      case "add":
        await addController(ctx);
        break;
      case "start":
        await startController(ctx);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
};
