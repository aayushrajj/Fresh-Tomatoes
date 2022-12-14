
const { Telegraf } = require('telegraf')
const axios = require("axios");
// const request = require('request');
require('dotenv').config();

const bot=new Telegraf(process.env.TEL_KEY);

apiKey = process.env.API_KEY;


// var options = {
//   url:'http://www.omdbapi.com',
//   method: 'GET',

//   params: {
//     apikey:movieapi,
//     t: "badla"
//   }
// };

// const options = {
//   url: 'http://www.omdbapi.com',
//   qs: {
//     t: movieTitle,
//     apikey: movieapi,
//   },
// };

// var fetchUpdates =  async(options) => {
//     try {
//        var data = await axios (options)
//        .catch((e) => console.log(e));
     
//         return (data);
      
//     } catch (e) {
//       throw e;
//     }
// }

// request(options, (error, response, body) => {
//   if (error) {
//     console.log(error);
//   } else {
//     const data = JSON.parse(body);
//     console.log(data);
//     return (data);
//   }
// });

bot.telegram.setMyCommands([
    { command: '/start', description: 'start a dialogue the Fresh Tomato' },
    { command: '/help', description: 'know different and functionalities available' },
    { command: '/about', description: 'to know more about bot maker' },
    { command: '/movie', description: 'get info about your movie' }
])

bot.command("movie", async (ctx) => {
  
  const query = ctx.message.text;


    try {
      ctx.reply(`${Date()}`);
      ctx.reply("⌛️ Please Wait It will take few seconds to grab Details"); // bot will send a reply to users. 
     
      axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`).then((response) => {
        console.log(response.data);
        ctx.reply( `Details: ${response}`);    
      })
      // .catch((error) => {
      //   console.error(error);
      // });

      // const values = await fetchUpdates(options);
      // console.log(`done `);



    
    

     
      
    } catch (e) {
      console.log(e);
      ctx.reply("Please try after sometime Server is down :(")
    }
  });


bot.start(ctx => ctx.reply(`
Hi, I'm a simple bot.
I will return the details about any movie.
(please write /help to know how to use)
Visit site https://cric-newsupdate.netlify.app/ 
`))

bot.command('about', (ctx) => {
    ctx.reply(`Hey, my name @aayushrajj and I created this Bot using Node js to get any Moive info. You can also visit the site https://cric-newsupdate.netlify.app/ `)
})

bot.help(ctx => ctx.reply(`
   Write /movie [MOVIE NAME] to get info about that movie 
  Write /about to know about me.
  Send a sticker to get emoji in return.
`))

bot.on('sticker', (ctx) => ctx.reply('👍'))



bot.launch();


