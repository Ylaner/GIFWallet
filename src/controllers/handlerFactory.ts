import { Gif } from "../models/gifModel";

export const sendMessage = async function (
  ctx: any,
  message: string,
  menu: any = null
) {
  if (menu === null) await ctx.reply(message);
  else {
    await ctx.reply(message, { reply_markup: menu });
  }
};
//////////////////////////////
export const wait = function (seconds: number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(console.log(`${seconds} passed!`));
    }, seconds * 1000);
  });
};
//////////////////////////////
