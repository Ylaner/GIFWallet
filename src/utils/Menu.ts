import { Menu } from "@grammyjs/menu";
import { buttonObj, buttonsArray } from "../Types/Types";

// .text("EDIT", (ctx: any) => {})
// .text("DELETE", (ctx) => ctx.reply("You pressed B!"))
// .row()
// .text("CANCEL", (ctx) => ctx.reply("You pressed c!"));

const menuMaker = function (menuKey: string, buttonsArray: buttonsArray) {
  const menu = new Menu(menuKey);

  if (buttonsArray != null)
    buttonsArray.forEach((buttonObj: buttonObj) => {
      menu.text(buttonObj.name, buttonObj.action);
      if (buttonObj.hasRow === true) menu.row;
    });

  return menu;
};

export const menuCRUD = menuMaker("menuCRUD", [
  {
    name: "EDIT",
    hasRow: false,
    action: (ctx: any) => {
      ctx.reply("you click on EDIT");
    },
  },
  {
    name: "DELETE",
    hasRow: false,
    action: (ctx: any) => {},
  },
  {
    name: "CANCEL",
    hasRow: false,
    action: (ctx: any) => {},
  },
]);
