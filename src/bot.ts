const grammy = require("grammy");
const mongoose = require("mongoose");
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
import { errorHandler } from "./controllers/errorControll.js";
import { userAuth } from "./controllers/authControll";
import { commandRouter } from "./routes/commandRouter";
import { gifRouter } from "./routes/gifRouter";
import { inlineQueriesRouter } from "./routes/inlineQueriesRouter";
import { messageRouter } from "./routes/messageRouter";

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
const bot = new grammy.Bot("5353006019:AAGNfZZwBzN_7I0wlIPecKGFQsUB7UJw_88");

errorHandler(bot);
mongoose.set("strictQuery", false);
(async function connect() {
  const db = await mongoose.connect(
    "mongodb+srv://Ylaner:ACMilan00All@cluster0.t84fv.mongodb.net/test",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  );
  console.log("connection to the database was succesful👌👌");
})();

////////////// Middlewares ////////////////// bot.use(fn(ctx, next))
//Auth Control
//After this we pass ctx as EvelateContext Type
bot.use(async (ctx: any, next: Function) => {
  try {
    await userAuth(ctx);
    await next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    throw err;
  }
});

////////////// Commands ////////////////////// bot.command
commandRouter(bot);

//////////////////Listeners///////////////// bot.on("message" , fn() )
bot.on(":animation", async (ctx: any) => {
  try {
    await gifRouter(ctx);
  } catch (err) {
    console.error("Error occurred", err);
  }
});

bot.on("msg:text", async (ctx: any) => {
  await messageRouter(ctx);
});

bot.on("inline_query", async (ctx: any) => {
  await inlineQueriesRouter(ctx);
});
// Start the bot.
bot.start();
