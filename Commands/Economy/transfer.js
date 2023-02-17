const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 

    name: "transfer",  
    desc: "Geld übertragen.", 
    alias: ["give"],
    category: "Economy",  
    react: "💴", 
    start: async ( 
        Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        let value = text.trim().split(" ");
    if (value[0] === "") return m.reply(`Gebe ${prefix}transfer 100 @user`);
    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Bitte markieren Sie ein Benutzer ${pushName} senpai 🤦‍♂️ !` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let user = (await mentionedUser) || m.msg.contextInfo.participant;
    //let user = mentionByTag[0];
    
    const cara = "cara"
        const user1 = m.sender
        const user2 = user
        const word = value[0];
		const code = value[1];
        let d = parseInt(word)
		if (!d)return m.reply('Überprüfen Sie Ihren Text, wenn Sie den Befehl falsch verwenden👀');
        const balance = await eco.balance(user1, cara);
        let a = (balance.wallet) < parseInt(word)
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        if(a == true) return m.reply("Sie haben nicht genug Geld, um zu überweisen👎");

        const deduct = await eco.deduct(user1, cara, value[0]);
        const give = await eco.give(user2, cara, value[0]);
        let buttons = [
            {
              buttonId: `${prefix}wallet`,
              buttonText: { displayText: "Wallet 💳" },
              type: 1,
            },
            {
                buttonId: `${prefix}Bank`,
              buttonText: { displayText: "Bank 🏦" },
              type: 1,

            },
          ];
          let buttonMessage = {
            image: fs.readFileSync("./Assets/Img/card.png"), 
            caption: `*📠 Transaktion erfolgreich von ${word} 💷*`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
          };
        
          await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
        }
    }
Footer
