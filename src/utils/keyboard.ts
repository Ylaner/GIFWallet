import { Menu } from "@grammyjs/menu";

export const menu = new Menu("GIF EDIT")
  .text("A", (ctx) => ctx.reply("You pressed A!"))
  .text("B", (ctx) => ctx.reply("You pressed B!"))
  .row()
  .text("c", (ctx) => ctx.reply("You pressed c!"));
