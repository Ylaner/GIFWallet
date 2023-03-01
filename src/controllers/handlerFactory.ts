export const sendMessage = async function (
  ctx: any,
  message: string,
  menu: any = null
) {
  try {
    if (menu === null) await ctx.reply(message);
    else {
      await ctx.reply(message, { reply_markup: menu });
    }
  } catch (err) {
    console.log(err);
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
export const createOne = async function (Model: any, object: any) {
  await Model.create(object);
};
