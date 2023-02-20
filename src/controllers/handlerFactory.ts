export const sendMessage = async function (ctx: any, message: string) {
  await ctx.reply(message);
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
