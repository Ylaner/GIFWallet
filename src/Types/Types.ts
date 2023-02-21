const mongoose = require("mongoose");
const { grammy } = require("grammy");

// type Ctx<Context> = Partial<Context> & {
//   stageEnums: {"NEW" | "GIF_PENDING" | "MESSAGE_PENDING" | "GIF_SAVED"};
// };

export type UserData = {
  first_name: String;
  last_name: String;
  id: number;
  is_bot: Boolean;
  language_code: String;
  username: String;
  userOnStage: {
    stageName: "NEW" | "GIF_PENDING" | "MESSAGE_PENDING" | "GIF_SAVED";
    details: String;
  };
};

export interface EvelateContext {
  user: {
    first_name: string;
    last_name: string;
    id: number;
    _id: string;
    is_bot: boolean;
    language_code: string;
    username: string;
    userOnStage: {
      stageName: "NEW" | "GIF_PENDING" | "MESSAGE_PENDING" | "GIF_SAVED";
      details: any;
    };
    updateOne: Function;
  };
  stageEnums: {
    NEW: "NEW";
    GIF_PENDING: "GIF_PENDING";
    MESSAGE_PENDING: "MESSAGE_PENDING";
    GIF_SAVED: "GIF_SAVED";
  };

  from: {
    first_name: string;
    last_name: string;
    id: number;
    is_bot: boolean;
    language_code: string;
    username: string;
  };
  message: any;
  // update: {
  //   update_id: number;
  //   message: {
  //     message_id: number;
  //     from: [Object];
  //     chat: [Object];
  //     date: number;
  //     animation: [Object];
  //     document: [Object];
  //   };
  // };
  update: any;
  file_id: string;
  file_unique_id: string;
  file_size: number;
  answerInlineQuery: Function;
}
