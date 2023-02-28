import { userUpdate } from "../controllers/authControll";
import { searchForGIF } from "../controllers/gifControll";
import { sendMessage, createOne } from "../controllers/handlerFactory";

import { menuCRUD } from "./Menu";
import { GIFType } from "./types";

export class GIFClass {
  private readonly gifId: string;
  private readonly gifUniqueId: string;
  private readonly userObjectId: any;
  private readonly userId: number;
  private key: string[] | undefined;
  constructor(source: GIFType) {
    console.log(source.gifId);
    this.gifId = source.gifId;
    this.gifUniqueId = source.gifUniqueId;
    this.userObjectId = source.userObjectId;
    this.userId = source.userId;
    if (source.key) this.key = source.key.map((e) => e);
  }
  //how to make a copy constructor?
  //getters
  public get getGifId(): string {
    return this.gifId;
  }
  public get getGifUniqueId(): string {
    return this.gifUniqueId;
  }
  public get getUser(): string {
    return this.userObjectId;
  }
  public get getUserId(): number {
    return this.userId;
  }
  public get getKey(): string[] | undefined {
    if (this.key) return this.key.map((e) => e);
    else return undefined;
  }

  //setters
  public set value(key: string[]) {
    if (!key) this.key = [];
    this.key = key.map((e) => e);
  }

  //actions

  isItGifOnDatabase = async (ctx: any) => {
    const gif = await searchForGIF(this.gifUniqueId, ctx.user._id);
    if (gif) return true;
    else return false;
  };

  editGif = async function (this: GIFClass, ctx: any) {
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
}
////////////////////////////////////////////////////////////////
