import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent] 
});


client.on('messageCreate',(message)=>{

    if(message.author.bot) return;
    // console.log(message.content)
    message.reply({
        content: "Hii From Bot"
    });
})

client.on("interactionCreate",(interaction)=>{
    console.log(interaction);
    interaction.reply("Pong!");
})

client.login("MTIxNTUzMzgwMTE2MjQxNjE2OA.G8i_jC.vpXM9EGgGJIqtkoPQ2RylGeRObWzLfXeHSlwsc");