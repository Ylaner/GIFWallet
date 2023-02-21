import { Menu } from "@grammyjs/menu";

export const menu = new Menu("GIF EDIT")
  .text("EDIT", (ctx) => ctx.reply("You pressed A!"))
  .text("DELETE", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("CANCEL", (ctx) => ctx.reply("You pressed c!"));
