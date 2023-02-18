const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mkchar,mku } = require("../../Database/dataschema.js");



module.exports = {
    name: "chatbotpm",
    alias: ["pmautochat","autoreplypm","chatbotgroup","pmchatbot"],
    desc: "Aktivieren oder deaktivieren Sie die automatische Antwortfunktion in einer Gruppe",
    category: "Mods",
    usage: "pmchatbot [on/off]",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName,modStatus }
    ) => {
    
          if (modStatus=="false"&&!isCreator)  return m.reply('Tut mir leid, nur meine *Devs* und *Mods* können diesen Befehl verwenden !');
  
      let checkdata = await mkchar.findOne({ id: '1' });
      /*var groupe = await Miku.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });*/
  
      if (args[0] === "on") {
        if (!checkdata) {
          await new mkchar({ id: '1', PMchatBot: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*PM-Chatbot Aktiviert !*\n\nBot antwortet auf alle persönlichen Nachrichten.`
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*PM-Chatbot Aktiviert!*\n\nDer Bot antwortet auf alle persönlichen Nachrichten.` },
            { quoted: m }
          );
        } else {
          if (checkdata.PMchatBot == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*Bereits Aktiviert.*\n\nBot antwortet auf alle persönlichen Nachrichten.` },
                { quoted: m }
              );
          await mkchar.updateOne({ id: '1' }, { PMchatBot: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*PM-Chatbot Aktiviert !*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mkchar({ id: '1', PMchatBot: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Chatbot der PM-Gruppe Deaktiviert!*` },
            { quoted: m }
          );
        } else {
          if (checkdata.PMchatBot == "false") return Miku.sendMessage(
            m.from,
            { text: `*Bereits Deaktiviert.*` },
            { quoted: m }
          );
          await mkchar.updateOne({ id: '1'}, { PMchatBot: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*PM-Chatbot Deaktiviert !*` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}pmchatbot on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}pmchatbot off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage6} ,
          caption: `\n *「  PM-Chatbot-Konfiguration  」*\n\nBitte klicken Sie auf die Schaltfläche unten\n*On/Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
