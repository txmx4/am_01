const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk,mku, mkchar } = require("../../Database/dataschema.js");



module.exports = {
    name: "modeswitch",
    alias: ["mode","botmode"],
    desc: "Ändern Sie den Bot-Arbeitsmodus in public/private",
    category: "Mods",
    usage: "mode [public/private]",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName,botNumber,modStatus }
    ) => {
    
          if (modStatus=="false"&&!isCreator)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur mein *Owner* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });
          if (args[0]=="self"&& m.sender != botNumber) {
            return Miku.sendMessage(m.from, { text: 'Tut mir leid, nur *Bot-Owner* kann diese Funktion nutzen !' }, { quoted: m });
          }

      let checkdata = await mkchar.findOne({ id: '1'});
      var groupe = await Miku.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (args[0] === "private") {
        if (!checkdata) {
          await new mkchar({ id: '1', privateMode: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*Der private Modus* wurde *Aktiviert* !\n\nJetzt können nur *Mods* meine Befehle verwenden !`
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*Privatmodus* wurde *Aktiviert* !\n\nJetzt können nur *Mods* meine Befehle verwenden!` },
            { quoted: m }
          );
        } else {
          if (checkdata.privateMode == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*Privatmodus* ist bereits *Aktiviert* !\n\nJetzt können nur *Mods* meine Befehle verwenden !` },
                { quoted: m }
              );
          await mkchar.updateOne({ id: '1'}, { privateMode: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*Privatmodus* wurde *Aktiviert* !\n\nJetzt können nur *Mods* meine Befehle verwenden !` },
            { quoted: m }
          );
        }
      } else if (args[0] === "public") {
        if (!checkdata) {
          await new mkchar({ id: '1', privateMode: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Der Öffentliche Modus* wurde *Aktiviert* !\n\nJetzt kann *Jeder* meine Befehle verwenden !` },
            { quoted: m }
          );
        } else {
          if (checkdata.privateMode == "false") return Miku.sendMessage(
            m.from,
            { text: `*Der Öffentliche Modus* ist bereits *Aktiviert* !\n\nJetzt kann *Jeder* meine Befehle verwenden !` },
            { quoted: m }
          );
          await mkchar.updateOne({ id: '1' }, { privateMode: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*Öffentlicher Modus* wurde *Aktiviert* !\n\nJetzt kann *Jeder* meine Befehle verwenden !` },
            { quoted: m }
          );
        }
      } else if (args[0] === "self") {
        if (!checkdata) {
          await new mkchar({ id: '1', privateMode: "self" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Selbstmodus* wurde *Aktiviert* !\n\nJetzt kann nur noch *Bot Hoster* meine Befehle verwenden !` },
            { quoted: m }
          );
        } else {
          if (checkdata.privateMode == "self") return Miku.sendMessage(
            m.from,
            { text: `*Selbstmodus* ist bereits *Aktiviert* !\n\nJetzt kann nur noch *Bot Hoster* meine Befehle verwenden !` },
            { quoted: m }
          );
          await mkchar.updateOne({ id: '1' }, { privateMode: "self" });
          return Miku.sendMessage(
            m.from,
            { text: `*Selbstmodus* wurde *Aktiviert* !\n\nJetzt kann nur noch *Bot-Hoster* meine Befehle verwenden !` },
            { quoted: m }
          );
        }
      }
      else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}mode public`,
            buttonText: { displayText: "Öffentlicher Modus" },
            type: 1,
          },
          {
            buttonId: `${prefix}mode private`,
            buttonText: { displayText: "Privater Modus" },
            type: 1,
          },
          {
            buttonId: `${prefix}mode self`,
            buttonText: { displayText: "Selbstmodus" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage6} ,
          caption: `\n*「  Moduskonfiguration  」*\nBitte klicken Sie auf die Schaltfläche unten\n*Selbst / Öffentlich / Privat*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
