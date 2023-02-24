import { Menu } from "@grammyjs/menu";
import { userAuth } from "../controllers/authControll";
import { searchForGIF } from "../controllers/gifControll";
import { sendMessage } from "../controllers/handlerFactory";
import { Gif } from "../models/gifModel";

import { buttonObj, buttonsArray, GIFType, UserData } from "../Types/Types";

// .text("EDIT", (ctx: any) => {})
// .text("DELETE", (ctx) => ctx.reply("You pressed B!"))
// .row()
// .text("CANCEL", (ctx) => ctx.reply("You pressed c!"));

const menuMaker = function (menuKey: string, buttonsArray: buttonsArray) {
  const menu = new Menu(menuKey);

  if (buttonsArray != null)
    buttonsArray.forEach((buttonObj: buttonObj) => {
      menu.text(buttonObj.name, buttonObj.action);
      if (buttonObj.hasRow === true) menu.row();
    });

  return menu;
};

export const menuCRUD = menuMaker("menuCRUD", [
  {
    name: "EDIT",
    hasRow: false,
    action: async (ctx: any) => {
      await sendMessage(ctx, "Send a new index for your GIF");
    },
  },
  {
    name: "DELETE",
    hasRow: true,
    action: async (ctx: any) => {
      await userAuth(ctx);
      const newUser: UserData = ctx.user.toObject();
      const gif: any = await searchForGIF(
        newUser.userOnStage.details,
        newUser._id
      );
      await gif.deleteOne();
      newUser.userOnStage.stageName = ctx.stageEnums.GIF_SAVED;
      newUser.userOnStage.details = "";
      await ctx.user.updateOne(newUser);
      await sendMessage(ctx, "Your GIF was deleted");
    },
  },
  {
    name: "CANCEL",
    hasRow: false,
    action: (ctx: any) => {},
  },
]);
