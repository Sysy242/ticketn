const Discord = require('discord.js');

const client = new Discord.Client();

const triesPerSecond = 1;

const prefix = "!"

client.on('ready', () => {

    console.log("Je suis co");

});

client.on('message', message => {

    if (message.content === prefix + "tiket") {
        var id = message.author.id  
        message.guild.createChannel(`tiket ${id}`, "text", "false" ) 
        var channel = message.guild.channels.find(ch => ch.name === `tiket-${id}`)
        let role = message.guild.roles.find("name", "ticketmanager");
    let role2 = message.guild.roles.find("name", "@everyone");

    channel.overwritePermissions(role, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });   
        channel.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        channel.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });

    }

    if (message.content === prefix + "delete") {
        message.channel.delete()
    }

    if (message.content.toLowerCase().startsWith(prefix + "ticket")) {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "tickmanager")) return message.channel.send(`This server doesn't have a tickmanager role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`Tu as deja une demmande en cours !`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
          let role = message.guild.roles.find("name", "tickmanager");
          let role2 = message.guild.roles.find("name", "@everyone");

          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });   
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          var embed = new Discord.RichEmbed()
          .setTitle("Tu vas bientot recevoir ton nito !!!")
          .setDescription("Merci de patienter et de ne toucher a rien")
          message.react('✅')
      c.send(embed)
});


    }

});


client.login(process.env.TOKEN);
