import { userUpdate } from "../controllers/authControll";
import { sendMessage, createOne } from "../controllers/handlerFactory";
import { Gif } from "../models/gifModel";
import { menuCRUD } from "./Menu";

export class GIFClass {
  private readonly gifId: string;
  private readonly gifUniqueId: string;
  private readonly user: any;
  private readonly userId: number;
  private key: string[] | undefined;
  constructor(
    gifId: string,
    gifUniqueId: string,
    user: any,
    userId: number,
    key?: string[]
  ) {
    this.gifId = gifId;
    this.gifUniqueId = gifUniqueId;
    this.user = user;
    this.userId = userId;
    if (key) this.key = { ...key };
  }
  //getters
  public get getGifId(): string {
    return this.gifId;
  }
  public get getGifUniqueId(): string {
    return this.gifUniqueId;
  }
  public get getUser(): string {
    return this.user;
  }
  public get getUserId(): number {
    return this.userId;
  }
  public get getKey(): string[] | undefined {
    if (this.key) return { ...this.key };
    else return undefined;
  }

  //setters
  public set value(key: string[]) {
    if (!key) this.key = [];
    this.key = new Array(...key);
  }

  //actions

  isItGifOnDatabase = async (ctx: any) => {
    const gif = await this.searchForGIF(this.gifUniqueId, ctx.user._id);
    if (gif) return true;
    else return false;
  };

  searchForGIF = async function (
    this: GIFClass,
    user: string | number,
    index = undefined
  ) {
    const gifUniqueId = this.gifUniqueId;
    console.log(`gifId : ${gifUniqueId}`);
    console.log(`userId : ${user}`);
    const gif = await Gif.findOne({
      gifUniqueId,
      user,
    });
    if (gif) return gif;
    else return undefined;
  };

  editAndDeleteGif = async function (this: GIFClass, ctx: any) {
    const newUser = ctx.user.toObject();
    newUser.userOnStage = {
      stageName: "EDIT",
      details: this.gifUniqueId,
    };
    await userUpdate(ctx.user, newUser);
    await sendMessage(
      ctx,
      `This Gif was saved before with the key: ${this.key} `,
      menuCRUD
    );
  };
  createGif = async function (this: GIFClass, ctx: any) {
    const newUser: any = ctx.user.toObject();

    const gifObject: GIFClass = this;
    await createOne(Gif, gifObject);
    //Update the user stage
    newUser.userOnStage = {
      stageName: ctx.stageEnums.MESSAGE_PENDING,
      details: this.gifUniqueId,
    };
    await ctx.user.updateOne(newUser);
    //   await ctx.replyWithAnimation(ctx.gifData);
    await sendMessage(ctx, "Please send a message for the gif:");
  };
}
////////////////////////////////////////////////////////////////
