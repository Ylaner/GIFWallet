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
    console.error(err);
  }
};
//////////////////////////////
export const wait = function (seconds: number) {
  try {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(console.log(`${seconds} passed!`));
      }, seconds * 1000);
    });
  } catch (err) {
    console.error(err);
  }
};
//////////////////////////////
export const createOne = async function (Model: any, object: any) {
  try {
    await Model.create(object);
  } catch (err) {
    console.error(err);
  }
};
