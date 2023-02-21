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
export const searchForGIF = async function (
  gifUniqueId: string,
  user: string | number,
  index = null
) {
  console.log(`gifId : ${gifUniqueId}`);
  console.log(`userId : ${user}`);
  const gif = await Gif.findOne({
    gifUniqueId,
    user,
  });
  if (gif) return gif;
  else return undefined;
};
