// type Ctx<Context> = Partial<Context> & {
//   stageEnums: {"NEW" | "GIF_PENDING" | "MESSAGE_PENDING" | "GIF_SAVED"};
// };

export type UserData = {
  first_name: string;
  last_name: string;
  id: number;
  _id: string;
  is_bot: Boolean;
  language_code: string;
  username: string;
  userOnStage: {
    stageName: "NEW" | "GIF_PENDING" | "MESSAGE_PENDING" | "GIF_SAVED" | "EDIT";
    details: string;
  };
};

// export interface EvelateContext {
//   user: {
//     first_name: string;
//     last_name: string;
//     id: number;
//     _id: string;
//     is_bot: boolean;
//     language_code: string;
//     username: string;
//     userOnStage: {
//       stageName:
//         | "NEW"
//         | "GIF_PENDING"
//         | "MESSAGE_PENDING"
//         | "GIF_SAVED"
//         | "EDIT";
//       details: any;
//     };
//     updateOne: Function;
//   };
//   stageEnums: {
//     NEW: "NEW";
//     GIF_PENDING: "GIF_PENDING";
//     MESSAGE_PENDING: "MESSAGE_PENDING";
//     GIF_SAVED: "GIF_SAVED";
//     EDIT: "EDIT";
//   };

//   from: {
//     first_name: string;
//     last_name: string;
//     id: number;
//     is_bot: boolean;
//     language_code: string;
//     username: string;
//   };
//   message: any;
//   // update: {
//   //   update_id: number;
//   //   message: {
//   //     message_id: number;
//   //     from: [Object];
//   //     chat: [Object];
//   //     date: number;
//   //     animation: [Object];
//   //     document: [Object];
//   //   };
//   // };
//   update: any;
//   file_id: string;
//   file_unique_id: string;
//   file_size: number;
//   answerInlineQuery: Function;
// }

export type buttonObj = {
  name: string;
  hasRow: boolean;
  action: any;
};
export type buttonsArray = buttonObj[];

export type GIFType = {
  gifId: string;
  gifUniqueId: string;
  user: any;
  userId: number;
  key: string[];
};
