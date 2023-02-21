import { Gif } from "../models/gifModel";

export const sendMessage = async function (
  ctx: any,
  message: string,
  menu: any = null
) {
  console.log(`THIS IS THE MENU${menu}`);
  if (menu != null) await ctx.reply(message);
  else await ctx.reply(message, { reply_markup: menu });
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
export const searchForGIF = async function (ctx: any, index = null) {
  const gifUniqueId = ctx.message?.animation?.file_unique_id!;
  const user = ctx.user._id;
  console.log(`gifId : ${gifUniqueId}`);
  console.log(`userId : ${ctx.user._id}`);
  const gif = await Gif.findOne({
    gifUniqueId,
    user,
  });
  console.log(gif);
  if (gif) return gif;
  else return undefined;
};
