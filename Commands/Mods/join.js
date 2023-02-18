const fs = require("fs");
const { mku } = require("../../Database/dataschema.js");

module.exports = {
    name: "join",
    alias: ["joingc"],
    desc: "Bitten Sie den Bot, einer Gruppe beizutreten",
    category: "Mods",
    usage: "join <link>",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, text,prefix, isCreator, pushName,modStatus }
    ) => {
      
      if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur mein *Owner* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });

        if (!text) return Miku.sendMessage(m.from, { text: 'Bitte geben Sie einen gültigen WhatsApp-Gruppenlink an !' }, { quoted: m });
        if (!args[0].includes('whatsapp.com')) return Miku.sendMessage(m.from, { text: 'Bitte geben Sie einen gültigen WhatsApp-Gruppenlink an !' }, { quoted: m });
        let gcJoinCode = args[0].split('https://chat.whatsapp.com/')[1]
        
        await  Miku.groupAcceptInvite(gcJoinCode).then( async (res) => {
          Miku.sendMessage(m.from, { text: `_Erfolgreich beigetreten !_`}, { quoted: m }).catch((e)=>{
            Miku.sendMessage(m.from, { text: `_Beitritt zur Gruppe fehlgeschlagen ! Vielleicht wurde der Bot vorher von dort entfernt !_`}, { quoted: m })
          }
          )
        }).catch((e)=>{
          Miku.sendMessage(m.from, { text: `_Beitritt zur Gruppe fehlgeschlagen ! Vielleicht wurde der Bot vorher von dort entfernt !_`}, { quoted: m })
        }
        )
    },
  };
  
