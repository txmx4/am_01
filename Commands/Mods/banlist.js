const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku } = require("../../Database/dataschema.js");


module.exports = { 

    name: "banlist", 
    alias: ["listbanned"], 
    desc: "Alle gesperrten Mitglieder auflisten", 
    category: "core", 
    usage: "banlist", 
    start: async ( 
      Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,modStatus} 
    ) => { 
      
      try { 
        
        var banlist = await mku.find({ban: true});
        var banlistString = "";
        banlist.forEach((ban, index) => {
            banlistString += ban.id ? `\n ${index+1}\n╭─────────────◆\n│ *Name:* ${ban.name}\n│ *Tag:* @${ban.id.split("@")[0]}\n│ *Grund:* ${ban.reason}\n╰─────────────◆\n\n` : '';
          });
        var mention = banlist.map(ban => ban.id)
        if(banlistString == "") banlistString = "Keine gesperrten Mitglieder gefunden.";
        return Miku.sendMessage( 
          m.from, 
          { text: `Aktuell gesperrte Mitglieder: ${banlistString}`, mentions: mention }, 
          { quoted: m } 
        );
      } catch (err) { 
        console.log(err);
        return Miku.sendMessage(m.from, { text: `Beim Abrufen der Sperrliste ist ein interner Fehler aufgetreten.` }, { quoted: m });
      } 
    }, 
}
