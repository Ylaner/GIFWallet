import { stageEnums } from "../utils/enums";
import { User } from "../models/userModel";
import { sendMessage } from "./handlerFactory";
import { UserData } from "../utils/types";
////////////////////////////////////////////

////////////////////////////////////////////
export const userAuth = async function (ctx: any) {
  try {
    console.log("userAuth triggerd");
    ctx.stageEnums = { ...stageEnums };

    const userData = {
      ...ctx.from,
      userOnStage: {
        stageName: ctx.stageEnums.NEW,
        details: "Create new user",
      },
    } as UserData;

    const id = ctx.from.id;
    let newUser = await User.findOne({ id });

    if (!newUser) {
      newUser = await userCreate(userData);
      console.log(newUser);
      await sendMessage(ctx, "Welcome,I will be wait for your first GIF");
    }
    //passing the query
    ctx.user = newUser;
  } catch (err) {
    console.log(err);
  }
};

export const userCreate = async (userData: UserData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const userUpdate = async (query: any, newData: object) => {
  await query.updateOne(newData);
};
