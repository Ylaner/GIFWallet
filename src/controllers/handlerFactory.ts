import { Gif } from "../models/gifModel";

export const sendMessage = async function (
  ctx: any,
  message: string,
  keyboard: any = null
) {
  console.log("GOOOOOOZ");

  if (keyboard === null) await ctx.reply(message);
  else {
    console.log("BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM");
    await ctx.reply(message, { reply_markup: keyboard });
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
export const searchForGIF = async function (ctx: any, index = null) {
  const gifUniqueId = ctx.message?.animation?.file_unique_id!;
  const user = ctx.user._id;
  console.log(`gifId : ${gifUniqueId}`);
  console.log(`userId : ${ctx.user._id}`);
  const gif = await Gif.findOne({
    gifUniqueId,
    user,
  });
  if (gif) return gif;
  else return undefined;
};
