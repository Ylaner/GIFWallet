import { Gif } from "../models/gifModel";

export const inlineQueriesControll = async function (ctx: any) {
  try {
    const query = ctx.update.inline_query?.query!;
    // Test
    const arrayOfQuery = query.toLowerCase().split(" ");
    const gifs = await Gif.find({
      key: { $all: arrayOfQuery },
      userObjectId: ctx.user._id,
    });
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
  } catch (err) {
    console.error(err);
  }
};
