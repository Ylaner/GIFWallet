import { EvelateContext } from "../Types/Types";
import { Gif } from "../models/gifModel";

export const inlineQueriesControll = async function (ctx: EvelateContext) {
  console.log("inlineQueriesControll triggerd");
  const query = ctx.update.inline_query?.query!;
  // Test
  console.log(`query: ${query} and userId : ${ctx.user._id} `);
  const gifs = await Gif.find({ key: query, user: ctx.user._id });
  console.log(gifs);
  let i = 0;
  const replyGifs = gifs.map((gif: any) => {
    i++;
    return {
      type: "gif",
      id: "GifWallet" + i,
      title: "Gif",
      gif_file_id: gif.gifId,
    };
  });
  await ctx.answerInlineQuery(replyGifs, {
    cache_time: 60,
    is_personal: true,
    // next_offset: true,
  });
};
