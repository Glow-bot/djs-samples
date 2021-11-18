const Discord = require("discord.js")
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })
client.login(process.env.token)
const l = new Keyv()
const p = new Keyv()
client.on("messageCreate",async msg=>{
  if(msg.author.bot || !msg.content)return;
  const u = await l.get(msg.author.id) || {lp:350,t:0}
  if(u.m === msg.content){
    u.lp = u.lp - 100;
    u.t = u.t + 1;
  }else if(u.t !== 0){
    u.lp = u.lp + 100;
    u.t = u.t - 1;
  }
  const n = await p.get(msg.author.id) || {p:0};
  l.set(msg.author.id,u)
  n.p = n.p + u.lp *(0.75 + Math.floor(Math.random()*20) / 40)
  p.set(msg.author.id,n)
  if(msg.content === "!point"){
    msg.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`あなたのポイントは${n.p}ポイントです。`)] })
  }
})
