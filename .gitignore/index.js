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

        var embed = new Discord.RichEmbed()
        .setTitle("Tu vas bientot recevoir ton nito !!!")
        .setDescription("Merci de patienter et de ne toucher a rien")
        message.react('✅')
        channel.send(embed)

    }

    if (message.content === prefix + "delete") {
        message.guild.channels.delete
    }

    if (message.content.toLowerCase().startsWith(prefix + "test")) {
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
          channel.send(embed)
  
          var args = message.content.split(" ").slice(1);

      var embed = new Discord.RichEmbed()
      .setTitle("Merci | Thank you " + message.author.username + "#" + message.author.discriminator)
      .addField("Invite moi ", "[Clique ici pour être redirigé](https://discordapp.com/oauth2/authorize?client_id=606181494125494273&scope=bot&permissions=2146958847)")
      .addField("Merci d'avoir utiliser le support , votre requette est en attentes , un administrateur vous contacteras via ce salon \n \n \n Thank you for using the support, your request is pending, an administrator will contact you through this show")
      .setThumbnail(message.author.avatarURL)
      c.send(embed)
      c.send("quel est votre question ??? \n \n \n What's your question???")
});


    }

});


client.login(process.env.TOKEN);
