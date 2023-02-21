import { EvelateContext, UserData } from "../Types/Types";
import { stageEnums } from "../utils/enums";
const User = require("../models/userModel");
////////////////////////////////////////////

////////////////////////////////////////////
export const userAuth = async function (ctx: EvelateContext) {
  console.log("userAuth triggerd");
  ctx.stageEnums = { ...stageEnums };

  const userData = {
    ...ctx.from,
    userOnStage: { stageName: ctx.stageEnums.NEW, details: "Create new user" },
  } as UserData; // !!!!!!!!!!!!! if userData = ctx.from  just copy the refrence

  const id = ctx.from.id;
  let newUser = await User.findOne({ id });

  if (!newUser) {
    newUser = await User.create(userData);
  }
  console.log(ctx);
  ctx.user = newUser;
};
